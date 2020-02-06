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
import PrintIcon from '@material-ui/icons/Print';

import {
    Paper, Grid, Typography, ListItem, Button,
    ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Box, Breadcrumbs, Chip,
    List, ListItemAvatar, Avatar, ListItemText, Fab, Divider, Switch
} from '@material-ui/core';

import jsPDF from 'jspdf';

import { textAlign } from '@material-ui/system';


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
        paddingBottom: "10px",
        textAlign: 'left'
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
        boxShadow: "none",
        "&:hover": {
            color: "#333",
            background: '#fff'
        },
    },
    followBox: {
        display: "flex",
        justifyContent: "center",
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
        this.printOKR = this.printOKR.bind(this);


    }


    printOKR = (okrs, user) => {
        console.log("print");
        var doc = new jsPDF({
            orientation : 'landscape'
        });

        

        const width = 297
        const height = 210
        const paddingHorizontal = 20
        const paddingVertical = 20
        const gutter = 2
        const columnPad = 3
        

        const columnWidth = (width - 2*paddingHorizontal - (okrs.length-1)*gutter)/okrs.length;
        const columnHeight = height - 2*paddingVertical;
        
        function x(val){
            return val+paddingHorizontal
        }
        function y(val){
            return val+paddingVertical
        }

        console.log(columnWidth, columnHeight, doc.getFontList())
        
        doc.setFont('helvetica')
        doc.setFontSize(70)
        doc.text(parseInt(width/2), y(0), 'okru', {align:'center'})
        doc.setTextColor('#999')
        doc.setFontSize(15)
        doc.setFont('courier')
        doc.text(parseInt(width/2), y(10), user+'/2020/Q1', {align:'center'})
        doc.setFont('helvetica')
        doc.setTextColor('#000')
        
        doc.setFontStyle('bold')
        doc.setFontSize(10)
        doc.text(17, y(60), 'OBJECTIVES', {rotationDirection:1, angle: 90, charSpace: 2})
        doc.text(17, y(140), 'KEY RESULTS', {rotationDirection:1, angle: 90, charSpace: 2})
        doc.setDrawColor('#aaa')
        doc.setFontSize(7)
        doc.setFont('courier')
        doc.text(width-80, height-2, ('https://okru.app/?user='+user), {charSpace: 0})
        

        okrs.forEach((okr,i)=>{
            let line = 25
            let step = 5
            
            doc.setTextColor('#fff')
            doc.setFont('helvetica')
            doc.setDrawColor('#000')
            doc.setFontSize(15)
            doc.roundedRect(x(i*(columnWidth+gutter)), y(15), columnWidth, columnHeight, 3, 3, 'S')
            doc.setFillColor('#333')
            doc.roundedRect(x(i*(columnWidth+gutter)), y(15), columnWidth, 50, 3, 3, 'F')
            doc.setFontStyle('bold')
            var splitTitle = doc.splitTextToSize(okr.title, columnWidth-2*columnPad);
            for (var j = 0; j < splitTitle.length; j++) {

                doc.text(x(i*(columnWidth+gutter) + columnWidth/2), y(line),splitTitle[j], {align:'center', charSpace: 0});
                line=line+step
            }
            doc.setFontStyle('normal')
            doc.setFontSize(10)
            var splitTitle = doc.splitTextToSize(okr.description, columnWidth-2*columnPad);
            for (var j = 0; j < splitTitle.length; j++) {

                doc.text(x(i*(columnWidth+gutter) + columnWidth/2), y(line),splitTitle[j], {align:'center', charSpace: 0});
                line=line+step
            }
            line = 75;
            doc.setTextColor('#000')
            okr.keyResults.forEach((kr)=>{
                var splitTitle = doc.splitTextToSize((kr.result+' [System Metric : '+kr.metric+'] '), columnWidth-2*columnPad);
                for (var j = 0; j < splitTitle.length; j++) {

                    doc.text(x(i*(columnWidth+gutter) + columnWidth/2), y(line),splitTitle[j], {align:'center', charSpace: 0});
                    line=line+step
                }
                doc.setDrawColor('#aaa')
                doc.line(x(i*(columnWidth+gutter)+columnPad),y(line),x(i*(columnWidth+gutter)+columnWidth-columnPad),y(line),'F')
                line = line+8;
            });
            var splitTitle = doc.splitTextToSize(('Possible Failure Mode : '+okr.failureMode), columnWidth-2*columnPad);
            for (var j = 0; j < splitTitle.length; j++) {

                doc.text(x(i*(columnWidth+gutter) + columnWidth/2), y(line),splitTitle[j], {align:'center', charSpace: 0});
                line=line+step
            }
            
            

        })
        
        // Save the Data
        doc.save('okru.pdf')
        
        // var string = doc.output('datauristring');
        // var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
        // var x = window.open();
        // x.document.open();
        // x.document.write(iframe);
        // x.document.close();

        

  

    }


    render() {
        const { classes, okrList, handleOpenDialog, selfView, isSignedIn, userBeingViewed, isFollowing, handleFollow } = this.props;
        // console.log('in okr component',okrList);
        const followText = (isFollowing ? <Typography variant="caption">Unfollow</Typography>
            : <Typography variant="caption">Follow</Typography>)

        return (
            <Paper className={classes.root} elevation={0}>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Breadcrumbs className={classes.brumb} aria-label="breadcrumb">
                        <Typography color="inherit">{userBeingViewed}</Typography>
                        <Typography color="inherit">2020</Typography>
                        <Typography color="textPrimary">Q1</Typography>
                    </Breadcrumbs>

                    {selfView && isSignedIn ? 
                    <Fab color="primary" aria-label="add" size="small" className={classes.edit} onClick={()=>this.printOKR(okrList, userBeingViewed)}>

                        <PrintIcon fontSize="small" />
                    </Fab>
                      : (isSignedIn && okrList.length > 0 ? <Box className={classes.followBox}><Switch
                            checked={isFollowing}
                            onChange={handleFollow}
                            value="follow"
                            color="primary"
                            inputProps={{ 'aria-label': 'default checkbox' }}


                        />{followText}</Box> : '')}

                </Grid>
                {okrList.length > 0 ? (okrList.map((okr) => (<ExpansionPanel key={okr.id} elevation={0}>
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
                                    <ListItemText primary={kr.result} secondary={"System Metric : " + kr.metric} />
                                </ListItem>
                            ))}
                        </List>
                        <Typography variant="body2" className={classes.description}>
                            <b>Possible Failure Mode : </b>{okr.failureMode}
                        </Typography>
                        <Grid container direction="row" justify="flex-end" style={{ width: '100%', display: "flex" }}>
                            {selfView && isSignedIn ? <Fab size="small" color="primary" aria-label="add" className={classes.edit}
                                onClick={() => handleOpenDialog(okr.id)}>
                                <EditIcon fontSize="small" />
                            </Fab> : ''}

                            <Divider style={{ marginTop: "20px", width: "100%" }} />
                        </Grid>



                    </ExpansionPanelDetails>
                </ExpansionPanel>))) :
                    <Typography>No OKRs yet!</Typography>
                }
                {selfView && isSignedIn ? <Grid container direction="column" alignItems="center" justify="center">
                    <Fab color="primary" aria-label="add" className={classes.edit} onClick={() => handleOpenDialog(null)}>

                        <AddIcon />
                    </Fab>
                    <Typography variant="caption">Add New OKR</Typography>
                </Grid> : ''}
            </Paper>

        )
    }
}

export default withStyles(styles)(Okrs);
