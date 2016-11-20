posttwo.ddd("newCommentAlert.js has been loaded");
var PT_safeAndSound = '';
$('#ajax_mod_comm').arrive('.com', {existing: true}, function(){
    var PT_current = $('.commentNumber').text();
    if(PT_safeAndSound !== PT_current)
    {
        if(FJData.autoRefresherID != null ) //will only trigger if autorefresher is enabled
        {
            posttwo.ddd("New Comment Detected, Alerting");
            var audio = new Audio('//new4.fjcdn.com/site/images/jokes/misc/transition.mp3');
            audio.play();
            posttwo.notify.on("[!!!!] FJ NEEDS YOU");
            setTimeout(function() { posttwo.notify.off(); }, 5000);
        }
    }
    PT_safeAndSound = PT_current;
});