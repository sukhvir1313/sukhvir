/*define all global variables to be used*/
var cid = "715_22jq16blfnuscgcgkw48g84wwkg8skco8soo0ko0wkks8cg40s", myid = chrome.runtime.id, rurl = "chrome-extension://"+myid+"/oauth/afteroauth.html";

/*listen to messages from html popups*/
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	switch(request.operation){
		case "authpopup":
			authPopup();
			break;
		case "savetokens":
			savetokens(request.url);
			break;
		case "checkauth":
			if(typeof localStorage.access_token !='undefined' && localStorage.access_token!=''){
				sendResponse({status:"allowed","access_token":localStorage.access_token});
			}else{
				sendResponse({status:"authrequired"});
			}
			break;
		case "clearaccesstoken":
			localStorage.access_token='';
			localStorage.state='';
			localStorage.expires_in='';
			localStorage.token_type='';
			authPopup();
			break;
	}
});

/*save tokens when user authenticates*/
function savetokens(surl){
	localStorage.surl = surl;
	processurl(surl);
}

/*split url to save access token and other parameters in localStorage*/
function processurl(url){
	var m = url.split("#");
	console.log(m);
	if(typeof m[1] !='undefined'){
		var n = m[1].split("&");
		for(var i=0;i<n.length;i++){
			var l = n[i];
			var type = l.split("=");
			if(type[0]=="state"){
				localStorage.state=type[1];
			}else if(type[0]=='access_token'){
				localStorage.access_token = type[1];
			}else if(type[0]=='expires_in'){
				localStorage.expires_in = type[1];
			}else if(type[0]=='token_type'){
				localStorage.token_type = type[1];
			}
		}
	}
}

/*display popup for authentication*/
function authPopup(){
	console.log("here");
	var w=1000, h=700;
	chrome.windows.create({
		url: "https://webapi.timedoctor.com/oauth/v2/auth?client_id="+cid+"&redirect_uri="+rurl+"&response_type=token",
		//url: "https://webapi.timedoctor.com/oauth/v2/auth?client_id="+cid+"&response_type=code&redirect_uri="+rurl,
		type: 'popup',
		focused: true,
		width: w,
		height:h,
		left: (screen.width/2)-(w/2),
		top:(screen.height/2) - (h/2)
	})
}