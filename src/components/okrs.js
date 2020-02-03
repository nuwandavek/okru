import React from 'react';
// import LockIcon from '@material-ui/icons/Lock';
// import LockOpenIcon from '@material-ui/icons/LockOpen';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';

import FavoriteIcon from '@material-ui/icons/Favorite';
import WorkIcon from '@material-ui/icons/Work';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
// import MenuBookIcon from '@material-ui/icons/MenuBook';
import EditIcon from '@material-ui/icons/Edit';
// import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import SettingsIcon from '@material-ui/icons/Settings';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PaletteIcon from '@material-ui/icons/Palette';
import AddIcon from '@material-ui/icons/Add';

import {
    Paper, Grid, Typography, ListItem,
    ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Box, Breadcrumbs, Chip,
    List, ListItemAvatar, Avatar, ListItemText, Fab, Divider, Switch
} from '@material-ui/core';


const styles = theme => ({
    root: {
        background: '#fff',
        padding: '12px'
    },
    bold: {
        fontWeight: 800,
    },
    tableCenter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    heading: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: 'column'
    },
    col: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: '100%'
    },
    row: {
        display: "flex",
        // padding: "10px",
        flexDirection: "column",
        alignItems: 'flex-start'
    },
    brumb: {
        padding: 20,
    },
    bound: {
        // borderRadius: "5px",
        // border: "1px solid #aaa",
        // padding: "10px"
    },
    goal: {
        fontWeight: 800,
        fontSize: 15
    },
    goalMetric: {
        fontSize: 10
    },
    description: {
        paddingBottom: "10px"
    },
    darkBackground: {
        background: "#333"
    },
    dark: {
        background: "#333",
        color: '#fff'
    },
    edit: {
        background: "#333",
        color: '#fff',
        marginTop: "20px",
        "&:hover": {
            color: "#333",
            background: '#fff'
        },
    },
    followBox:{
        display: "flex",
        justifyContent:"center",
        alignItems: "center",
        flexDirection: "column"
    }
});



class Okrs extends React.Component {

    constructor(props) {
        super(props);
        const chipColor = '#333';

        this.state = {
            chips: {

                relationships: <Chip
                    style={{ background: chipColor, color: '#fff' }}
                    size="small"
                    icon={<FavoriteIcon style={{ background: chipColor, color: '#fff' }} />}
                    label="Relationships"
                />,
                fitness: <Chip
                    size="small"
                    style={{ background: chipColor, color: '#fff' }}
                    icon={<FitnessCenterIcon style={{ background: chipColor, color: '#fff' }} />}
                    label="Fitness"
                />,
                work:
                    <Chip
                        style={{ background: chipColor, color: '#fff' }}
                        size="small"
                        icon={<WorkIcon style={{ background: chipColor, color: '#fff' }} />}
                        label="Work"
                    />,
                creative:
                    <Chip
                        size="small"
                        style={{ background: chipColor, color: '#fff' }}
                        icon={<PaletteIcon style={{ background: chipColor, color: '#fff' }} />}
                        label="Creative"
                    />,
                other:
                    <Chip
                        size="small"
                        style={{ background: chipColor, color: '#fff' }}
                        icon={<SettingsIcon style={{ background: chipColor, color: '#fff' }} />}
                        label="Other"
                    />
            }


        }


    }


    render() {
        const { classes, okrList, handleOpenDialog, selfView, isSignedIn, userBeingViewed, isFollowing, handleFollow } = this.props;
        // console.log('in okr component',okrList);
        const followText = (isFollowing?<Typography variant="caption">Unfollow</Typography>
        :<Typography  variant="caption">Follow</Typography>)
        
        return (
            <Paper className={classes.root} elevation={0}>
                <Grid container direction="row" justify="space-between" alignItems="center">
                <Breadcrumbs className={classes.brumb} aria-label="breadcrumb">
                    <Typography color="inherit">{userBeingViewed}</Typography>
                    <Typography color="inherit">2020</Typography>
                    <Typography color="textPrimary">Q1</Typography>
                </Breadcrumbs>
                
                    {selfView?'':(isSignedIn&&okrList.length>0?<Box className={classes.followBox}><Switch
                    checked={isFollowing}
                    onChange={handleFollow}
                    value="follow"
                    color="primary"
                    inputProps={{ 'aria-label': 'default checkbox' }}
                />{followText}</Box>:'')}
                
                </Grid>
                {okrList.length>0?(okrList.map((okr) => (<ExpansionPanel key={okr.id} elevation={0}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={"panel-" + okr.id + "-content"}
                        id={"panel-" + okr.id + "-header"}
                    >
                        <Box className={classes.col}>
                            <Box className={classes.heading}>
                                {/* <EmojiObjectsOutlinedIcon fontSize="large" /> */}
                                <Typography className={classes.bold}>{okr.title}</Typography>
                                <Typography variant="body2" className={classes.description}>
                                    {okr.description}
                                </Typography>
                            </Box>
                            <Box className={classes.bound}>
                                {this.state.chips[okr.category]}

                            </Box>
                           

                        </Box>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.row}>

                        <List>

                            {okr.keyResults.map((kr, i) => (
                                <ListItem key={i}>
                                    <ListItemAvatar>
                                        <Avatar variant="rounded" className={classes.darkBackground}>
                                            <TrendingUpIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={kr.result} secondary={"SYSTEM METRIC : " + kr.metric} />
                                </ListItem>
                            ))}
                        </List>
                        <Typography variant="body2" className={classes.description}>
                                    <b>Possible Failure Mode : </b>{okr.failureMode}
                            </Typography>
                        <Grid container direction="row" justify="flex-end" style={{ width: '100%', display: "flex" }}>
                            {selfView&&isSignedIn?<Fab color="primary" aria-label="add" className={classes.edit}
                                onClick={() => handleOpenDialog(okr.id)}>
                                <EditIcon size="small" fontSize="small"/>
                            </Fab>:''}

                            <Divider style={{ marginTop: "20px", width: "100%" }} />
                        </Grid>



                    </ExpansionPanelDetails>
                </ExpansionPanel>))):
                <Typography>No OKRs yet!</Typography>
            }
                {selfView&&isSignedIn?<Grid container direction="column" alignItems="center" justify="center">
                <Fab color="primary" aria-label="add" className={classes.edit} onClick={() => handleOpenDialog(null)}>
                
                    <AddIcon />
                </Fab>
                <Typography variant="caption">Add New OKR</Typography>
                </Grid>:''}
            </Paper>

        )
    }
}

export default withStyles(styles)(Okrs);
