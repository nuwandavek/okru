import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Menu, Button, MenuItem, Link, Divider, Avatar } from '@material-ui/core';
import FollowingTable from '../components/followingtable';
import Okrs from '../components/okrs';
import Edit from '../components/dialog';
import firebase from '../firebase';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const dummyData = require('../components/dummyData.json');


const styles = theme => ({
    root: {
        background: '#fff',
        flexGrow: 1,
        textAlign: 'center',
        minHeight: '100vh',
        margin: '0px'
    },
    jumbo: {
        fontWeight: 600,
        cursor: 'pointer'
    },
    dark: {
        background: '#333'
    },
    accountButton: {
        position: "absolute",
        top: "20px",
        right: "20px",
        cursor: "pointer"
    }
});



class HomeScreen extends React.Component {



    constructor(props) {
        super(props);
        let _isMounted = false;
        this.uiConfig = {
            signInFlow: 'popup',
            signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
            callbacks: {
                signInSuccess: () => false
            }
        }



        this.state = {
            isSignedIn: false,
            loggedInUser: null,
            showDialog: false,
            showDialogContent: null,
            curUserOKRs: [],
            selfView: false,
            userlist: [],
            followlist: {},
            isFollowing: false,
            userRequested: new URLSearchParams(window.location.search).get('user'),
            userBeingViewed: new URLSearchParams(window.location.search).get('user'),
            quarter:'Q1',
            year:'2020',
            ...dummyData
        }

        
          




        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleFollow = this.handleFollow.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    signOut() {
        this.setState({ isSignedIn: false })
        firebase.auth().signOut();
    }

    handleFollow = (event) => {
        if (!this.state.isFollowing) {
            this.setState({ isFollowing: !this.state.isFollowing });
            const newFollowRef = firebase.database().ref(this.deployment+'/userlist/' + this.state.user.uid).push();
            newFollowRef.set(this.state.userBeingViewed);
        }
        else {
            this.setState({ isFollowing: !this.state.isFollowing });

            const followID = Object.keys(this.state.followlist).filter(d => {
                // console.log(d, this.state.followlist[d]);
                return this.state.followlist[d] == this.state.userBeingViewed
            }
            )
            firebase.database().ref(this.deployment+'/userlist/' + this.state.user.uid + '/' + followID).remove()

        }

    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        if (process.env.NODE_ENV !== 'production') {
            this.deployment = 'dev';
        }
        else{
            this.deployment = 'prod';
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user !== null) {
                // console.log(user);
                this.setState({ isSignedIn: !!user })
                if (this._isMounted) {
                    this.setState({ user });
                    console.log(this.deployment);
                    

                    

                    
                    const usersRef = firebase.database().ref(this.deployment+'/users')


                    const userID = user.email.split('@')[0].replace('.', '');
                    this.setState({ loggedInUser: userID });


                    usersRef.child(user.uid).once('value', (snapshot) => {
                        

                        if (snapshot.exists()) {
                            // console.log('user_exists');
                        }
                        else {
                            const userToStore = {
                                name: user.displayName,
                                firstName: user.displayName.split(' ')[0],
                                photoURL: user.photoURL,
                                email: user.email,
                                uid: user.uid,
                                userID: userID
                            }
                            firebase.database().ref(this.deployment+'/users/' + user.uid).set(userToStore);
                            const newUserRef = firebase.database().ref(this.deployment+'/userlist/all/' + user.uid);
                            newUserRef.set(userID);


                        }
                        const curUser = firebase.database().ref(this.deployment+'/users/' + user.uid);
                        // console.log('users/' + user.uid);
                        curUser.on('value', (snapshot) => {
                            this.setState({ 'curUser': snapshot.val() }, () => {
                                // console.log('user-state-updated!', snapshot.val(), this.state);


                                if (this.state.userRequested === null) {
                                    this.setState({ selfView: true });
                                    this.setState({ userBeingViewed: userID });
                                    firebase.database().ref(this.deployment+'/okrs').child(user.uid).once('value', (snapshot) => {
                                        if (snapshot.val() !== null) {
                                            this.setState({ 'curUserOKRs': snapshot.val() }, () => {
                                                // console.log('user-okrs-updated!', snapshot.val(), this.state);
                                            });
                                        }

                                    })
                                }
                                else {
                                    firebase.database().ref(this.deployment+'/userlist/all').once('value', (d) => {
                                        const dd = d.val();
                                        const userX = Object.keys(dd).find(key => dd[key] === this.state.userRequested);

                                        if (userX !== undefined && userX !== null) {
                                            firebase.database().ref(this.deployment+'/okrs').child(userX).once('value', (snapshot) => {
                                                if (this.state.userRequested === userID) {
                                                    this.setState({ selfView: true });
                                                }
                                                else {
                                                    this.setState({ selfView: false });
                                                }
                                                if (snapshot.val() !== null) {
                                                    this.setState({ 'curUserOKRs': snapshot.val() }, () => {
                                                        // console.log('user-okrs-updated!', snapshot.val(), this.state);
                                                    });
                                                }

                                            })
                                        }

                                    })
                                }


                                firebase.database().ref(this.deployment+'/userlist/' + user.uid).on('value', (snapshot) => {
                                    if (snapshot.val() !== null) {
                                        this.setState({ followlist: snapshot.val() }, () => {
                                            // console.log('follow-list-updated!', snapshot.val());
                                        });
                                        if (Object.values(snapshot.val()).indexOf(this.state.userBeingViewed) >= 0) {
                                            this.setState({ isFollowing: true });
                                        }
                                    }
                                    else {
                                        this.setState({ followlist: {} })
                                    }
                                })


                            });
                        });
                    })


                    // const tempDataLoader = firebase.database().ref(this.deployment+'/okrs/temp');
                    // tempDataLoader.set(dummyData.okrList);





                }
            }

        })

        if (!this.state.isSignedIn && this.state.userRequested !== null) {
            firebase.database().ref(this.deployment+'/userlist/all').once('value', (d) => {
                const dd = d.val();
                const userX = Object.keys(dd).find(key => {
                    return dd[key] === this.state.userRequested;
                });

                if (userX !== undefined && userX !== null) {

                    firebase.database().ref(this.deployment+'/okrs').child(userX).once('value', (snapshot) => {
                        this.setState({ selfView: false });
                        if (snapshot.val() !== null) {
                            this.setState({ 'curUserOKRs': snapshot.val() }, () => {
                                // console.log('user-okrs-updated!', snapshot.val(), this.state);
                            });
                        }

                    })
                }
            })

        }

        firebase.database().ref(this.deployment+'/userlist/all').once('value', (snapshot) => {
            if (snapshot.val() !== null) {
                this.setState({ userlist: Object.values(snapshot.val()) }, () => {
                    // console.log('user-list-updated!', Object.values(snapshot.val()));
                });
            }
        })





    }


    handleCloseDialog = (flag, objective, keyResults) => {
        // console.log('closed! NEW', objective, keyResults);
        const showDialogContent = this.state.showDialogContent;
        const okrItem = {
            id: objective.id,
            title: objective.title,
            description: objective.description,
            failureMode: objective.failureMode,
            category: objective.category,
            keyResults: keyResults
        }

        const newOKRList = this.state.curUserOKRs;
        if (this.state.showDialogContent === null) {
            if (flag === 'new') {
                okrItem.id = newOKRList.length;
                newOKRList.push(okrItem);
            }
        }
        else {
            if (flag === 'delete') {
                newOKRList.splice(showDialogContent, 1);
            }
            if (flag === 'old') {
                newOKRList[showDialogContent] = this.state.editOKR;
            }
            else if (flag === 'new') {

                newOKRList[showDialogContent] = okrItem;
            }
        }


        this.setState({
            ...this.state,
            showDialog: false,
            curUserOKRs: newOKRList
        });


        firebase.database().ref(this.deployment+'/okrs/' + this.state.user.uid).set({
            ...newOKRList
        });

    };

    handleOpenDialog = (showDialogContent) => {
        this.setState({ showDialog: true });
        this.setState({ showDialogContent: showDialogContent });
        this.setState({ editOKR: this.state.curUserOKRs[showDialogContent] });
        if (showDialogContent === null) {
            this.setState({ dialogContent: this.state.defaultDialogContent });
        }
        else {
            this.setState({ dialogContent: this.state.curUserOKRs[showDialogContent] });
        }
    };

    navHandleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    navHandleClose = event => {
        this.setState({ anchorEl: null });
    };

    navSignin = () => {
        window.location.href = '/'

    };


    render() {
        // console.log(this.state);
        const { classes, theme } = this.props;

        // console.log('fresh hell :(', this.state);
        return (

            <div className={classes.root}>
                {(this.state.isSignedIn || this.state.userRequested !== null) ?
                    (<Grid container direction="column">
                        {/* <Grid container justify="flex-end" direction="row" className={classes.dark}> */}
                        {this.state.user && this.state.isSignedIn ?
                            (this.state.user.photoURL ? <Avatar className={classes.accountButton} alt="Remy Sharp" src={this.state.user.photoURL} onClick={this.navHandleClick} />
                                :
                                <AccountCircleIcon aria-controls="simple-menu" aria-haspopup="true" onClick={this.navHandleClick}
                                    className={classes.accountButton} fontSize="large">

                                </AccountCircleIcon>)
                            :
                            <AccountCircleIcon aria-controls="simple-menu" aria-haspopup="true" onClick={this.navHandleClick}
                                className={classes.accountButton} fontSize="large">

                            </AccountCircleIcon>}
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.navHandleClose}
                        >
                            {!this.state.isSignedIn ? <MenuItem onClick={this.navSignin}>Login</MenuItem> : <MenuItem onClick={() => {
                                console.log('logged out!');
                                this.signOut();
                                this.setState({ isSignedIn: false });
                            }}>Logout</MenuItem>}
                        </Menu>
                        {/* </Grid> */}
                        <Grid container item spacing={3} direction="row">
                            <Grid item xs={false} sm={false} md={2} lg={3} xl={3}>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8} lg={6} xl={6}>
                                <Typography variant="h1" className={classes.jumbo}>
                                    <Link href="/" underline="none" color="textPrimary">okru</Link>
                                </Typography>
                            </Grid>
                            <Grid item xs={false} sm={false} md={2} lg={3} xl={3}>
                            </Grid>
                        </Grid>
                        <Grid container item spacing={3} direction="row" justify="center" xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Grid container item spacing={3} xs={false} sm={false} md={1} lg={1} xl={1}></Grid>
                            <Grid container item spacing={3} direction="column" xs={12} sm={12} md={7} lg={7} xl={7}>
                                <Okrs 
                                okrList={this.state.curUserOKRs}
                                handleOpenDialog={this.handleOpenDialog}
                                selfView={this.state.selfView}
                                isFollowing={this.state.isFollowing}
                                userBeingViewed={this.state.userBeingViewed}
                                handleFollow={this.handleFollow}
                                isSignedIn={this.state.isSignedIn}
                                quarter={this.state.quarter}
                                year = {this.state.year}></Okrs>
                            </Grid>
                            <Grid container item spacing={3} direction="column" xs={12} sm={12} md={3} lg={3} xl={3}>
                                <Grid item >

                                    <FollowingTable following={this.state.userlist} name="All Users" initText="Loading Users..." />

                                </Grid>
                                {this.state.isSignedIn ?
                                    <Grid>
                                        <Grid item >

                                            <FollowingTable following={Object.values(this.state.followlist)} name="Following" initText="You're not following anyone!" />

                                        </Grid>
                                        <Grid item >

                                            <FollowingTable following={Object.values(this.state.followlist)} name="Followers" initText="You do not have any followers yet!" />

                                        </Grid>
                                    </Grid>
                                    : ''}
                            </Grid>
                            <Grid container item spacing={3} xs={false} sm={false} md={1} lg={1} xl={1}></Grid>

                        </Grid>
                        {this.state.selfView ? <Edit openDialog={this.state.showDialog} handleCloseDialog={this.handleCloseDialog} showOKR={this.state.dialogContent} /> : ''}

                    </Grid>

                    )
                    :
                    (
                        <div style={{ 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center', 'alignItems': 'center', 'height': '100vh' }}>

                            <Typography variant="h1" className={classes.jumbo}>
                                <Link href="/" underline="none" color="textPrimary">okru</Link>
                            </Typography>
                            <Typography variant="caption">Set Personal OKRs, Be Accountable to Friends</Typography>
                            <Typography variant="caption">Become a Better Version of You</Typography>
                            <StyledFirebaseAuth
                                uiConfig={this.uiConfig}
                                firebaseAuth={firebase.auth()}
                            />
                            <Divider style={{ width: "30%", margin: "30px" }} />
                            <Grid container direction="column" item xs={10} sm={6} md={6} lg={4} xl={4}>
                                <Typography variant="subtitle1">This is a <b><i>Measure What Matters</i></b> meets <b><i>Elephant In The Brain</i></b> meets <b><i>Atomic Habits</i></b> effort to
                                use personal OKRs that track System Metrics and positively decieve our silly brains. You can set your quarterly OKRs, pre-commit metrics, estimate possible failure
                    modes and follow your friends.</Typography>

                                <Typography variant="overline">More features are coming soon!</Typography>
                                <Button autoFocus color="inherit" variant="outlined" onClick={() => (window.location.href = '/?user=vivekaithal44')}>See a sample OKR</Button>
                            </Grid>


                        </div>
                    )
                }
            </div>

        )
    }
}

export default withStyles(styles)(HomeScreen);
