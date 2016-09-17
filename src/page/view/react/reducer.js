import * as actionCreator from './action' 

export function react(state = {}, action) {
    switch (action.type) {
    	
		case actionCreator.REQUEST: 
		case actionCreator.RECIEVE: 	
		case actionCreator.GETHEADING: 	
			return Object.assign({}, state,action);
        default:
			return state;
    }
}

