import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, Link, TextField, Grid, Breadcrumbs
} from '@material-ui/core';

import PomCard from './pomcard';

const styles = theme => ({
    brumb: {
        padding: 20,
        borderRadius: 0,
        // borderBottom: '1px #eee solid'
    },
    pomcards:{
        padding: '10px',
        minHeight: '200px',
        border: '1px #eee solid',
        margin: '2px',
        borderRadius: '5px'

    }
});



class CoPom extends React.Component {

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
        const { classes, following, user } = this.props;
     
        
        return (
            <Paper elevation={0}>
            <Grid container className={classes.brumb} direction="row" justify="space-between" alignItems="center">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography color="inherit">CoPom</Typography>
                    </Breadcrumbs>
            </Grid>
            <Grid container direction="row">
                <PomCard pommer={user.userID}></PomCard>
                {
                    following.map((d,i)=>(
                        <PomCard pommer={d} key={i}></PomCard>
                    ))
                }
            </Grid>
            </Paper>

        )
    }
}

export default withStyles(styles)(CoPom);
