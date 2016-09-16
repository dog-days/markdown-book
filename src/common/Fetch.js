import override from 'core-decorators/lib/override';
import deprecate from 'core-decorators/lib/deprecate';
import fetch from 'isomorphic-fetch'
import { push } from 'react-router-redux'
import * as Antd from 'antd'
import BasicFetch from 'r2/fetch/BasicFetch'
/**
 * 针对当前项目fetch封装 
 */
class Fetch extends BasicFetch {
	
	@override	
	dispatchFetchOne(url,request,receive,successCallback200,callbackOtherStatus,errorCallback){
		let msg = { };
		if(!successCallback200){
			successCallback200 = (json,dispatch)=>{
				if(this.option.successMessage){
					msg = {
						title: '提示',
						content: json.message,
					}
					Antd.message.success(json.message)
					//Antd.Modal.success(msg);
				}
			}
		}
		var callbackOtherStatusNot401 = (json,dispatch)=>{
			msg = {
				title: '提示',
				content: json.message,
			}
			if(json.status == 401){
				//Antd.Modal.info(msg);
				Antd.message.warn(json.message)
				setTimeout(function(){
					dispatch(push(`${r2Common.prefixUrl}/login`))	
				},1000)
			}else{
				if(!callbackOtherStatus){
					Antd.message.error(json.message)
					//alert(0)
				}else{
					callbackOtherStatus(json,dispatch);
				}
			}
		}
		if(!errorCallback){
			errorCallback = (e)=>{
				msg = {
					title: '提示',
					content: "请求出错或网络连接有问题或发生未知错误！请重新尝试，或联系管理人员！",
				}
				Antd.message.error(msg.content)
				//Antd.Modal.error(msg);
			}
		}
		return super.dispatchFetchOne(url,request,receive,successCallback200,callbackOtherStatusNot401,errorCallback);
	}
}

module.exports = Fetch; 
