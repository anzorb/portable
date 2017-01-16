import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './Portable.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './Layouts.scss';
import { Router, Route, IndexRedirect, IndexRoute, Link, hashHistory } from 'react-router';
import FileList from './FileList.jsx';

injectTapEventPlugin();

var gui = require('nw.gui');
if (process.platform === "darwin") {
  var mb = new gui.Menu({type: 'menubar'});
  mb.createMacBuiltin('RoboPaint', {
    hideEdit: false,
  });
  gui.Window.get().menu = mb;
}



const url = encodeURIComponent('/Users/anbas/Downloads/');

ReactDOM.render((
    <MuiThemeProvider>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <Route path="goto/:dirPath" component={FileList} />
                <IndexRedirect to={`goto/${url}`} />
            </Route>
        </Router>
    </MuiThemeProvider>),
  document.getElementById('app')
);
