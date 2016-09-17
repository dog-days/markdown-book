import React from 'react'
import Component from 'r2/module/ModuleComponent'
import { connect } from 'react-redux'
import { push } from 'react-router-redux' 

class View extends Component {
	constructor(props){
		super(props); 
        this.props.dispatch(push(r2Common.prefixUrl+"/readme"));	
	}

    render() {
		super.render();
		var _this = this;
		let { targetProps } = this.props;
		return (
			<div className="about">
			</div>
		)	
    }
}

var ReduxView = connect((state)=>{
	return {
	};
})(View)
ReduxView.defaultProps = Object.assign({},Component.defaultProps,{
	title: r2fn.t("主页"),
	breadcrumb:[
		{
			label: r2fn.t("主页"),
		},
	],
});
module.exports = ReduxView; 
