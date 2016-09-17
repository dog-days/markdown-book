import React from 'react'
import Component from 'common/MarkdownModuleComponent'
import { connect } from 'react-redux'
import * as actionCreator from './action'
import ReactMarkdown from 'react-markdown'
import { push } from 'react-router-redux' 
import NoPage from "src/page/nopage"

class View extends Component {
	constructor(props){
		super(props); 
	}

	componentDidMount(){
        var param = this.props.params.param;
        this.param = param;
        this.props.dispatch(actionCreator.fetchMarkdownData(param));
        this.insertDuoshuo();
	}

	componentDidUpdate(){
        super.componentDidUpdate();
        var param = this.props.params.param;
        if(param != this.param){
            this.props.dispatch(actionCreator.fetchMarkdownData(param));
            this.param = param;
        }
        var duoshuo_con = document.getElementById("duoshuo-con");
        if(this.duoshuoUpdate && duoshuo_con){
            //console.debug(duoshuo_con)
            window.DUOSHUO && window.DUOSHUO.EmbedThread(duoshuo_con);
        }
	}

    insertDuoshuo(){
        var ds = document.createElement('script');
        ds.type = 'text/javascript';ds.async = true;
        ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
        ds.charset = 'UTF-8';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ds);
    }


    render() {
		super.render();
		let { targetProps } = this.props;
        if(!targetProps.main || !targetProps.main.result){
            var Spin = this.renderSpin();
            return <div className="spin-con">{ Spin }</div> 
        }
        var md_content = targetProps.main.result; 
        var md_not_found = false;
        if(md_content.indexOf("$(404)") !=-1){
            var md_not_found = true;
        }
        this.duoshuoUpdate = true;
		return (
            <div style={ { height: "100%", } }>
                {
                    !md_not_found &&
                    <div className="markdown-contents">
                        <ReactMarkdown 
                            className="markdown-body"
                            source={ md_content }
                            renderers={ this.renderers() }
                        /> 
                        <br />
                        {
                            this.param && 
                            <div 
                                id="duoshuo-con"
                                className="ds-thread" 
                                data-thread-key={this.param} 
                                data-title={this.param} 
                                data-url={location.href} />
                        }
                    </div>
                }
                
                {
                    md_not_found &&
                    <NoPage history={ this.props.history }/>
                }
                
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
	title: r2fn.t("React入门与提高"),
	breadcrumb:[
		{
			label: r2fn.t("React入门与提高"),
		},
	],
});
module.exports = ReduxView; 
