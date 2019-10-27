import { combineReducers } from 'redux';

export const POST_PICTURE = 'POST_PICTURE';
export const POST_PICTURE_SUCCESS = 'POST_PICTURE_SUCCESS';
export const POST_PICTURE_FAILED = 'POST_PICTURE_FAILED';



simpleReducer = (state = {}, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export const defaultState = {
    isPostingPicture: false,
    postPictureFailed: false,
    rekognizedPicture: {},
}

export default rootReducer = (state = {}, action) => {
    switch(action.type) {
        case POST_PICTURE:
            return {
                ...state,
                isPostingPicture: true,
                postPictureFailed: false
            };
        case POST_PICTURE_SUCCESS:
            return {
                ...state,
                isPostingPicture: false,
                rekognizedPicture: {...action.payload}
            };
        case POST_PICTURE_FAILED:
            return {
                ...state,
                isPostingPicture: false,
                postPictureFailed: true
            }
        default:
            return state;
    }
}

export function postPicture(picture) {
    return  (dispatch, getState) => {
        console.log('posting')
        console.log(picture)
        dispatch({type: POST_PICTURE})
        const res =  fetch('https://reaeqznkw4.execute-api.us-east-2.amazonaws.com/dev/s3-input-to-rekognition', {
            method: 'POST',
            body: picture     
        })
        // const resJson =  res.json();
        dispatch({type: POST_PICTURE_SUCCESS, payload: res});
        console.log(resJson);
        return resJson;
}}