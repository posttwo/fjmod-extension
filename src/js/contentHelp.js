posttwo.ddd("contentHelp.js has been loaded");
$('.contentContainer').css('position', 'relative');
$('.contentContainer').append('<div class="postHelp" style="box-shadow: 0px 1px 5px 6px #5f0bce;font-size: 20px;z-index: 2;background-color: red;width: 100px;cursor: help;display: block;position: absolute;right: 0px;font-weight: bolder; padding: 5px; bottom: 0px;">Mod-Help</div>');

$('.contentContainer').on('click', '.postHelp', function(event){
    event.stopPropagation();
    console.log("THANKS");
    //parent id = imageId | if no exist .cImg id used
    //parent data-cachedimgsrc = imageUrl
    let parent = $(this).parent();
    let imageId = $(parent).attr('id');

    if(imageId == undefined)
    {
        imageId = $('.cImg').attr('id');
    }
    let imageUrl = $(parent).attr('data-cachedimgsrc');
    if(imageUrl == undefined)
    {
        imageUrl = $(parent).attr('href');
    }    

    //cUrl contentId
    console.log({imageId, imageUrl, cUrl, contentId});

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "https://fjme.me/api/mods/discord/help",
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('PT_memeToken') },
        data: {
            contentId: contentId,
            contentUrl: cUrl,
            imageId: imageId,
            imageUrl: imageUrl,
        },
        success: function(data){
            flashMessage.showSuccess('Sent!');
        },
        error: function(data){
            flashMessage.showError('Already Asked, check mod chat');
        }
    });
    return false;    
})