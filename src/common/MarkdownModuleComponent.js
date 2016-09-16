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
            }
        })
    }

    componentDidUpdate(){
        Prism.highlightAll()
    }
}

MarkdownModuleComponent.defaultProps = Object.assign({},ModuleComponent.defaultProps,{

}) 

module.exports = MarkdownModuleComponent
