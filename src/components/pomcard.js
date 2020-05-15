import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Paper, Typography, Link, TextField, Grid, Breadcrumbs
} from '@material-ui/core';

import PomCircle from './pomcircle';


const styles = theme => ({
    pomcards:{
        padding: '5px',
        border: '1px #eee solid',
        margin: '2px',
        borderRadius: '5px'
    },
});



class PomCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            following: [],
        }
    }
  

    componentWillReceiveProps({ following }) {
        // console.log(following);
        this.setState({following:following});
    }

    render() {
        const { classes, pommer } = this.props;
     
        
        return (
            <Grid xs={3} item container className={classes.pomcards}  direction="column" justify="center" alignItems="center">
                <PomCircle time={0}></PomCircle>
                <Typography variant='caption'>{pommer}</Typography>
            </Grid>
        )
    }
}

export default withStyles(styles)(PomCard);
