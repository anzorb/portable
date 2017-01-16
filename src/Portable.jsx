import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';

export default class Portable extends Component {

    constructor(props) {
        super(props);
        this.home = this.home.bind(this);
    }

    home() {
        window.location.hash = '/';
    }

    render() {
        const styles = {
            'height': '100%'
        };

        const iconStyles = {
            color: 'white',
            'display': 'flex'
        };

        return (
            <div className="flex-column" style={styles}>
                <AppBar
                    className="flex-noshrink"
                    title="File Manager"
                    iconElementLeft={<FontIcon style={iconStyles} className="material-icons home">home</FontIcon>}
                    onLeftIconButtonTouchTap={this.home}
                />
                {this.props.children}
            </div>
            )
    }

};