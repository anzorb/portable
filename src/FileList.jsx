import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import fs from 'fs';
import path from 'path';
import mime from 'mime';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';
import Infinite from 'react-infinite';
import { Router, Route, IndexRedirect, IndexRoute, Link, hashHistory } from 'react-router';
import Breadcrumbs from './Breadcrumbs.jsx';
import './FileList.scss';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { Column, Table } from 'react-virtualized';
import {connect} from 'react-redux';
import {getDir} from './actions';

export const FileList = class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previewOpen: false,
            loading: false
        };
        this.open = this.open.bind(this);
        this.handleRowClick = this.handleRowClick.bind(this);
        this.handlePreviewClose = this.handlePreviewClose.bind(this);
        this.updateHeight = this.updateHeight.bind(this);
    }

    componentDidMount() {
        this.containerEl = ReactDOM.findDOMNode(this);
        window.addEventListener('resize', this.updateHeight);
        this.updateHeight();
        //populateList('/Users/anbas/Downloads/');
        this.props.dispatch(getDir(this.props.routeParams.dirPath));
        // const filePath = path.resolve(this.props.params.dirPath);
        // worker.addEventListener('message', (msg) => {
        //     if (msg.data.action && msg.data.action === 'readdir') {
        //         this.setState({ files: msg.data.payload.files });
        //     }
        //     this.setState({ loading: false });
        // });
        // fs.stat(filePath, (err, stats) => {
        //     this.open({
        //         path: filePath,
        //         isDir: stats.isDirectory()
        //     });
        // })
    }

    updateHeight() {
        this.setState({
            containerHeight: this.containerEl.clientHeight,
            containerWidth: this.containerEl.clientWidth,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.dirPath === this.props.params.dirPath) {
            return;
        }
        this.setState({
            files: []
        });
        this.props.dispatch(getDir(nextProps.params.dirPath));
        // const filePath = path.resolve(nextProps.params.dirPath);
        // worker.addEventListener('message', (msg) => {
        //     if (msg.data.action && msg.data.action === 'readdir') {
        //         this.setState({ files: msg.data.payload.files });
        //     }
        //     this.setState({ loading: false });
        // });
        // fs.stat(filePath, (err, stats) => {
        //     if (!err) {
        //         this.open({
        //             path: filePath,
        //             isDir: stats.isDirectory(),
        //             mime: mime.lookup(filePath)
        //         });
        //     }
        // })
    }

    open(file) {
        console.log(file);
        this.setState({ loading: false });
        if (file.isDir) {
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
                        loading: false,
                        previewOpen: true,
                        dialogContent: <img style={fullWidth} src={'file:///' + file.path}/>
                    });
                };
                image.src = 'file:///' + file.path;
            } else if (file.mime.indexOf('audio') !== -1) {
                this.setState({
                    loading: false,
                    previewOpen: true,
                    dialogContent: <audio autoPlay style={fullWidth} controls preload src={'file:///' + file.path}></audio>
                });
            } else if (file.mime.indexOf('video') !== -1) {
                const video = document.createElement('video');
                video.onloadeddata = () => {
                    this.setState({
                        loading: false,
                        previewOpen: true,
                        dialogContent: <video autoPlay style={fullWidth} preload controls src={'file:///' + file.path}></video>
                    });
                };
                video.src = 'file:///' + file.path;
            }
        }
    }

    handleRowClick(path) {
        console.log('hahahah');
        this.props.router.push(path)
    }

    renderFiles() {
        console.log(this.props);
        if (!this.props.files) {
            return '';
        }
        return this.props.files.map((file, id) => {
            let icon, content;
            const styles = {
                'height': '48px'
            };
            // if (!file.isDir && file.mime.indexOf('audio') === -1) {
            //     return '';
            // }
            //const url = encodeURIComponent(file.path);
            const handleRowClick = ({rowData}) => {
                const url = encodeURIComponent(rowData.path);
                this.props.router.push(`goto/${url}`);
            };
            // content = (
            //     <Table
            //         width={this.state.containerWidth}
            //         height={this.state.containerHeight}
            //         rowHeight={50}
            //         rowCount={this.state.files.length}
            //         rowGetter={({ index }) => this.state.files[index]}
            //         onRowClick={handleRowClick}
            //       >
            //         <Column
            //             key={id}
            //             width={this.state.containerWidth}
            //             label='File Name'
            //             dataKey='name'
            //         />
            //       </Table>
            //       )

            if (file.isDir) {
                const url = encodeURIComponent(file.path);
                content = (
                    <Link to={`goto/${url}`} key={id}>
                        <div className="list-item list-item--folder">
                            <span className="list-item__icon material-icons">folder</span>
                            <div className="list-item__name">{file.name}</div>
                        </div>
                    </Link>
                )
            } else {
                content = (
                    <div
                        className="list-item list-item--folder"
                        onClick={() => this.open(file)}
                        key={id}
                        >
                        <span className="list-item__icon material-icons">insert_drive_file</span>
                        <div className="list-item__name">{file.name}</div>
                    </div>
                    )
            }
            return content;
        });
    }

    handlePreviewClose() {
        this.setState({
            previewOpen: false,
            previewContent: ''
        });
    }

    render() {
        console.log(this.props);
        const styles = {
            'height': '100%'
        };
        let content;
        if (!this.props.files || this.state.loading) {
            content = (
                <div className="flex-column flex-stretch flex-full flex-center">
                    <CircularProgress />
                </div>
            )
        } else {
            content = (
                // <Infinite
                // containerHeight={this.state.containerHeight}
                // elementHeight={48}>
                <ul className="flex-full scroll-area">
                    { this.renderFiles() }
                </ul>
                //</Infinite>
            )
            //content = this.renderFiles();
        }

        return (
            <div className="file-list flex-column flex-stretch flex-full">
                <Dialog
                    modal={false}
                    open={this.state.previewOpen}
                    onRequestClose={this.handlePreviewClose}
                    autoScrollBodyContent={true}>
                  {this.state.dialogContent}
                </Dialog>
                <Breadcrumbs url={this.props.params.dirPath}/>
                { content }
            </div>
            )
    }
};

function mapStateToProps(state) {
    return {
        files: state.files,
    };
};

export const FileListConnected = connect(mapStateToProps)(FileList);
