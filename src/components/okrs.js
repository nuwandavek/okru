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
import SpeedIcon from '@material-ui/icons/Speed';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';

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
    descriptionPFM:{
        paddingBottom: "10px",
        textAlign: 'left',
        borderLeft: "5px #c0392b solid",
        paddingLeft: "20px",
        
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
    },
    homeAdd: {
        marginTop: "50px"
    },
    kr: {
        borderLeft: "5px #000 solid",
        paddingLeft: "20px",
        marginBottom: "10px"
    },
    bubbles:{
        flex:0,
        paddingRight: "10px",
        paddingTop: "10px"
    }
});



class Okrs extends React.Component {

    constructor(props) {
        super(props);
        const chipColor = '#eee';
        const chipTextColor = '#000';


        this.state = {
            chips: {

                relationships: <Chip
                    style={{ background: chipColor, color: chipTextColor }}
                    // variant="outlined"
                    size="small"
                    icon={<FavoriteIcon style={{ color: chipTextColor }} />}
                    label="Relationships"
                />,
                fitness: <Chip
                    size="small"
                    // variant="outlined"
                    style={{ background: chipColor, color: chipTextColor }}
                    icon={<FitnessCenterIcon style={{ color: chipTextColor }} />}
                    label="Fitness"
                />,
                work:
                    <Chip
                        style={{ background: chipColor, color: chipTextColor }}
                        size="small"
                        // variant="outlined"
                        icon={<WorkIcon style={{ color: chipTextColor }} />}
                        label="Work"
                    />,
                creative:
                    <Chip
                        size="small"
                        // variant="outlined"
                        style={{ background: chipColor, color: chipTextColor }}
                        icon={<PaletteIcon style={{ color: chipTextColor }} />}
                        label="Creative"
                    />,
                other:
                    <Chip
                        size="small"
                        // variant="outlined"
                        style={{ background: chipColor, color: chipTextColor }}
                        icon={<SettingsIcon style={{ color: chipTextColor }} />}
                        label="Other"
                    />
            }


        }
        this.printOKR = this.printOKR.bind(this);
        this.findWeeksinQuarter = this.findWeeksinQuarter.bind(this);
        // this.updateProgressBubble = this.updateProgressBubble.bind(this);


    }


    printOKR = (okrs, user) => {
        // console.log("print");
        var doc = new jsPDF({
            orientation: 'landscape'
        });



        const width = 297
        const height = 210
        const paddingHorizontal = 20
        const paddingVertical = 20
        const gutter = 2
        const columnPad = 3


        const columnWidth = (width - 2 * paddingHorizontal - (okrs.length - 1) * gutter) / okrs.length;
        const columnHeight = height - 2 * paddingVertical;

        function x(val) {
            return val + paddingHorizontal
        }
        function y(val) {
            return val + paddingVertical
        }

        // console.log(columnWidth, columnHeight, doc.getFontList())

        doc.setFont('helvetica')
        doc.setFontSize(70)
        doc.text(parseInt(width / 2), y(0), 'okru', { align: 'center' })
        doc.setTextColor('#999')
        doc.setFontSize(15)
        doc.setFont('courier')
        doc.text(parseInt(width / 2), y(10), user + '/2020/Q1', { align: 'center' })
        doc.setFont('helvetica')
        doc.setTextColor('#000')

        doc.setFontStyle('bold')
        doc.setFontSize(10)
        doc.text(17, y(60), 'OBJECTIVES', { rotationDirection: 1, angle: 90, charSpace: 2 })
        doc.text(17, y(140), 'KEY RESULTS', { rotationDirection: 1, angle: 90, charSpace: 2 })
        doc.setDrawColor('#aaa')
        doc.setFontSize(7)
        doc.setFont('courier')
        doc.text(width - 80, height - 2, ('https://okru.app/?user=' + user), { charSpace: 0 })


        okrs.forEach((okr, i) => {
            let line = 25
            let step = 5

            doc.setTextColor('#fff')
            doc.setFont('helvetica')
            doc.setDrawColor('#000')
            doc.setFontSize(15)
            doc.roundedRect(x(i * (columnWidth + gutter)), y(15), columnWidth, columnHeight, 3, 3, 'S')
            doc.setFillColor('#333')
            doc.roundedRect(x(i * (columnWidth + gutter)), y(15), columnWidth, 50, 3, 3, 'F')
            doc.setFontStyle('bold')
            var splitTitle = doc.splitTextToSize(okr.title, columnWidth - 2 * columnPad);
            for (var j = 0; j < splitTitle.length; j++) {

                doc.text(x(i * (columnWidth + gutter) + columnWidth / 2), y(line), splitTitle[j], { align: 'center', charSpace: 0 });
                line = line + step
            }
            doc.setFontStyle('normal')
            doc.setFontSize(10)
            var splitTitle = doc.splitTextToSize(okr.description, columnWidth - 2 * columnPad);
            for (var j = 0; j < splitTitle.length; j++) {

                doc.text(x(i * (columnWidth + gutter) + columnWidth / 2), y(line), splitTitle[j], { align: 'center', charSpace: 0 });
                line = line + step
            }
            line = 75;
            doc.setTextColor('#000')
            okr.keyResults.forEach((kr) => {
                var splitTitle = doc.splitTextToSize((kr.result + ' [System Metric : ' + kr.metric + '] '), columnWidth - 2 * columnPad);
                for (var j = 0; j < splitTitle.length; j++) {

                    doc.text(x(i * (columnWidth + gutter) + columnWidth / 2), y(line), splitTitle[j], { align: 'center', charSpace: 0 });
                    line = line + step
                }
                doc.setDrawColor('#aaa')
                doc.line(x(i * (columnWidth + gutter) + columnPad), y(line), x(i * (columnWidth + gutter) + columnWidth - columnPad), y(line), 'F')
                line = line + 8;
            });
            var splitTitle = doc.splitTextToSize(('Possible Failure Mode : ' + okr.failureMode), columnWidth - 2 * columnPad);
            for (var j = 0; j < splitTitle.length; j++) {

                doc.text(x(i * (columnWidth + gutter) + columnWidth / 2), y(line), splitTitle[j], { align: 'center', charSpace: 0 });
                line = line + step
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


    findWeeksinQuarter = (q,y) =>{
        let jan1 = new Date(y,0,1)
        let d1,d2;
        if (q==='Q1'){
            d1 = new Date(y,0,1)
            d2 = new Date(y,2,31)
        }
        else if (q==='Q2'){
            d1 = new Date(y,3,1)
            d2 = new Date(y,5,30)
        }
        else if (q==='Q3'){
            d1 = new Date(y,6,1)
            d2 = new Date(y,8,30)
        }
        else if (q==='Q4'){
            d1 = new Date(y,9,1)
            d2 = new Date(y,11,31)
        }

        let w1 = Math.ceil(((d1 - jan1 + 86400000)/86400000)/7);
        let w2 = Math.ceil(((d2 - jan1 + 86400000)/86400000)/7)

        return (w2-w1+1);
        
    }


    render() {
        const { classes, okrList, handleOpenDialog, selfView, isSignedIn, userBeingViewed, isFollowing, handleFollow, quarter, year, updateProgress } = this.props;
        // console.log('in okr component',okrList);
        // this.setState({okrList});
        const followText = (isFollowing ? <Typography variant="caption">Unfollow</Typography>
            : <Typography variant="caption">Follow</Typography>)

        // let weeks = new Array(this.findWeeksinQuarter(quarter,year)).fill(-1);
        
        // console.log(weeks);
        


        return (
            <Paper className={classes.root} elevation={0}>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Breadcrumbs className={classes.brumb} aria-label="breadcrumb">
                        <Typography color="inherit">{userBeingViewed}</Typography>
                        <Typography color="inherit">{year}</Typography>
                        <Typography color="textPrimary">{quarter}</Typography>
                    </Breadcrumbs>

                    {selfView && isSignedIn ?

                        <Fab color="primary" aria-label="add" size="small" className={classes.edit} onClick={() => this.printOKR(okrList, userBeingViewed)}>
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
                {okrList.length > 0 ? (okrList.map((okr,k) => (<ExpansionPanel key={okr.id} elevation={0}>
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
                                <ListItem key={i} className={classes.kr}>
                                    {/* <ListItemAvatar>
                                        <Avatar variant="rounded" className={classes.darkBackground}>
                                            <TrendingUpIcon />
                                        </Avatar>
                                    </ListItemAvatar> 

                                    <ListItemText primary={kr.result} secondary={"System Metric : " + kr.metric} className={classes.kr}/>
                                    */}
                                    <Grid container direction="column" justify="center" alignItems="flex-start">
                                    <Typography>{kr.result}</Typography>
                                    <Chip
                                        icon={<SpeedIcon />}
                                        label={<Typography variant="caption">System Metric : <Typography variant="button">{kr.metric}</Typography></Typography>}                                   
                                        size="small"
                                        color="default"
                                        variant="outlined"
                                    />
                                    <Grid container direction="row">
                                        {   
                                            kr.progress.map((d,j)=>{
                                                let weekLabel = <Typography variant="caption">{'W'+(j+1)}</Typography>;
                                                let circleColor;
                                                if(d===0) {
                                                    return (
                                                        <Grid container direction="column" key={k*100 + i * 10 + j} className={classes.bubbles} alignItems="center">
                                                            
                                                            <FiberManualRecordOutlinedIcon onClick={()=>updateProgress(k,i,j)}  fontSize="small"  key={k*100 + i * 10 + j} style={{color:'#bdc3c7'}}/>
                                                            {weekLabel}
                                                        </Grid>
                                                    )
                                                }
                                                else if(d===1)  circleColor =  "#c0392b";
                                                else if(d===2)  circleColor =  "#f1c40f";
                                                else  circleColor =  "#27ae60";
                                                let circle = <FiberManualRecordIcon 
                                                onClick={()=>updateProgress(k,i,j)} 
                                                fontSize="small"  key={k*100 + i * 10 + j} style={{color:circleColor}}/>
                                                return (
                                                    <Grid container direction="column"  key={k*100 + i * 10 + j} className={classes.bubbles} alignItems="center">
                                                        
                                                        {circle}
                                                        {weekLabel}
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>

                                    </Grid>
                                    
                                    
                                </ListItem>
                            ))}
                        </List>
                        
                        {/* <Grid container direction="row">
                            <Chip
                                        label={<Typography variant="overline">Possible Failure Mode</Typography>}                                   
                                        size="small"
                                        color="secondary"
                                        // variant="outlined"
                                    /> */}
                        <Typography variant="body2" className={classes.descriptionPFM}>
                        <b>Possible Failure Mode : </b>
                        {okr.failureMode}
                        </Typography>
                        {/* </Grid> */}
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
                {selfView && isSignedIn ? <Grid container direction="column" alignItems="center" justify="center" className={classes.homeAdd}>
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
