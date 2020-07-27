import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Paper, Typography, Link, TextField, Grid, Breadcrumbs, Chip, Fab, IconButton
} from '@material-ui/core';

import PomCircle from './pomcircle';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import NotesIcon from '@material-ui/icons/Notes';
import SubjectIcon from '@material-ui/icons/Subject';
import ChatIcon from '@material-ui/icons/Chat';
import EditIcon from '@material-ui/icons/Edit';
import CommentIcon from '@material-ui/icons/Comment';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SaveIcon from '@material-ui/icons/Save';

import TextFieldCharCount from './textfieldcharcount';

const styles = theme => ({
    pomcards: {
        border: '1px #eee solid',
        margin: '2px',
        borderRadius: '5px',
    },
    pomColor: {
        color: '#c0392b'
    },
    outline: {
        border: '2px #c0392b solid',
    },
    txt: {
        display: 'flex',
        alignItems: 'center',
        borderTop: '1px solid #eee',
        margin: '5px',
        padding: '1px'
    },
    edit: {
        border: "2px solid #c0392b",
        color: '#c0392b',
        background: '#fff',
        boxShadow: "none",
        "&:hover": {
            border: "2px solid #fff",
            background: '#fff',
        
        },
    },
    buttonPlay:{
        width: "auto !important",
    }
});



class PomCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            textEdit: false,
            text: props.pomData.text,
            status: props.pomData.status
        }
    }


    componentWillReceiveProps({ pomData}) {
        // console.log(following);
        // const pommerStats = {
        //     time: 15,
        //     poms: 4,
        //     status: 'inprogress',
        //     text: "I'm working on adding copoms to okru"
        // }
        this.setState({text: pomData.text, status:pomData.status})

    }

    // componentDidUpdate({pomData}){
    //     this.setState({text: pomData.text, status:pomData.status});
    // }

    render() {
        const { classes, pomData, startPom, pausePom, textPom, resumePom, selfPom } = this.props;

        // this.setState({text: pomData.text, status:pomData.status});
        const pomArray = new Array(pomData.poms).fill(0);


        return (
            <Grid item container className={`${classes.pomcards} ${selfPom ? classes.outline : ""} ${classes.buttonPlay}`} 
            direction="column" justify="space-around" alignItems="center">

                    <Link color="inherit" href={"/?user=" + pomData.pommer}>
                        <Typography variant='overline'>{pomData.pommer}</Typography>
                    </Link>
                    {/* <Typography variant='overline'>{pomData.pommer}</Typography> */}

                {
                    pomData.poms > 0 ? (
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Typography variant="subtitle2">Today : </Typography>
                            {pomArray.map((f, j) => (<FiberManualRecordIcon key={j} className={classes.pomColor} />))}
                        </Grid>
                    ) : (
                            <Typography variant='caption'>No Completed Poms Today!</Typography>
                        )
                }

                <PomCircle time={pomData.time} status={this.state.status}></PomCircle>



                {selfPom?
                    <Grid container direction="row" justify="space-evenly" className={classes.buttonPlay}>
                        {this.state.status==='inprogress'?
                        (
                        !this.state.textEdit?
                            (<Fab size="small" color="primary" aria-label="add" className={classes.edit}
                            onClick={()=>this.setState({textEdit:true})}
                            >
                                <EditIcon fontSize="small" />
                            </Fab>):
                            (
                            <Fab size="small" color="primary" aria-label="add" className={classes.edit}
                            onClick={()=>{
                                textPom(this.state.text);
                                this.setState({textEdit:false})
                                }
                            }
                            >
                                <SaveIcon fontSize="small" />
                            </Fab>
                            )
                        ):('')
                        }
                    
                        {   
                            this.state.status==='inprogress'?
                            (<Fab size="small" color="primary" aria-label="add" className={classes.edit}
                            onClick={()=>{
                                pausePom();
                                this.setState({status:'pause'})
                                }
                            }
                            >
                                <PauseIcon fontSize="small" />
                            </Fab>):(<Fab size="small" color="primary" aria-label="add" className={classes.edit}
                            onClick={()=>{
                                if(pomData.time===0){
                                    startPom();
                                }
                                else{
                                    resumePom();
                                }
                                this.setState({status:'inprogress'})
                                }
                            }
                            >
                                <PlayArrowIcon fontSize="small" />
                            </Fab>)
                        }
                    </Grid>:''
                }
                    
                
                {
                    pomData.time>0?(
                    this.state.textEdit?
                    (
                        <TextFieldCharCount
                                    required
                                    id="outlined-required"
                                    label="Task"
                                    onChange={(e)=>this.setState({text:e.target.value})}
                                    value={this.state.text}
                                    variant="outlined"
                                    fullWidth
                                    inputProps={{
                                        maxLength: 100,
                                    }}
                                />
                    ):(
                        <Typography variant='body2' className={classes.txt}>
                    
                            <FormatQuoteIcon style={{ color: '#555', transform: 'scale(-1, -1)' }}></FormatQuoteIcon>
                            {this.state.text}
                            <FormatQuoteIcon style={{ color: '#555' }}></FormatQuoteIcon>

                        </Typography>
                    )
                    ):('')
                }
                
            </Grid>
        )
    }
}

export default withStyles(styles)(PomCard);
