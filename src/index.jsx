import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router,IndexRoute,browserHistory,useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'
import { syncHistoryWithStore } from 'react-router-redux' 
import Immutable from 'immutable'
//IE10等polyfill
import polyfill from 'src/common/polyfill'
//公共方法||类载入，用window对象访问
import global from 'r2/global'
import configureStore from './store'
import rootRoute from './routes'

const initialState = Immutable.Map();
let t_history
if(window.isHashHistory){
    t_history = useRouterHistory(createHashHistory)({ queryKey: false });
}else{
    t_history = browserHistory;
}
const store = configureStore(initialState,t_history);
var history = syncHistoryWithStore(t_history, store,{
    selectLocationState (state) {
		return state.get('routing').toJS();
    } 
})

render(
	<Provider store={store}>
		<Router history={history} routes={rootRoute} />
	</Provider>,	
	document.getElementById('app_container')
)
