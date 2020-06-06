import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Paper, Grid, Typography, ListItem, Button, Divider, Link
} from '@material-ui/core';


import firebase from '../firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


import { textAlign } from '@material-ui/system';


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
        cursor: 'pointer',
        color: "#333",
        padding: "20px",
        marginBottom: '20px'
    },
});



class FrontPage extends React.Component {

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


    }


    render() {
        const { classes, theme } = this.props;


        return (
            <Paper className={classes.root} elevation={0}>
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
                        <Button autoFocus color="inherit" variant="outlined" onClick={() => (window.location.href = '/?m=okrs&user=vivekaithal44&q=1&y=2020')}>See a sample OKR</Button>
                    </Grid>


                </div>            </Paper>

        )
    }
}

export default withStyles(styles)(FrontPage);
