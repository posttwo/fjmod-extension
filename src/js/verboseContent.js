posttwo.ddd("verboseContent.js has been loaded");
//if page contains .adminButtonMenu 
if( $('.adminButtonMenu').length ){
    posttwo.ddd("Content Page");
    $('.adminButtonMenu').append(`<div onclick="posttwo.contentQuery(contentId)" id="mNIX">Query</div>`);
}
else{
    posttwo.ddd("Not Content");
}