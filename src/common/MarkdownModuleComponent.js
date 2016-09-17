import React from 'react'
import ModuleComponent from 'r2/module/ModuleComponent'
import { Link }from 'react-router'
import Prism from "libs/prism"
import ReactMarkdown from 'react-markdown'

require("libs/prism/prism.css")
/**
 *	Markdown页面模块都应该继承这个类，该类继承越本框架最基层的BasicComponent。该封装了框架模块常用方法
 */
class MarkdownModuleComponent extends ModuleComponent {
	constructor(props){
		super(props); 
	}

    renderers(){
        return Object.assign({}, ReactMarkdown.renderers, {
            Heading: (props,d)=>{
                var text = props.children[0]; 
                var anchor = (
                    <a 
                        className="anchor" 
                        href={"#"+text} 
                        aria-hidden="true"
                    >
                        <svg 
                            aria-hidden="true" 
                            className="octicon octicon-link" 
                            height="16" 
                            version="1.1" 
                            viewBox="0 0 16 16" 
                            width="16"
                        >
                            <path 
                                d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55
                                3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 
                                2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 
                                5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 
                                9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98
                                12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64
                                1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31
                                7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
                            >
                            </path>
                        </svg>
                    </a>
                )
                switch(props.level){
                    case 1:
                        return (
                            <h1 id={ text }>
                                {text}
                                { anchor }
                            </h1>
                        ) 
                    case 2:
                        return (
                            <h2 id={ text }>
                                {text}
                                { anchor }
                            </h2>
                        ) 
                    case 3:
                        return (
                            <h3 id={ text }>
                                {text}
                                { anchor }
                            </h3>
                        ) 
                    case 4:
                        return (
                            <h4 id={ text }>
                                {text}
                                { anchor }
                            </h4>
                        ) 
                    case 5:
                        return (
                            <h5 id={ text }>
                                {text}
                                { anchor }
                            </h5>
                        ) 
                    case 6:
                        return (
                            <h6 id={ text }>
                                {text}
                                { anchor }
                            </h6>
                        ) 
                    default:
                        return (
                            <h6 id={ text }>
                                {text}
                                { anchor }
                            </h6>
                        ) 
                }
            },
            Link: (props)=>{
                var target = r2fn.getQuerySpecialString(props.href,"target");
                var react = r2fn.getQuerySpecialString(props.href,"react") == "true";
                if(react){
                    return (
                        <Link to={props.href}>
                            { props.children[0] }
                        </Link>
                    )
                }else{
                    return (
                        <a href={ props.href } target={ target } title={ props.children[0] }>
                            { props.children[0] }
                        </a>
                    ) 
                }
            },
        })
    }

    componentDidUpdate(){
        Prism.highlightAll()
    }

    renderSpin(){
        return (
            <div className="ant-spin ant-spin-lg ant-spin-spinning">
                <span className="ant-spin-dot" />
                <div className="ant-spin-text">加载中...  </div>
            </div>
        )
    }
}

MarkdownModuleComponent.defaultProps = Object.assign({},ModuleComponent.defaultProps,{

}) 

module.exports = MarkdownModuleComponent
