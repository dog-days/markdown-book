let requestPosts = r2ActionCreator.requestPosts; 
let receivePosts = r2ActionCreator.receivePosts; 

//常量
export const REQUEST = 'REQUESTREACT'
export const RECIEVE = 'RECIEVEAREACT'
export const GETHEADING = "GETHEADING"; 

export function getHeading(props) {
    return {
        type: GETHEADING, 
        heading: props, 
    }
}

export function fetchMarkdownData(name,success) {
	var url = `/markdown/${ name }.md`;
	//url参数拼接
	url = r2fn.params(url,{});
	return r2fetch({
		method: 'GET',
		responseType: 'html',
	}).dispatchFetchOne(url,requestPosts(REQUEST,'main'),receivePosts(RECIEVE,'main'),success)
}





