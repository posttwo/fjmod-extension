posttwo.ddd("oauth.js has been loaded");

if(typeof posttwo.oauth != 'function'){
    posttwo.oauth = function(){};
 }

posttwo.oauth.login = function(){
    let OAUTHURL    =   'http://fjme.me/oauth/authorize?';
    let VALIDURL    =   'http://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';
    let SCOPE       =   'fjapi-userinfo-basic fjapi-userinfo-mod discord-post-modhelp fjmod-token';
    let CLIENTID    =   '5';
    let REDIRECT    =   'https://funnyjunk.com'
    let TYPE        =   'token';
    let _url        =   OAUTHURL + 'scope=' + SCOPE + '&client_id=' + CLIENTID + '&redirect_uri=' + REDIRECT + '&response_type=' + TYPE;
    let win         =   window.open(_url, "PosttwoAuthWindow", 'width=800, height=600'); 
    let pollTimer   =   window.setInterval(function() { 
        try {
            console.log(win.document.URL);
            if (win.document.URL.indexOf(REDIRECT) != -1) {
                window.clearInterval(pollTimer);
                let url =   win.document.URL;
                
                let result = url.split('&').reduce(function (result, item) {
                    let parts = item.split('=');
                    result[parts[0]] = parts[1];
                    return result;
                }, {});
                win.close();
                let accToken = result["https://funnyjunk.com/#access_token"];
                localStorage.setItem("PT_memeToken", accToken);
                flashMessage.showSuccess('Got a Meme Token!');
                
                $.ajax({
                    type: "GET",
                    dataType: "json",
                    url: "http://fjme.me/api/mods/notetoken",
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('PT_memeToken') },
                    success: function(data){
                        console.log(data);
                        localStorage.setItem("PT_accessToken", data.token);
                        location.reload();                        
                    },
                    error: function(data){
                        flashMessage.showError('Shits fucked');
                    }
                });
            }
        } catch(e) {
        }
    }, 100);
}