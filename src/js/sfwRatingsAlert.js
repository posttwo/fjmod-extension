posttwo.ddd("sfwRatingsAlert.js has been loaded");
//I wanted to do this myself but I almost got stabbed by a racoon for shitty code
var element = $(".flexModAlerts2[href='/sfw_mod/contents/']");
var unrated = (element ? parseInt(element.text()) : 0);

if (unrated >= 50){
    $( "<img src='http://i.heykidwannayiff.com/aef79e.gif'>" ).insertBefore( ".flexModAlerts2:first" );
    $( "<img src='http://i.heykidwannayiff.com/aef79e.gif'><br><h1 style='color:red;font-size:50px;'>!!DO SFW RATINGS!!</h1>" ).insertAfter( ".flexModAlerts2:last" );
    $(".flexModAlerts2").css({"font-size": "25px", "background-image": "-webkit-linear-gradient(top,#ff4b4b,#981414)"});
    }