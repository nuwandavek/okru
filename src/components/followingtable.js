import React from 'react';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Link } from '@material-ui/core';


const styles = theme => ({
    root: {
        minHeight: '200px',
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
    dark:{
        background: "#333",
        color: "#fff",
        fontWeight: 800
    }
});



class FollowingTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 10
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


    render() {
        const { classes,following, name, initText } = this.props;
        // console.log(this.state);
        return (
            <Paper elevation={0}>
                <TableContainer className={classes.root}>
                    <Table stickyHeader aria-label="simple table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.dark}>{name}</TableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(following.length === 0 ?
                                <TableRow><TableCell align="center" component="th" scope="row">
                                <Typography>{initText}</Typography>
                                </TableCell>
                                </TableRow>
                                :
                                (following.slice(this.state.page * this.state.rowsPerPage, (this.state.page + 1) * this.state.rowsPerPage).map(row => (
                                    <TableRow key={row}>
                                        
                                        <TableCell align="center" component="th" scope="row">
                                            <Link color="inherit" href={"/?user="+row}>{row}</Link>
                                        </TableCell>
                                    </TableRow>
                                ))))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5]}
                    component="div"
                    count={following.length}
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
