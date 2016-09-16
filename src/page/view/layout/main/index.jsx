import React from 'react'
import Component from 'common/MarkdownModuleComponent'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as actionCreator from './action.js'
import ReactMarkdown from 'react-markdown'

require('css/github_markdown.scss')
require('css/base.scss')
require('css/main.scss')

class View extends Component {
	constructor(props){
		super(props); 
	}

	componentDidMount(){
        this.props.dispatch(actionCreator.fetchMarkdownData("sidebar"))
	}

    render() {
		super.render();
		let { targetProps } = this.props;
        if(!targetProps.main || !targetProps.main.result){
            return <span>加载中</span>
        }
        var md_content = targetProps.main.result; 
		return (
			<div className="r2-layout">
                <div className="r2-sidebar">
                    <ReactMarkdown 
                        className="md-sidebar markdown-body"
                        source={ md_content }
                        renderers={ this.renderers() }
                    /> 
                </div>
				<div className="r2-contents">
					{ this.props.children || "" }
				</div>
			</div>
		)	
    }
}
var ReduxView = connect((state)=>{
	return {
        targetProps: state.get("layout"),
	};
})(View)
ReduxView.defaultProps = Object.assign({},Component.defaultProps,{
	homeLink: {
        label:"Home",
		link:'/',
	},
});
module.exports = ReduxView; 
