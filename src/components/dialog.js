import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

import {
    Typography, Button, Dialog, AppBar, Avatar, Fab,
    Toolbar, IconButton, Grid, TextField, FormControl, InputLabel, Select, MenuItem
} from '@material-ui/core';

import TextFieldCharCount from '../components/textfieldcharcount'


const styles = theme => ({
    root: {
        background: '#eaeff0',
        padding: '12px'
    },
    bold: {
        fontWeight: 800,
        padding: "10px"
    },
    tableCenter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    heading: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
    },
    col: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
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
        borderRadius: "5px",
        border: "1px solid #aaa",
        padding: "10px"
    },
    goal: {
        fontWeight: 800,
        fontSize: 15
    },
    goalMetric: {
        fontSize: 10
    },
    description: {
        paddingBottom: "20px"
    },
    fail: {
        marginTop: "10px"
    },
    darkBackground: {
        background: "#333",
        "&:hover": {
            color: "#333",
            background: '#fff'
        },
    },
    dark: {
        background: "#333",
    },
    appBar: {
        position: 'relative',
        background: '#333'
    },
    toolBar: {
        justifyContent: 'space-between'
    },
    form: {
        padding: "50px"
    },
    category: {
        background: "#fff",
        padding: "1px",
    },
    formControl: {
        width: '100%'
    },
    obj: {
        paddingTop: "30px",
        fontSize: "20px",
        letterSpacing: "10px",
        textAlign: "center",
        width: "100%"
    },
    buttonify: {
        cursor: "pointer"
    }
});



class Edit extends React.Component {

    constructor(props) {
        super(props);
        const { showOKR } = props;
        const objective = {
            id: showOKR.id,
            title: showOKR.title,
            description: showOKR.description,
            failureMode: showOKR.failureMode,
            category: showOKR.category
        }
        const keyResults = [];
        showOKR.keyResults.forEach((d, i) => {
            keyResults.push({ id: i, result: d.result, metric: d.metric, progress: d.progress });
        })


        this.state = {
            objective, keyResults
        }

        this.addKR = this.addKR.bind(this);
        this.deleteKR = this.deleteKR.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.changeFailureMode = this.changeFailureMode.bind(this);
        this.changeKRResult = this.changeKRResult.bind(this);
        this.changeKRMetric = this.changeKRMetric.bind(this);
    }

    componentWillReceiveProps({ showOKR }) {
        const objective = {
            id: showOKR.id,
            title: showOKR.title,
            description: showOKR.description,
            failureMode: showOKR.failureMode,
            category: showOKR.category
        }

        const keyResults = [];
        showOKR.keyResults.forEach((d, i) => {
            keyResults.push({ id: i, result: d.result, metric: d.metric, progress: d.progress });
        })


        this.setState({ objective, keyResults })
    }

    addKR = event => {
        this.setState(state => {
            const newKR = state.keyResults;
            newKR.push({ id: newKR.length, result: "", metric: "", progress: [0,0,0,0,0,0,0,0,0,0,0,0] });
            let temp = {
                ...state,
                keyResults: newKR
            }
            return temp
        });

    };

    changeCategory = event => {
        const newCategory = event.target.value;
        this.setState({ objective: { ...this.state.objective, category: newCategory } });
    };

    deleteKR = deleteID => {
        const newKR = this.state.keyResults.filter((d) => (d.id !== deleteID));
        this.setState({ keyResults: newKR });
    };

    changeTitle = event => {
        this.setState({ objective: { ...this.state.objective, title: event.target.value } });
    }
    changeDescription = event => {
        this.setState({ objective: { ...this.state.objective, description: event.target.value } });
    }
    changeFailureMode = event => {
        this.setState({ objective: { ...this.state.objective, failureMode: event.target.value } });
    }
    changeKRResult = (event, id) => {
        const newKR = this.state.keyResults.map((d, i) => {
            if (d.id === id) {
                d.result = event.target.value;
            }
            return d;
        });
        this.setState({ keyResults: newKR });
    }
    changeKRMetric = (event, id) => {
        const newKR = this.state.keyResults.map((d, i) => {
            if (d.id === id) {
                d.metric = event.target.value;
            }
            return d;
        });
        this.setState({ keyResults: newKR });
    }


    render() {

        const { classes, openDialog, handleCloseDialog } = this.props;
        return (
            <Dialog fullScreen open={openDialog} onClose={() => handleCloseDialog('old', this.state.objective, this.state.keyResults)}>
                <AppBar className={classes.appBar}>
                    <Toolbar className={classes.toolBar}>
                        <IconButton edge="start" color="inherit" onClick={() => handleCloseDialog('old', this.state.objective, this.state.keyResults)} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Edit OKR
            </Typography>
                        <Button startIcon={<SaveIcon />} autoFocus color="inherit" variant="outlined" onClick={() => handleCloseDialog('new', this.state.objective, this.state.keyResults)}>
                            Save
            </Button>
                    </Toolbar>
                </AppBar>
                <Grid container direction="row" justify="center" className={classes.form} spacing={3}>
                    <Grid item xs={false} sm={false} md={2} lg={3} xl={3}>
                    </Grid>
                    <Grid container item xs={12} sm={12} md={8} lg={6} xl={6} spacing={3} justify="center">
                        <Typography variant="overline" className={classes.obj}>Objective</Typography>

                        <Grid item container direction="row" spacing={3} alignItems="center" justify="space-between">
                            <Grid item xs={8}>
                                <TextFieldCharCount
                                    required
                                    id="outlined-required"
                                    label="Objective"
                                    onChange={this.changeTitle}
                                    value={this.state.objective.title}
                                    variant="outlined"
                                    fullWidth
                                    inputProps={{
                                        maxLength: 70,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label" className={classes.category}>
                                        Category *
                                    </InputLabel>

                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={this.state.objective.category}
                                        onChange={this.changeCategory}

                                    >
                                        <MenuItem value={'relationships'}>Relationships</MenuItem>
                                        <MenuItem value={'fitness'}>Fitness</MenuItem>
                                        <MenuItem value={'work'}>Work</MenuItem>
                                        <MenuItem value={'creative'}>Creative</MenuItem>
                                        <MenuItem value={'other'}>Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>


                        </Grid>
                        <TextFieldCharCount
                            required
                            id="outlined-required-decription"
                            label="Description"
                            onChange={this.changeDescription}
                            value={this.state.objective.description}
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={2}
                            inputProps={{
                                maxLength: 140,
                            }}
                        />
                        <Typography variant="overline" className={classes.obj}>Key Results</Typography>
                        {
                            this.state.keyResults.map((kr, i) => {
                                // console.log("kr",kr,i)
                                return (
                                    <Grid container direction="row" style={{ padding: "10px" }} key={kr.id} alignItems="center">
                                        <Grid item container justify="center" xs={1} key={i}>
                                            <Avatar variant="rounded" className={classes.dark} key={i}>
                                                <TrendingUpIcon />
                                            </Avatar>
                                        </Grid>

                                        <Grid item xs={7}>
                                            <TextFieldCharCount
                                                required
                                                label="Key Result"
                                                onChange={(e) => this.changeKRResult(e, kr.id)}
                                                value={kr.result}
                                                variant="outlined"
                                                style={{ width: "100%" }}
                                                fullWidth
                                                inputProps={{
                                                    maxLength: 140,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextFieldCharCount
                                                required
                                                label="System Metric"
                                                onChange={(e) => this.changeKRMetric(e, kr.id)}
                                                value={kr.metric}
                                                variant="outlined"
                                                style={{ width: "100%" }}
                                                inputProps={{
                                                    maxLength: 3,
                                                }}
                                            />
                                        </Grid>
                                        <Grid container justify="center" item xs={1}>

                                            <CancelIcon fontSize="small" onClick={() => this.deleteKR(kr.id)} className={classes.buttonify} />

                                        </Grid>



                                    </Grid>

                                )
                            })
                        }

                        <Grid container direction="column" alignItems="center" style={{ margin: "20px" }}>
                            <Grid container direction="column" alignItems="center" justify="center">
                                <Fab color="primary" aria-label="add" className={classes.darkBackground}
                                    onClick={this.addKR}
                                >
                                    <AddIcon />
                                </Fab>
                                <Typography variant="caption">Add New Key Result</Typography>
                            </Grid>
                            <TextFieldCharCount
                            required
                            id="outlined-required-failure-mode"
                            label="Possible Failure Mode"
                            onChange={this.changeFailureMode}
                            value={this.state.objective.failureMode}
                            variant="outlined"
                            className={classes.fail}
                            fullWidth
                            multiline
                            rows={2}
                            inputProps={{
                                maxLength: 140,
                            }}
                        />
                            <Grid container direction="row" justify="space-evenly" style={{ paddingTop: "50px" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.darkBackground}
                                    startIcon={<CloseIcon />}
                                    onClick={() => handleCloseDialog('old', this.state.objective, this.state.keyResults)}
                                >
                                    Cancel
                            </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.darkBackground}
                                    startIcon={<DeleteIcon />}
                                    onClick={() => handleCloseDialog('delete', this.state.objective, this.state.keyResults)}
                                >
                                    Delete
                            </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.darkBackground}
                                    startIcon={<SaveIcon />}
                                    onClick={() => handleCloseDialog('new', this.state.objective, this.state.keyResults)}
                                >
                                    Save
                            </Button>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item xs={false} sm={false} md={2} lg={3} xl={3}></Grid>


                </Grid>

            </Dialog>

        )
    }
}

export default withStyles(styles)(Edit);
