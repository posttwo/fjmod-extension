posttwo.ddd("removeUselessButtons.js has been loaded");
$('#ajax_comm').arrive('.com', {existing: true}, function(){
    var el = $(this);
    var menu = el.find('.adminButtonMenu');
    menu.find('div:contains("HURRR DURRRR")').remove();
    menu.find('div:contains("RETARD MODE")').remove();
    menu.find('div:contains("ADMIN MODE")').remove();
    menu.find('div:contains("joshlol mode")').remove();
    menu.find('div:contains("Flag"):eq(1)').remove();
});