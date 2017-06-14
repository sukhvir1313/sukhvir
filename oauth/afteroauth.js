/*wait for document load*/
document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('afteroauth');
    var surl=window.location.href;
    savetokens(surl);
    setTimeout(function(){ window.close(); }, 3000);
});

/*once page is loaded send message to background.js to save tokens received in url*/
function savetokens(surl){
  chrome.runtime.sendMessage(chrome.runtime.id,{operation:"savetokens",url:surl},function(response){

  });
}