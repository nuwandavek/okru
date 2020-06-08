import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Paper, Grid, Typography, ListItem, Button, Divider, Link, Card, CardActionArea, CardMedia, CardContent
} from '@material-ui/core';


import firebase from '../firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


import { textAlign } from '@material-ui/system';

import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";

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
    section1: {
        'display': 'flex',
        'flexDirection': 'column',
        'justifyContent': 'center',
        'alignItems': 'center',
        margin: "50px",
        marginBottom: "50px"
    },
    section2: {
        padding: "50px",
        background: "#0d0c0c",
        color: "#fff",
        borderRadius: "0px",
        textAlign: 'justify'
    },
    section3: {
        padding: "50px",
        color: "#000",
        borderRadius: "0px",
        textAlign: 'justify'
    },
    what: {
        textTransform: 'uppercase',
        letterSpacing: '20px',
        fontWeight: 100,
        fontSize: '2rem',
        marginTop: '30px',
        marginBottom: '30px',
        textAlign: 'center'
    },
    why: {
        textAlign: 'left'
    },
    img:{
        width: "100%",
        border: "5px solid #0d0c0c",
        borderRadius: "10px"
    },
    example:{
        width: "100%",
        margin: "50px 0px"
    }
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
                <Paper elevation={0} className={classes.section1}>

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
                        use personal OKRs to define goals, track progress and positively deceive our silly brains. You can set your quarterly OKRs, pre-commit metrics, estimate possible failure modes and follow your friends.</Typography>

                        {/* <Typography variant="overline">More features are coming soon!</Typography> */}
                        <Button color="inherit" variant="outlined"  className={classes.example} onClick={() => (window.location.href = '/?m=okrs&user=vivekaithal44&q=1&y=2020')}>Check out an example</Button>
                    </Grid>


                </Paper>
                <Grid container direction="column" justify="center" alignItems="center" className={classes.section2} elevation={0}>
                    <Grid container direction="column" justify="center" alignItems="center" item xs={10} sm={6} md={6} lg={6} xl={4}>
                        <Typography className={classes.what}>
                            What is OKRU?
                    </Typography>
                        <Typography variant="body1" style={{ textAlign: 'justify' }}>Okru is a bunch of scratch-your-own-itch experimental tools I’ve built to track my goals and ensure both long and short term accountability. Most things of any value in life are hard and it takes an unbelievable amount of discipline to be even half decent at it. Getting fit in hard. Getting competent is hard. Building useful products is hard. And we can use all the help we can get. But from the moment we wake up every morning to the moment we fall asleep, we are subject to an onslaught of tools weaponized to capture our attention, and distract us, in some shape or form. I am convinced that discipline and self accountability separate people who do kickass things from people who do not, far more than intelligence or ‘talent’ (There’s of course a lot of self-selection and positive feedback loops, but I think this broadly holds). Deceiving oneself with feel-good narratives is one of the easiest things to do. There are always legitimate and valid reasons for not spending time on our goals, right? I want to be more accountable to myself. I want to set ambitious goals, make public commitments and track this over a long time. I want to talk less, and do more things, and I want delightfully fun tools helping me navigate this. I hope Okru will eventually evolve to solve some of this need.</Typography>
                        <Typography variant="h2" style={{ textAlign: 'center' }}>
                            “Is this yet-another-habit-tracking-app?”
                        </Typography>
                        <Typography variant="h2" style={{ textAlign: 'center' }}>
                            No. Hopefully :)
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container direction="column" justify="center" alignItems="center" className={classes.section3} elevation={0}>
                    <Grid container direction="column" item xs={10} sm={6} md={6} lg={6} xl={4}>


                        <Typography variant="h4" className={classes.what}>
                            Why I think this might actually work
                        </Typography>

                        <Typography variant="h5" className={classes.why}>

                            - Tracking daily habits ≠ Tracking life goals </Typography>
                        <Typography>
                            I have used almost all popular habit tracking apps. Some of them are great, some of them aren’t. But they are almost always focussing on immediate, daily tasks - with the final goals residing vaguely in our heads. With Okru, we begin with the broad goals, make them explicit, put them down and then work out the specific steps to get to those goals. It gets very real when it’s out of our heads, for people to see. It should ideally not take more than ~15 mins each week to make updates. Okru explicitly tries to not fight for your attention.<br></br><br></br></Typography>
                        <Typography variant="h5" className={classes.why}>- Okru will never have a leaderboard </Typography>
                        <Typography>
                            Accountability with close friends and onerself, are the only things that work, and scale. All tools that intend to hoodwink people into doing The Right Thing, are nonsense. Wanting to be better, and putting in the work are necessary conditions to being better. Personally, social-media related incentive structures do not work with me. But I care very deeply about what my closest friends think of me. I think if they asked me how I was doing on my goals each week, I’d actually make a lot of progress. Okru tries to make this possible.
                            I do not want paternalistic apps “nudging” me. I want my goals to be surfaced frequently so that I don’t get caught up in the humdrum of life. The self evaluations on Okru are just indicative by design. There’ll be no averaging out of any score to rank you on your goal-orientedness that you can put on your LinkedIn profile. I could potentially cheat on my updates. Nobody cares. There’s no audience to play to.<br></br><br></br></Typography>
                        <Typography variant="h5" className={classes.why}>- Goals are fluid</Typography>
                        <Typography>
                            There’s a lot to learn from how fluid our goals are, when not on paper
                            I believe that over 4-5 quarters I’ll have such a colourful view of my claimed priorities, my actual priorities, and how much they align. I’m excited for this. :)<br></br><br></br>
                        </Typography>

                        <Typography variant="caption">
                            * Much of the content here is just a condensed, and cached form of things said by much smarter people in books, tweets and talks.
                    </Typography>
                    </Grid>
                </Grid>

                <Grid container direction="column" justify="center" alignItems="center" className={classes.section2} elevation={0}>


                    <Grid container direction="column" justify="center" alignItems="center" item xs={10} sm={6} md={6} lg={6} xl={4}>
                        <Typography className={classes.what}>
                            Tool 1 : Personal OKRs
                    </Typography>
                        <Typography variant="body1" style={{ textAlign: 'justify' }}>
                            Objectives and Key Results are used in teams at Intel, Google etc. to outline broad (quarterly) goals for teams (and individuals), track progress and ensure accountability. Objectives are meant to be directional, and vague. Key Results are meant to be small, specific and measurable actions to reasonably satisfy an objective.<br></br>
                            Okru follows a quarterly cycle - I think it is a reasonable amount of time to make progress on goals. Objectives are ideally vague and ambitious, but Key results tend to be very very specific, actionable, and measurable. Measure systems and not goals - measuring the number of times you go to the gym is useful, but measuring your weight everyday may not be very actionable. Spend time thinking about Possible Failure Modes so that you can preempt and mitigate them. Don’t add more than 4-5 objectives, and 3-4 key results per objective. Also, make sure you round the goals out to everything important to you - fitness, work, academics etc. A common failure mode is to use this as an extra-work-hobby-only space. A good indication of reasonable OKRs is when your time distribution approximately matches the OKRs everyday. Note that all OKRs are currently public. At the end of each week, indicate how you’re doing on your goals - by clicking on bubbles below each KR.
                        <br></br>
                                - Red :   Haven’t made much progress<br></br>
                                - Yellow : Made some progress, need to step it up<br></br>
                                - Green : This is a pace I’d like to continue next week<br></br>
                            <br></br>
                            <br></br>
                            You can search for friends, follow them, and check out their OKRs! Finally, print your OKRs! Because it looks really cool on paper, trust me. I have my OKRs printed and stuck to my room wall, office desk, and my bathroom mirror.
                    </Typography>
                    <Grid container direction="row" justify="center" alignItems="center">
                    
                    <Grid container direction="column" justify="center" alignItems="center" item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <img  className={classes.img} src={img1}></img>
                                    <Typography>
                                        Add your OKRs
                                    </Typography>
                    </Grid>
                    
                    <Grid container direction="column" justify="center" alignItems="center" item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <img  className={classes.img}src={img2}></img>
                                    <Typography>
                                        Update your Progress
                                    </Typography>
                    </Grid>
                    
                    <Grid container direction="column" justify="center" alignItems="center" item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <img className={classes.img} src={img3}></img>
                    <Typography>
Print 'em out!                                    </Typography>
                    </Grid>
                    
                    
                    </Grid>
                        
                    </Grid>

                    <Grid container direction="column" justify="center" alignItems="center" item xs={10} sm={6} md={6} lg={6} xl={4}>
                        <Typography className={classes.what}>
                            Tool 2 : CoPom
                    </Typography>
                        <Typography variant="body1" style={{ textAlign: 'justify' }}>
                        In the Pomodoro Technique, you work in chunks of 25 mins with a break of 5 mins in between. I’ve been using this for a while everyday, with decent success. I love co-pomming with friends and decided to build it. It can get pretty lonely and disconnected working alone at homes, right now.
                        <br></br>- Start, pause, resume Poms
                        <br></br>- Add a one line description to each Pom to let other people know what you’re working on
                        <br></br>- Copom with friends you follow on Okru
                    </Typography>
                    <Grid container direction="row" justify="center" alignItems="center">
                    
                    
                    <Grid container direction="column" justify="center" alignItems="center" item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <img className={classes.img} src={img4}></img>
                    <Typography>
                    CoPom now!                                    </Typography>
                    </Grid>
                    
                    
                    </Grid>
                    <Button color="inherit" variant="outlined" className={classes.example} onClick={() => (window.location.href = '/?m=okrs&user=vivekaithal44&q=1&y=2020')}>Check out an example</Button>    
                    </Grid>
                </Grid>


                <Grid container direction="column" justify="center" alignItems="center" className={classes.section3} elevation={0}>
                    <Grid container direction="column" justify="center" alignItems="center"  item xs={10} sm={6} md={6} lg={6} xl={4}>
                    <Typography> Made with ❤︎ by Vivek
                        </Typography>    
                        <Typography>
                        Reach out to me in case you have any questions or want to discuss about it, at vivekaithal44[at]gmail[dot]com or <a href="https://twitter.com/nuwandavek">@nuwandavek</a>. Hope you get cracking on your goals! I send you much love from my end. :)
                        </Typography>

                    </Grid>
                </Grid>


            </Paper>

        )
    }
}

export default withStyles(styles)(FrontPage);
