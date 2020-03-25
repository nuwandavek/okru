import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    TextField
} from '@material-ui/core';


const styles = theme => ({
    root: {
        position: "absolute",
        right: "5px",
        bottom: "5px",
        margin: "0px !important"
    },

});



class TextFieldCharCount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentCount : 0
        }

        this.handleUpdateText = this.handleUpdateText.bind(this);

    }

    handleUpdateText = event => {
        this.setState({ currentCount: event.target.value.length });
        this.props.onChange(event)
    }

    componentWillReceiveProps({ value }) {
        this.setState({ currentCount : value.length })
    }

    componentDidMount() {
        this.setState({ currentCount : this.props.value.length })
    }

    render() {
        const { classes} = this.props;
        // console.log(this.state);


        return (
            <TextField
                required={this.props.required}
                id={this.props.id}
                label={this.props.label}
                onChange={this.handleUpdateText}
                value={this.props.value}
                variant={this.props.variant}
                fullWidth={this.props.fullWidth}
                inputProps={this.props.inputProps}
                multiline={this.props.multiline}
                rows={this.props.rows}
                className={this.props.className}
                helperText={this.state.currentCount+'/'+this.props.inputProps.maxLength}
                FormHelperTextProps = {(this.state.currentCount/this.props.inputProps.maxLength)<0.8?
                    {className:classes.root}
                    :
                    {className:classes.root, error:true}
                }                            
            />
        )
    }
}

export default withStyles(styles)(TextFieldCharCount);
