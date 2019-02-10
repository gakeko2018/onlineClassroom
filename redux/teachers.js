import * as ActionTypes from './ActionTypes';

export const onlineClasses = (state  = { isLoading: true,
                                    errMess: null,
                                    onlineClasses:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_onlineClassS:
        return {...state, isLoading: false, errMess: null, onlineClasses: action.payload};

        case ActionTypes.onlineClassS_LOADING:
            return {...state, isLoading: true, errMess: null, onlineClasses: []}

        case ActionTypes.onlineClassS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
    }
};