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
        let selfPomCount;

        this.state = {
            user: props.user,
            poms:[]
        }


        this.startPom = this.startPom.bind(this);
        this.pausePom = this.pausePom.bind(this);
        this.resumePom = this.resumePom.bind(this);
        this.textPom = this.textPom.bind(this);
        this.refreshAllPoms = this.refreshAllPoms.bind(this);
        
        this.refreshAllPoms(props.following,props.user);

    }


    componentWillReceiveProps({ user, following, poms }) {

        this.setState({ user });
        this.refreshAllPoms(following, user);

    }

    componentDidMount() {
        this._isMounted = true;
        if (process.env.NODE_ENV !== 'production') {
            this.deployment = 'dev';
        }
        else {
            this.deployment = 'prod';
        }
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
                        following.push(user.userID);

                        following.map(d => {
                            if (pomProcessed[d]) {
                                let curPoms = pomProcessed[d];
                                //Check if the last one is active
                                let pomLength = curPoms.length;
                                let latestPom = curPoms[pomLength - 1];
                                let elapsed = (((new Date().getTime() - latestPom.modifiedUTC) / 60000) + (latestPom.elapsed / 60000))
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

                        this.setState({ poms: filteredPoms });


                    }
                })
        })



    }

    startPom() {
        console.log('start this pom!');
        const queryDate = new Date().toLocaleDateString().replace(/\//g, '-');
        const utc = new Date().getTime();
        console.log(this.state.user, this.deployment + '/poms/' + queryDate + '/' + this.state.user.uid + '/' + this.state.selfPomCount);
        firebase.database().ref(this.deployment + '/poms').child(queryDate).child(this.state.user.uid)
            .child(this.state.selfPomCount).set({
                elapsed: 0,
                modifiedUTC: utc,
                startUTC: utc,
                status: "inprogress",
                text: ""
            });


    }

    resumePom() {
        console.log('resume this pom!')
    }

    pausePom() {
        console.log('pause this pom!')
    }

    textPom() {
        console.log('text this pom!')
    }



    render() {
        const { classes, following, user } = this.props;




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
