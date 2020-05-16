import React from 'react';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { withStyles } from '@material-ui/core/styles';
import {
    Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TablePagination, Link, TextField, Grid
} from '@material-ui/core';


const styles = theme => ({
    root: {
        maxHeight: '220px',
        // overflow: 'scroll'
        textAlign: 'center'
    },
    bold: {
        fontWeight: 800
    },
    tableCenter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    dark: {
        background: "#333",
        color: "#fff",
        fontWeight: 800
    },
    search:{
        color:'#fff',
        // paddingLeft: '10px',
        background: '#222',
        borderRadius : '3px',
        width: "50%"
    }
});



class FollowingTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5,
            searchValue : '',
            following: [],
            followingRaw: []
        }

        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);

    }
    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };


    handleSearch = event => {
        // console.log(event.target.value);
        this.setState({ searchValue: event.target.value });
        if(event.target.value===''){
            this.setState({following: this.state.followingRaw});
        }
        else{
            let tempFollow = this.state.followingRaw.filter(d=>d.includes(event.target.value));
            this.setState({following: tempFollow});
        }
    };

    componentWillReceiveProps({ following }) {
        // console.log(following);
        this.setState({following:following, followingRaw:following});
    }

    render() {
        const { classes, following, name, initText } = this.props;
        // console.log(this.state);
     
        
        return (
            <Paper elevation={0}>
                <TableContainer className={classes.root}>
                    <Table stickyHeader aria-label="simple table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.dark}  style={{borderRadius: "5px"}}>
                                <Grid container direction="row" justify="space-between" alignItems="center">
                                <Typography>{name}</Typography>
                                    
                                    <TextField id="standard-basic" variant="outlined" size="small" label="Search" className = {classes.search}
                                    InputLabelProps={{style:{ color: "#fff", paddingLeft:"10px"}}} 
                                    InputProps={{style:{ color: "#fff"}}}
                                    value={this.state.searchValue}
                                    onChange={this.handleSearch}
                                    />
                                
                                </Grid>
                                    
                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(this.state.following.length === 0 ?
                                <TableRow><TableCell align="center" component="th" scope="row">
                                    <Typography>{initText}</Typography>
                                </TableCell>
                                </TableRow>
                                :
                                (this.state.following.slice(this.state.page * this.state.rowsPerPage, (this.state.page + 1) * this.state.rowsPerPage).map(row => (
                                    <TableRow key={row}>

                                        <TableCell align="center" component="th" scope="row">
                                            <Link color="inherit" href={"/okrs?user=" + row}>{row}</Link>
                                        </TableCell>
                                    </TableRow>
                                ))))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5]}
                    component="div"
                    count={this.state.following.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                // labelRowsPerPage="Rows/Page"
                />
            </Paper>

        )
    }
}

export default withStyles(styles)(FollowingTable);
