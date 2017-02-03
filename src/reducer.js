
// import {populateListAction} from './actions';


// action creator makes an API call and dispatches an action
// export function populateList(state, dirPath) {
//     console.log('populate list', state, dirPath);
//     //const newState = Object.assign({}, state);
//     return (dispatch, getState) => {
//         const files = [{
//             name: 'test 1',
//             isDir: true
//         }, {
//             name: 'test 2',
//             isDir: true
//         }];
//         setTimeout(() => {
//             dispatch(populateListAction(files));
//         //dispatch(newState);
//         }, 1000);
//     }
//}


// export function openDir(state, dirPath) {
//     console.log('try?');
//     return function(dispatch) {
//         //setTimeout(() => {
//         console.log('running?');
//         dispatch(fuckYouRedux(state));
//         //}, 2000);
//     }

// console.log(state, dirPath);

// worker.postMessage({
//     action: 'readdir',
//     payload: { path: dirPath }
// });

// return Object.assign({}, state, {
//     files: [{
//         name: 'test 1',
//         isDir: true
//     }, {
//         name: 'test 2',
//         isDir: true
//     }]
// });
//}

export default function(state = { files: [] }, action) {
    switch (action.type) {
        case 'RECEIVE_FILES':
            return Object.assign({}, state, {
                files: action.files,
            });
    }
    return state;
}
