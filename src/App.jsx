import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './Portable.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './Layouts.scss';
import { Router, Route, IndexRedirect, IndexRoute, Link, hashHistory } from 'react-router';
import {FileListConnected} from './FileList.jsx';
// redux stuff
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk'
import {Provider} from 'react-redux';
import reducer from './reducer';

const store = createStore(reducer, applyMiddleware(ReduxThunk));
//const store = applyMiddleware(ReduxThunk)(createStore)(reducer);
// setTimeout(() => {

store.dispatch({
    type: 'POPULATE_LIST',
    dirPath: '/anbas/Downloads'
});

//     //     state: {
//     //         dirPath: '/anbas/Downloads/',
//     //         files: [
//     //             {
//     //                 name: 'test 1',
//     //                 isDir: true
//     //             },
//     //             {
//     //                 name: 'test 2',
//     //                 isDir: true
//     //             }
//     //         ]
//     //     }
//     // });

// }, 2000);

// store.dispatch({
//     type: 'SET_STATE',
//     state: {
//         dirPath: '/',
//         files: []
//     }
// });

injectTapEventPlugin();

var gui = require('nw.gui');
if (process.platform === "darwin") {
  var mb = new gui.Menu({type: 'menubar'});
  mb.createMacBuiltin('RoboPaint', {
    hideEdit: false,
  });
  gui.Window.get().menu = mb;
}



//const url = encodeURIComponent('/Users/anbas/Downloads/');
const url = encodeURIComponent('/');

ReactDOM.render((
  <Provider store={store}>
    <MuiThemeProvider>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <Route path="goto/:dirPath" component={FileListConnected} />
                <IndexRedirect to={`goto/${url}`} />
            </Route>
        </Router>
    </MuiThemeProvider>
  </Provider>),
  document.getElementById('app')
);
