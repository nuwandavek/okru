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
                        <Typography variant="body1" style={{ textAlign: 'justify' }}>OKRU is a bunch of scratch-your-own-itch, experimental and open-source tools to track goals for ensuring both long and short term accountability. Most things of any value in life are hard and it takes an unbelievable amount of discipline to be even half decent at them. Getting fit in hard. Getting competent is hard. Building useful products is hard. And we can use all the help we can get.
                        
                        <br></br> 
                        <br></br> 
                        But from the moment we wake up every morning to the moment we fall asleep, we are subject to an onslaught of tools weaponized to capture our attention, and distract us, in some shape or form. I am convinced that discipline and self accountability separate people who do kickass things from people who do not, far more than intelligence or 'talent' (There's of course a lot of self-selection and positive feedback loops, but I think this broadly holds). Deceiving oneself with feel-good narratives is one of the easiest things to do. There are always legitimate and valid reasons for not spending time on our goals, right? I want to be more accountable to myself. I want to set ambitious goals, make public commitments and track this over a long time. I want to talk less, and act more - deliberately and decisively - with delightfully fun tools helping me navigate the terrain. I hope OKRU will eventually evolve to solve some of this need.</Typography>
                        <Typography variant="h2" style={{ textAlign: 'left', width: "100%"}}>
                            “Is this yet-another-habit-tracking-app?”
                        </Typography>
                        <Typography variant="h2" style={{ textAlign: 'right', width: "100%" }}>
                            No. Hopefully :)
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container direction="column" justify="center" alignItems="center" className={classes.section3} elevation={0}>
                    <Grid container direction="column" item xs={10} sm={6} md={6} lg={6} xl={4}>


                        <Typography variant="h4" className={classes.what}>
                            Why I think OKRU might actually work
                        </Typography>

                        <Typography variant="h5" className={classes.why}>

                            - Tracking daily habits ≠ Tracking life goals </Typography>
                        <Typography>
                        I have used almost all popular habit tracking apps. Some of them are great, most of them aren't. But they almost always focuss on immediate, daily tasks - with the final goals residing vaguely in our heads. With OKRU, we begin with the broad goals, make them explicit, put them down and then work out specific steps to get to those goals. It gets very real when it's out of our heads, for people to see.<br></br><br></br></Typography>
                        <Typography variant="h5" className={classes.why}>- OKRU will never have a leaderboard </Typography>
                        <Typography>
                        Accountability with close friends and onerself, are the only things that work, and scale. All tools that intend to hoodwink people into doing 'The Right Thing', are nonsense. Wanting to be better, and putting in the work are necessary conditions to being better. Personally, social-media related incentive structures do not work with me. But I care very deeply about what my closest friends think of me. I suspect if they asked me how I was doing on my goals each week, I'd actually make more progress than otherwise. OKRU tries to facilitate this. I do not want paternalistic apps "nudging" me. I want my goals to be surfaced frequently, and collaboratively so that I can avoid getting  caught up in the humdrum of life. The self evaluations on OKRU are also only indicative, by design. There will be no averaging of any score to rank you on your goal-orientedness that you can put on your LinkedIn profile. I could potentially cheat on my updates. Nobody cares. There's no audience to play to.<br></br><br></br></Typography>
                        <Typography variant="h5" className={classes.why}>- Goals are fluid</Typography>
                        <Typography>
                        There's a lot to learn from how fluid our goals are, when not on paper. Self clarification leads to most gains in terms of evaluating what we want. OKRU wants to facilitate this self confrontation (not in a negative way). I believe that over 4–5 quarters I'll have a colourful view of my claimed priorities, my actual priorities, and how much they align. I'm excited for this. :)<br></br><br></br>
                        </Typography>

                        <Typography variant="caption">
                            * Much of the content here is just a condensed, and cached form of things said by much smarter people in <a href="https://jamesclear.com/atomic-habits">books</a>, <a href="https://twitter.com/naval/status/1084739181593559040">tweets</a> and <a href="https://nav.al/addiction">talks</a>.
                    </Typography>
                    </Grid>
                </Grid>

                <Grid container direction="column" justify="center" alignItems="center" className={classes.section2} elevation={0}>


                    <Grid container direction="column" justify="center" alignItems="center" item xs={10} sm={6} md={6} lg={6} xl={4}>
                        <Typography className={classes.what}>
                            Tool 1 : Personal OKRs
                    </Typography>
                        <Typography variant="body1" style={{ textAlign: 'justify' }}>
                        Objectives and Key Results is a goal-setting system used in teams at Intel, Google etc. to outline broad (quarterly) goals for teams (and individuals), track progress and ensure accountability. Objectives are meant to be directional and Key Results, actionable means to reasonably satisfy an objective. OKRU follows a quarterly cycle - I think it is a reasonable amount of time to make progress on goals. Objectives are ideally vague and ambitious, but Key results tend to be very very specific, simple, and measurable. An important addition is to measure systems and not goals - measuring the number of times you go to the gym is useful, but measuring your weight everyday may not be very actionable. <br></br>
                        <br></br> 
                        
                        Spending time thinking about Possible Failure Modes can help preempt and mitigate them. Do not add more than 4–5 objectives, and 3–4 key results per objective. Make sure you round the goals out to everything important to you - fitness, work, academics etc. A common failure mode is to use this as an extra-work-hobby-only space. A good indication of well crafted OKRs is the overlap of your time approximate distribution of time on OKRs and other activities each day. Note that all OKRs on OKRU are currently public. At the end of each week, indicate how you're doing on your goals - by clicking on bubbles below each KR [Red : Haven't made much progress; Yellow : Made some progress, need to step it up; Green : This is a pace I'd like to continue next week]
                            <br></br><br></br> 
                            You can also search for friends, follow them, and check out their OKRs. Finally, print your OKRs! Because it looks really cool on paper, trust me. I have my OKRs printed and stuck to my room wall, office desk, and my bathroom mirror. :)
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
                        In the Pomodoro Technique, you work in chunks of 25 minutes with a break of 5 minutes in between. I've been using this for a while everyday, with decent success. I love co-pomming with friends and decided to build it into OKRU. It can get pretty lonely and disconnected working alone at homes, right now. Currently on OKRU, you can :
                        <br></br>- Start, pause, resume Poms
                        <br></br>- Add a one line description to each Pom to let other people know what you’re working on
                        <br></br>- Copom with friends you follow on OKRU
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
                        <Typography>
                        The idea is to build OKRU, over time, to be useful. So, you can fully expect current useless features to be mercilessly removed, and new features to be added. I'm working on more minute privacy controls and a short mail digest each week of friends' updates, as you read this. Do add your OKRs, CoPom with friends, and let me know how it goes!
                        <br></br>You can also add issues/new feature requests on <a href="https://github.com/nuwandavek/okru/issues">Github Issues</a>.
                        <br></br><br></br> 
                        Reach out to me in case you have any questions or want to discuss about it, at vivekaithal44[at]gmail[dot]com or <a href="https://twitter.com/nuwandavek">@nuwandavek</a>. Hope you get cracking on your goals! I send you much love from my end. :)
                        </Typography>
                        <Typography> Made with ❤︎ by Vivek</Typography>    

                    </Grid>
                </Grid>


            </Paper>

        )
    }
}

export default withStyles(styles)(FrontPage);
