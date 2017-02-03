const worker = new Worker('worker.js');

worker.postMessage('hello');

const RECEIVE_FILES = 'RECEIVE_FILES'

// action
export function receiveFiles(files) {
    console.debug('populateListAction', files);
    return {
        type: RECEIVE_FILES,
        files
    };
}

export const getDir = dirPath => (dispatch, getState) => {
    const files = [{
        name: 'test 1',
        isDir: true
    }, {
        name: 'test 2',
        isDir: true
    }];
    const react = (msg) => {
        if (msg.data.action === 'readdir') {
            worker.removeEventListener('message', react);
            dispatch(receiveFiles(msg.data.payload.files));
        }
    };
    worker.addEventListener('message', react);
    worker.postMessage({
        action: 'readdir',
        payload: {
            path: dirPath
        }
    });
}
