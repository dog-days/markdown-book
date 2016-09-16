let requestPosts = r2ActionCreator.requestPosts; 
let receivePosts = r2ActionCreator.receivePosts; 
//常量
export const REQUEST = 'REQUESTMARKDOWN'
export const RECIEVE = 'RECIEVEAMARKDOWN'

//actionCreators
export function fetchData(_params={},success) {
	var url = ``;
	//url参数拼接
	url = r2fn.params(url,_params);
	return r2fetch({
		method: 'GET',
	}).dispatchFetchOne(url,requestPosts(REQUEST,'main'),receivePosts(RECIEVE,'main'),success)
}





