function save_options() {
  var isSideBarUpdate = document.getElementById('sidebarupdate').checked;
  var isSideBarReplace = document.getElementById('sidebarreplace').checked;
  var isShowSpoiler = document.getElementById('showspoilers').checked;
  var isShowComplaints = document.getElementById('showcomplaints').checked;
  var isHeaderComplaints = document.getElementById('headercomplaints').checked;
  var isUserNotes = document.getElementById('usernotes').checked;
  var accessToken = document.getElementById('accesstoken').value;
  var iswelcomeMessage = document.getElementById('welcomeMessage').value;
  var ishighlightgayponies = document.getElementById('highlightgayponies').checked;
  var isuploadtimehelper = document.getElementById('uploadtimehelper').checked;
  var isdragimgurvideo = document.getElementById('dragimgurvideo').checked;
  var isshowreban = document.getElementById('showreban').checked;
  var isshowcommentipbutton = document.getElementById('showcommentipbutton').checked;
  var isshowcommentbanbutton = document.getElementById('showcommentbanbutton').checked;
  var isshowanoniphash = document.getElementById('showanoniphash').checked;
  var ishovereffect = document.getElementById('hovereffect').checked;
  var isshownewuseripbutotn = document.getElementById('shownewuseripbutotn').checked;
  var isautocomplete = document.getElementById('autocomplete').checked;
  var isshowimagespoiler = document.getElementById('showimagespoiler').checked;


  chrome.storage.sync.set({
    sidebarupdate: isSideBarUpdate,
	sidebarreplace: isSideBarReplace,
	showspoilers: isShowSpoiler,
	showcomplaints: isShowComplaints,
	headercomplaints: isHeaderComplaints,
	highlightgayponies: ishighlightgayponies,
	usernotes: isUserNotes,
	accesstoken: accessToken,
	uploadtimehelper: isuploadtimehelper,
	dragimgurvideo: isdragimgurvideo,
	showcommentipbutton: isshowcommentipbutton,
	showcommentbanbutton: isshowcommentbanbutton,
	showreban: isshowreban,
	showanoniphash: isshowanoniphash,
	hovereffect: ishovereffect,
	shownewuseripbutotn: isshownewuseripbutotn,
	autocomplete: isautocomplete,
	welcomemessage: iswelcomeMessage,
	showimagespoiler: isshowimagespoiler
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    sidebarupdate: false,
	sidebarreplace: false,
	showspoilers: false,
	showcomplaints: false,
	headercomplaints: false,
  usernotes: false,
  highlightgayponies: false,
  uploadtimehelper: false,
  dragimgurvideo: false,
  showreban: false,
  showcommentipbutton: false,
  showcommentbanbutton: false,
  showanoniphash: false,
  hovereffect: false,
  shownewuseripbutotn: false,
  autocomplete: false,
  accesstoken: "",
  welcomemessage: "",
  showimagespoiler: false
  }, function(items) {
    document.getElementById('sidebarupdate').checked = items.sidebarupdate;
	document.getElementById('sidebarreplace').checked = items.sidebarreplace;
	document.getElementById('showspoilers').checked = items.showspoilers;
	document.getElementById('showcomplaints').checked = items.showcomplaints;
	document.getElementById('headercomplaints').checked = items.headercomplaints;
	document.getElementById('usernotes').checked = items.usernotes;
	document.getElementById('accesstoken').value = items.accesstoken;
	document.getElementById('welcomeMessage').value = items.welcomemessage;
	document.getElementById('highlightgayponies').checked = items.highlightgayponies;
	document.getElementById('uploadtimehelper').checked = items.uploadtimehelper;
	document.getElementById('dragimgurvideo').checked = items.dragimgurvideo;
	document.getElementById('showreban').checked = items.showreban;
	document.getElementById('showcommentipbutton').checked = items.showcommentipbutton;
	document.getElementById('showcommentbanbutton').checked = items.showcommentbanbutton;
	document.getElementById('showanoniphash').checked = items.showanoniphash;
	document.getElementById('hovereffect').checked = items.hovereffect;
	document.getElementById('shownewuseripbutotn').checked = items.shownewuseripbutotn;
	document.getElementById('autocomplete').checked = items.autocomplete;
	document.getElementById('showimagespoiler').checked = items.showimagespoiler;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

var manifest = chrome.runtime.getManifest();
$('#dicks').text(manifest.version);

$('#updateModList').click(function(){
		$.getJSON('https://fjmod.posttwo.pt/allmods', function(data){
		console.log(data)
		chrome.storage.sync.set({'modList': data}, function() {});
	})
});

chrome.storage.local.get("registrationId", function(result) {
	$('#messageToken').text(result.registrationId);
 });