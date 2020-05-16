import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Paper, Typography, Link, TextField, Grid, Breadcrumbs
} from '@material-ui/core';

import { Sector, PieChart, Pie, Label } from 'recharts';

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

    },
    main:{
        fontSize:'60px',
        fontWeight:'500',
        fill: '#333'
    },
    sub:{
        fontSize:'10px',
        transform: 'translate(0px,30px)',
        fill: '#333'
    },
    sub3:{
        fontSize:'10px',
        transform: 'translate(0px,-30px)',
        fill: '#333'
    },
    sub2:{
        fontSize:'10px',
        fill: '#333'
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
        const { classes, time, status } = this.props;

        const angle = (time/25) * 360 + 180;

        // const circle = (
        //     time>0 ? 
        //     <Paper elevation={0} className={classes.pomInProgress}>

        //     </Paper>
        //     :
        //     <Paper  elevation={0} className={classes.pomNotInProgress}></Paper>
        // )

        

        const circle = (
            time>0 ? 
            <PieChart width={200} height={160}>
                
                <Pie  
                cx={100} cy={80} outerRadius={70} innerRadius={60} 
                startAngle={180} endAngle={angle} fill="#c0392b" cornerRadius={5}
                dataKey="value" data={[{ name: 'time', value: time}]}>
                {status=='inprogress'?(
                    <Label value="In Progress" position="center" className={classes.sub3}/>
                ):(
                    <Label value="Paused" position="center" className={classes.sub3}/>
                )}
                <Label value={time} position="center" className={classes.main}/>
                <Label value="Mins Remaining" position="center" className={classes.sub}/>
                </Pie>
            </PieChart>
            
            
            :
            
            <PieChart width={200} height={160}>
                <Pie  
                cx={100} cy={80} outerRadius={70} innerRadius={60} 
                startAngle={0} endAngle={400} fill="#eee" cornerRadius={5}
                dataKey="value" data={[{ name: 'time', value: 10}]}
                >
                <Label value="Not Pomming" position="center" className={classes.sub2}/>
                </Pie>
                
            </PieChart>
        )


     
        
        return (
            <Paper elevation={0}>
                {circle}
            </Paper>
        )
    }
}

export default withStyles(styles)(PomCircle);
