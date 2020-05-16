import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, Link, TextField, Grid, Breadcrumbs
} from '@material-ui/core';

import firebase from '../firebase';
import PomCard from './pomcard';

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

    }
});



class CoPom extends React.Component {

    constructor(props) {
        super(props);

        props.following.push(props.user.userID)
        this.state = {
            user: props.user,
            poms: [],
            following: props.following,
            selfPomCount: 0
        }


        this.startPom = this.startPom.bind(this);
        this.pausePom = this.pausePom.bind(this);
        this.resumePom = this.resumePom.bind(this);
        this.textPom = this.textPom.bind(this);
        this.refreshAllPoms = this.refreshAllPoms.bind(this);



    }


    componentWillReceiveProps({ user, following, poms }) {

        following.push(user.userID);
        this.setState({ user, following });
        this.refreshAllPoms(following, user);

    }

    componentWillUnmount(){
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

    componentWillMount(){
        // this.refreshAllPoms(this.state.following, this.state.user);
        this.inter = setInterval(()=>{     
            this.refreshAllPoms(this.state.following, this.state.user)
            console.log('poms refreshed!',this.state)
        },60000);
    }

    
    refreshAllPoms(following, user) {
        // Get all poms and remap to the nameids
        const pomProcessed = {}
        firebase.database().ref(this.deployment + '/userlist/all').once('value', (d) => {
            const dd = d.val();

            const queryDate = new Date().toLocaleDateString().replace(/\//g, '-');

            firebase.database().ref(this.deployment + '/poms').child(queryDate)
                .once('value', (snapshot) => {
                    const pomIds = snapshot.val();

                    if (pomIds !== null) {

                        for (var key in pomIds) {
                            pomProcessed[dd[key]] = pomIds[key]
                        }

                        const filteredPoms = []
                        // following.push(user.userID);

                        let selfPresent = false;
                        let selfPomCount, latestPomStatus, latestPomModified, latestPomElapsed, latestPomStart, latestPomText;

                        following.map(d => {
                            if (pomProcessed[d]) {
                                let curPoms = pomProcessed[d];
                                //Check if the last one is active
                                let pomLength = curPoms.length;
                                let latestPom = curPoms[pomLength - 1];
                                let elapsed;
                                if (latestPom.status==='pause'){
                                    elapsed = (latestPom.elapsed / 60000)
                                }
                                else{
                                    elapsed = (((new Date().getTime() - latestPom.modifiedUTC) / 60000) + (latestPom.elapsed / 60000))
                                }
                                if (user.userID === d) {

                                    selfPresent = true;
                                    selfPomCount = pomLength;
                                    latestPomStatus = latestPom.status;
                                    latestPomModified = latestPom.modifiedUTC;
                                    latestPomElapsed = latestPom.elapsed;
                                    latestPomStart = latestPom.startUTC;
                                    latestPomText = latestPom.text;
                                }
                                if (elapsed >= 25) {
                                    filteredPoms.push({
                                        pommer: d,
                                        time: 0,
                                        status: '',
                                        text: '',
                                        poms: pomLength,
                                        self: (user.userID === d)
                                    })
                                }
                                else {
                                    filteredPoms.push({
                                        pommer: d,
                                        time: 25 - parseInt(elapsed),
                                        status: latestPom.status,
                                        text: latestPom.text,
                                        poms: pomLength - 1,
                                        self: (user.userID === d)
                                    })
                                }
                            }
                            else {
                                filteredPoms.push({
                                    pommer: d,
                                    time: 0,
                                    status: '',
                                    text: '',
                                    poms: 0,
                                    self: (user.userID === d)
                                })
                            }

                        })

                        if (selfPresent) {
                            this.setState({
                                poms: filteredPoms,
                                selfPomCount, latestPomElapsed, latestPomModified, latestPomStart, latestPomStatus, latestPomText
                            });
                        }
                        else {
                            this.setState({
                                poms: filteredPoms,
                                selfPomCount:0
                            });
                        }


                    }
                    else{
                        this.setState({
                            poms: [{
                                pommer: user.userID,
                                time: 0,
                                status: '',
                                text: '',
                                poms: 0,
                                self: true
                            }]
                        })
                    }
                })
        })



    }

    startPom() {
        
        const queryDate = new Date().toLocaleDateString().replace(/\//g, '-');
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

        let newPoms = this.state.poms;
        newPoms[newPoms.length-1] = {
            pommer: this.state.user.userID,
            poms: this.state.selfPomCount,
            self: true,
            status: "inprogress",
            text: "",
            time: 25,
        }
        this.setState({
            poms:newPoms,
            selfPomCount: this.state.selfPomCount+1, 
            latestPomElapsed : 0,
            latestPomModified: utc,
            latestPomStart: utc,
            latestPomStatus: 'inprogress',
            latestPomText : ''

        })


    }

    resumePom() {
        
        const queryDate = new Date().toLocaleDateString().replace(/\//g, '-');
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

        let newPoms = this.state.poms;
        let lePom = newPoms[newPoms.length-1]
        newPoms[newPoms.length-1].status = "inprogress";

        this.setState({
            poms:newPoms,
            latestPomModified: utc,
            latestPomStatus: 'inprogress',
        })

    }

    pausePom() {
        
        const queryDate = new Date().toLocaleDateString().replace(/\//g, '-');
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

        let newPoms = this.state.poms;
        let lePom = newPoms[newPoms.length-1]
        newPoms[newPoms.length-1].status = "pause";
        this.setState({
            poms:newPoms,
            latestPomElapsed : elapsedNew,
            latestPomModified: utc,
            latestPomStatus: 'pause',
        })

    }

    textPom(txt) {
        
        const queryDate = new Date().toLocaleDateString().replace(/\//g, '-');

        firebase.database().ref(this.deployment + '/poms').child(queryDate).child(this.state.user.uid)
            .child(this.state.selfPomCount - 1).child('text').set(txt);

        // this.refreshAllPoms(this.state.following, this.state.user);

        let newPoms = this.state.poms;
        let lePom = newPoms[newPoms.length-1]
        newPoms[newPoms.length-1].text = txt;

        this.setState({
            poms:newPoms,
            latestPomText: txt,
        })

    }



    render() {
        const { classes, following, user } = this.props;

        console.log('state of poms',this.state.poms);




        return (
            <Paper elevation={0}>
                <Grid container className={classes.brumb} direction="row" justify="space-between" alignItems="center">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography color="inherit">CoPom [{new Date().toLocaleDateString()}]</Typography>
                    </Breadcrumbs>
                </Grid>
                <Grid container direction="row" justify="center">
                    {
                        this.state.poms.map((d, i) => (
                            <PomCard pomData={d} key={i} startPom={this.startPom} pausePom={this.pausePom} textPom={this.textPom} resumePom={this.resumePom}></PomCard>
                        ))
                    }
                </Grid>
            </Paper>

        )
    }
}

export default withStyles(styles)(CoPom);
