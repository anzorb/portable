import React, { Component, PropTypes } from 'react';
import fs from 'fs';
import path from 'path';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import Infinite from 'react-infinite';

const worker = new Worker('worker.js');
worker.addEventListener('message', (msg) => {
    console.log(msg.data);
});
worker.postMessage('hello');

export default class Portable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previewOpen: false,
            loading: false
        };
        this.open = this.open.bind(this);
        this.handlePreviewClose = this.handlePreviewClose.bind(this);
    }

    componentDidMount() {
        const filePath = path.resolve('/Users/anbas/');
        worker.addEventListener('message', (msg) => {
            if (msg.data.action && msg.data.action === 'readdir') {
                this.setState({ files: msg.data.payload.files });
            }
            this.setState({ loading: false });
        });
        fs.stat(filePath, (err, stats) => {
            this.open({
                path: filePath,
                isDir: stats.isDirectory()
            });
        })

    }

    open(file) {
        if (file.isDir) {
            this.setState({ loading: true });
            worker.postMessage({
                action: 'readdir',
                payload: { path: file.path }
            });
        } else {
            const fullWidth = {
                'width': '100%'
            };
            if (file.mime.indexOf('image') !== -1) {
                //https://github.com/callemall/material-ui/issues/2514
                const image = new Image();
                image.onload = () => {
                    this.setState({
                        previewOpen: true,
                        dialogContent: <img style={fullWidth} src={'file:///' + file.path}/>
                    });
                };
                image.src = 'file:///' + file.path;
            } else if (file.mime.indexOf('audio') !== -1) {
                this.setState({
                    previewOpen: true,
                    dialogContent: <audio autoPlay style={fullWidth} controls preload src={'file:///' + file.path}></audio>
                });
            } else if (file.mime.indexOf('video') !== -1) {
                this.setState({
                    previewOpen: true,
                    dialogContent: <video autoPlay preload controls src={'file:///' + file.path}></video>
                });
            }
        }
    }

    renderFiles() {
        if (!this.state.files) {
            return '';
        }
        return this.state.files.map((file, id) => {
            let icon;
            const styles = {
                'height': '48px'
            };
            // if (!file.isDir && file.mime.indexOf('audio') === -1) {
            //     return '';
            // }
            if (file.isDir) {
                icon = <FontIcon className="material-icons">folder</FontIcon>
            } else {
                icon = <FontIcon className="material-icons">insert_drive_file</FontIcon>
            }
            return <ListItem
                    key={id}
                    style={styles}
                    onClick={() => this.open(file)}
                    primaryText={file.name}
                    leftIcon={icon}
                    >
                </ListItem>
        });
    }

    handlePreviewClose() {
        this.setState({
            previewOpen: false,
            previewContent: ''
        });
    }

    render() {
        const styles = {
            'height': '100%'
        };
        let content;
        if (!this.state.files || this.state.loading) {
            content = (
                <div className="flex-column flex-stretch flex-full flex-center">
                    <CircularProgress />
                </div>
            )
        } else {
            content = (
                <Infinite
                containerHeight={500}
                elementHeight={48}>
                    { this.renderFiles() }
                </Infinite>
            )
        }

        return (
            <div className="flex-column" style={styles}>
                <Dialog
                    modal={false}
                    open={this.state.previewOpen}
                    onRequestClose={this.handlePreviewClose}
                    autoScrollBodyContent={true}>
                  {this.state.dialogContent}
                </Dialog>
                <AppBar
                    className="flex-noshrink"
                    title="File Manager"
                />
                { content }
            </div>
            )
    }

};