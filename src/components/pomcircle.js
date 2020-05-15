import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Paper, Typography, Link, TextField, Grid, Breadcrumbs
} from '@material-ui/core';


const styles = theme => ({
    pomInProgress:{
        width:'100px',
        height:'100px',
        borderRadius:'50px',
        background: '#c0392b'

    },
    pomNotInProgress:{
        width:'100px',
        height:'100px',
        borderRadius:'50px',
        background: '#eee'

    }
});



class PomCircle extends React.Component {

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
        const { classes, time } = this.props;

        const circle = (
            time>0 ? 
            <Paper elevation={0} className={classes.pomInProgress}>
                
            </Paper>
            :
            <Paper  elevation={0} className={classes.pomNotInProgress}></Paper>
        )

     
        
        return (
            <Paper elevation={0}>
                {circle}
            </Paper>
        )
    }
}

export default withStyles(styles)(PomCircle);
