import React from 'react'
import Component from 'common/MarkdownModuleComponent'
import { connect } from 'react-redux'
import * as actionCreator from './action'
import ReactMarkdown from 'react-markdown'

class View extends Component {
	constructor(props){
		super(props); 
	}

	componentDidMount(){
        var param = this.props.params.param;
        this.param = param;
        this.props.dispatch(actionCreator.fetchMarkdownData(param));
	}

	componentDidUpdate(){
        super.componentDidUpdate();
        var param = this.props.params.param;
        if(param != this.param){
            this.props.dispatch(actionCreator.fetchMarkdownData(param));
            this.param = param;
        }
	}


    render() {
		super.render();
		let { targetProps } = this.props;
        if(!targetProps.main || !targetProps.main.result){
            return <span>加载中</span>
        }
        var md_content = targetProps.main.result; 
		return (
            <div>
                <ReactMarkdown 
                    className="markdown-body"
                    source={ md_content }
                    renderers={ this.renderers() }
                /> 
            </div>
		)	
    }
}

var ReduxView = connect((state)=>{
	return {
	    targetProps : state.get("react"),
	};
})(View)
ReduxView.defaultProps = Object.assign({},Component.defaultProps,{
	title: r2fn.t("关于"),
	breadcrumb:[
		{
			label: r2fn.t("关于"),
		},
	],
});
module.exports = ReduxView; 
