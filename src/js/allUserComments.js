$( document ).ready(function() {
$('#userCommentsList .title .contentTitle').first().append('<button id="allCmntsByUser">OPEN ALL</button>');
$('#allCmntsByUser').click(function(){
magic();
})
});
function magic(){
	$('.cl_tx a').each(function(){
		var url=this.href.split("#");
		window.open(url[0] + "?nomatch", '_blank');
	})
}