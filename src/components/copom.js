import React from 'react';
import UIfx from 'uifx';
import notif from '../assets/intuition.mp3';
import { withStyles } from '@material-ui/core/styles';
import {
    Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, Link, TextField, Grid, Breadcrumbs, Snackbar, SnackbarContent
} from '@material-ui/core';

import firebase from '../firebase';
import PomCard from './pomcard';

const beep = new UIfx(notif);


const styles = theme => ({
    brumb: {
        padding: 20,
        borderRadius: 0,
        // borderBottom: '1px #eee solid'
    },
    pomcards: {
        padding: '10px',
        minHeight: '200px',
        minWidth: '200px',
        border: '1px #eee solid',
        margin: '2px',
        borderRadius: '5px'

    },
    snack: {
        backgroundColor: "#c0392b",
        color: '#fff'
    }
});



class CoPom extends React.Component {

    constructor(props) {
        super(props);

        // props.following.push(props.user.userID)
        this.state = {
            user: props.user,
            poms: [],
            following: props.following,
            selfPomCount: 0,
            myPom: {},
            pommers: 0
        }


        this.startPom = this.startPom.bind(this);
        this.pausePom = this.pausePom.bind(this);
        this.resumePom = this.resumePom.bind(this);
        this.textPom = this.textPom.bind(this);
        this.refreshAllPoms = this.refreshAllPoms.bind(this);



    }


    componentWillReceiveProps({ user, following, poms }) {

        // following.push(user.userID);
        this.setState({ user, following }, () => {
            this.refreshAllPoms(following, user);
        });

    }

    componentWillUnmount() {
        clearInterval(this.inter);
    }

    componentDidMount() {
        this._isMounted = true;
        if (process.env.NODE_ENV !== 'production') {
            this.deployment = 'dev';
        }
        else {
            this.deployment = 'prod';
        }

        this.refreshAllPoms(this.state.following, this.state.user);

    }

    componentWillMount() {
        // this.refreshAllPoms(this.state.following, this.state.user);
        this.inter = setInterval(() => {
            this.refreshAllPoms(this.state.following, this.state.user)
            console.log('poms refreshed!', this.state)
        }, 60000);
    }


    refreshAllPoms(following, user) {
        // Get all poms and remap to the nameids
        // console.log(following, user);
        const pomProcessed = {}
        let pommers = 0;
        firebase.database().ref(this.deployment + '/userlist/all').once('value', (allUserSnap) => {
            const allUsers = allUserSnap.val();

            // const queryDate = new Date().toLocaleDateString().replace(/\//g, '-');
            const queryDate = new Date().getUTCDate() + '-' + new Date().getUTCMonth() + '-' + new Date().getUTCFullYear();

            firebase.database().ref(this.deployment + '/poms').child(queryDate)
                .once('value', (snapshot) => {
                    const pomIds = snapshot.val();

                    //Check if there are no poms today
                    if (pomIds !== null) {

                        // convert Poms with the readable ids
                        for (var key in pomIds) {
                            pomProcessed[allUsers[key]] = pomIds[key]
                        }

                        const filteredPoms = []
                        let myPom = {}

                        let selfPresent = false;
                        let selfPomCount, latestPomStatus, latestPomModified, latestPomElapsed, latestPomStart, latestPomText;

                        // If you are present in the poms today
                        if (pomProcessed[user.userID]) {
                            let curPoms = pomProcessed[user.userID];
                            //Check if the last one is active
                            let pomLength = curPoms.length;
                            let latestPom = curPoms[pomLength - 1];
                            let elapsed;

                            if (latestPom.status === 'pause') {
                                elapsed = (latestPom.elapsed / 60000)
                            }
                            else {
                                elapsed = (((new Date().getTime() - latestPom.modifiedUTC) / 60000) + (latestPom.elapsed / 60000))
                            }
                            selfPresent = true;
                            selfPomCount = pomLength;
                            latestPomStatus = latestPom.status;
                            latestPomModified = latestPom.modifiedUTC;
                            latestPomElapsed = latestPom.elapsed;
                            latestPomStart = latestPom.startUTC;
                            latestPomText = latestPom.text;
                            if (elapsed >= 25) {
                                myPom = {
                                    pommer: user.userID,
                                    time: 0,
                                    status: '',
                                    text: '',
                                    poms: pomLength,
                                }
                            }
                            else {
                                myPom = {
                                    pommer: user.userID,
                                    time: 25 - parseInt(elapsed),
                                    status: latestPom.status,
                                    text: latestPom.text,
                                    poms: pomLength - 1,
                                }
                            }
                        }

                        // Iterate over all following
                        following.map(d => {
                            // Check if the user is present in today's poms
                            if (pomProcessed[d]) {
                                let curPoms = pomProcessed[d];
                                //Check if the last one is active
                                let pomLength = curPoms.length;
                                let latestPom = curPoms[pomLength - 1];
                                let elapsed;
                                if (latestPom.status === 'pause') {
                                    elapsed = (latestPom.elapsed / 60000)
                                }
                                else {
                                    elapsed = (((new Date().getTime() - latestPom.modifiedUTC) / 60000) + (latestPom.elapsed / 60000))
                                }
                                if (elapsed >= 25) {
                                    filteredPoms.push({
                                        pommer: d,
                                        time: 0,
                                        status: '',
                                        text: '',
                                        poms: pomLength,
                                    })
                                }
                                else {
                                    pommers+=1;
                                    filteredPoms.push({
                                        pommer: d,
                                        time: 25 - parseInt(elapsed),
                                        status: latestPom.status,
                                        text: latestPom.text,
                                        poms: pomLength - 1,
                                    })
                                }
                            }
                            // if the user is not present
                            else {
                                filteredPoms.push({
                                    pommer: d,
                                    time: 0,
                                    status: '',
                                    text: '',
                                    poms: 0,
                                })
                            }

                        })

                        if (selfPresent) {
                            this.setState({
                                poms: filteredPoms,
                                myPom: myPom,
                                selfPomCount, latestPomElapsed, latestPomModified, latestPomStart,
                                latestPomStatus, latestPomText
                            });
                        }
                        else {
                            this.setState({
                                myPom: myPom,
                                poms: filteredPoms,
                            });
                        }


                    }
                    else {
                        let allPoms = [];
                        let myPom = {
                            pommer: user.userID,
                            time: 0,
                            status: '',
                            text: '',
                            poms: 0
                        }

                        following.map((fol) => {
                            allPoms.push({
                                pommer: fol,
                                time: 0,
                                status: '',
                                text: '',
                                poms: 0,
                            })
                        })

                        this.setState({ poms: allPoms, myPom: myPom })
                    }
                })
        })

        if (pommers>this.state.pommers){
            this.setState({pommers:pommers, open:true},()=>{
                beep.play();
            })
        }



    }

    startPom() {

        // const queryDate = new Date().toLocaleDateString().replace(/\//g, '-');
        const queryDate = new Date().getUTCDate() + '-' + new Date().getUTCMonth() + '-' + new Date().getUTCFullYear();

        const utc = new Date().getTime();

        firebase.database().ref(this.deployment + '/poms').child(queryDate).child(this.state.user.uid)
            .child(this.state.selfPomCount).set({
                elapsed: 0,
                modifiedUTC: utc,
                startUTC: utc,
                status: "inprogress",
                text: ""
            });

        // this.refreshAllPoms(this.state.following, this.state.user);

        let myPom = this.state.myPom;
        myPom = {
            pommer: this.state.user.userID,
            poms: this.state.selfPomCount,
            // self: true,
            status: "inprogress",
            text: "",
            time: 25,
        }
        this.setState({
            myPom: myPom,
            selfPomCount: this.state.selfPomCount + 1,
            latestPomElapsed: 0,
            latestPomModified: utc,
            latestPomStart: utc,
            latestPomStatus: 'inprogress',
            latestPomText: '',
            open: true

        })

        beep.play();



    }

    resumePom() {

        // const queryDate = new Date().toLocaleDateString().replace(/\//g, '-');
        const queryDate = new Date().getUTCDate() + '-' + new Date().getUTCMonth() + '-' + new Date().getUTCFullYear();
        const utc = new Date().getTime();


        firebase.database().ref(this.deployment + '/poms').child(queryDate).child(this.state.user.uid)
            .child(this.state.selfPomCount - 1).set({
                elapsed: this.state.latestPomElapsed,
                modifiedUTC: utc,
                startUTC: this.state.latestPomStart,
                status: "inprogress",
                text: this.state.latestPomText
            });

        // this.refreshAllPoms(this.state.following, this.state.user);

        let myPom = this.state.myPom;
        myPom.status = "inprogress";

        this.setState({
            myPom: myPom,
            latestPomModified: utc,
            latestPomStatus: 'inprogress',
        })

    }

    pausePom() {

        // const queryDate = new Date().toLocaleDateString().replace(/\//g, '-');
        const queryDate = new Date().getUTCDate() + '-' + new Date().getUTCMonth() + '-' + new Date().getUTCFullYear();
        const utc = new Date().getTime();

        let elapsedNew = (utc - this.state.latestPomModified) + this.state.latestPomElapsed;

        firebase.database().ref(this.deployment + '/poms').child(queryDate).child(this.state.user.uid)
            .child(this.state.selfPomCount - 1).set({
                elapsed: elapsedNew,
                modifiedUTC: utc,
                startUTC: this.state.latestPomStart,
                status: "pause",
                text: this.state.latestPomText
            });

        // this.refreshAllPoms(this.state.following, this.state.user);

        let myPom = this.state.myPom;
        myPom.status = "pause";
        this.setState({
            myPom: myPom,
            latestPomElapsed: elapsedNew,
            latestPomModified: utc,
            latestPomStatus: 'pause',
        })

    }

    textPom(txt) {

        // const queryDate = new Date().toLocaleDateString().replace(/\//g, '-');
        const queryDate = new Date().getUTCDate() + '-' + new Date().getUTCMonth() + '-' + new Date().getUTCFullYear();

        firebase.database().ref(this.deployment + '/poms').child(queryDate).child(this.state.user.uid)
            .child(this.state.selfPomCount - 1).child('text').set(txt);

        // this.refreshAllPoms(this.state.following, this.state.user);

        let myPom = this.state.myPom;
        myPom.text = txt;

        this.setState({
            myPom: myPom,
            latestPomText: txt,
            open: false
        })

    }

    handleClose() {
        this.setState({ open: false })
    }



    render() {
        const { classes, following, user } = this.props;

        console.log('state of poms', this.state.poms);




        return (
            <Paper elevation={0}>
                <Grid container className={classes.brumb} direction="row" justify="space-between" alignItems="center">
                    <Breadcrumbs aria-label="breadcrumb">
                        {/* <Typography color="inherit">CoPom [{new Date().toLocaleDateString()}]</Typography> */}
                        <Typography color="inherit">CoPom [{new Date().getUTCDate() + '-' + new Date().getUTCMonth() + '-' + new Date().getUTCFullYear()}]</Typography>
                    </Breadcrumbs>
                </Grid>
                <Grid container direction="row" justify="center">
                    <PomCard selfPom={true} pomData={this.state.myPom} key={0} startPom={this.startPom} pausePom={this.pausePom} textPom={this.textPom} resumePom={this.resumePom}></PomCard>

                </Grid>
                <Grid container direction="row" justify="flex-start">
                    <Typography>Following</Typography>
                </Grid>

                <Grid container direction="row" justify="flex-start">
                    {
                        this.state.poms.map((d, i) => (
                            <PomCard selfPom={false} pomData={d} key={i + 1} startPom={this.startPom} pausePom={this.pausePom} textPom={this.textPom} resumePom={this.resumePom}></PomCard>
                        ))
                    }
                </Grid>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    autoHideDuration={15000}
                    onClose={() => { this.setState({ open: false }) }}
                    open={this.state.open}
                    key={'bottom-right'}
                >
                    <SnackbarContent className={classes.snack}
                        message="Yay, A new Pom!"
                    />
                </Snackbar>
            </Paper>

        )
    }
}

export default withStyles(styles)(CoPom);
