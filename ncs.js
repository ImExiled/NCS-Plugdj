/***************************************************************************************************/
/*                                                                                                 */
/*  This code is Copyright (C) of CSxKING.me 2015-2017 and licenced under MIT                      */
/*  Do not use this code without leaving the below credit included.                                */
/*                                                                                                 */
/***************************************************************************************************/

/*
    This extension was made by CSxKING and his friends. Find CSxKING at the links below:
    https://twitter.com/CSxKING
    https://twitch.tv/CSxKING
*/

// NOTE: Some things we're removed to keep the code secure and such as it was not mine.

/*
    A few of notes:
    Deleted Chat and better loading notifications and such we're implemented, but due to the code that was written being not by me, and by a friend, I asked
    what he would have me do with it. He requested that I remove the code if I plan to open source NCS, which I am doing (as you can tell by this build).
    That code as such has been removed. Deleted chat and these new custom notifications will not function, and in fact, some of the code will not even exist.
    It will be entirely up to you to fix or re-add these things, as I cannot and will not do it for you. NCS is being open-sourced again as I cannot continue
    to develop it any further. As such, NCS will become an extension for RCS and be completely rewritten, for use with RCS. The new version will not operate
    without RCS. This version is the last version of the stand-alone implementation of NCS.
*/

var svo = document.getElementsByClassName('.s-vo');

window.onbeforeunload = function(){
   if (NCSFunct && NCSFunct.save) {
       NCSFunct.save();
   }
};

// Welcome stuffs
    var NCSload = true;
    var changeLogLink="https://ncsblog.csxking.me/?p=33";
    var version = "0.1.0.0";
    var versionMsg = "The end.";
    var ncApiKey = "6R9fc29cMLw615PBv98u072430tZ3E9c";
    var startUpMsg = "Welcome to NCS version " + version + " | " + versionMsg;
    var newFeaturesMsg = "<br><a href='" + changeLogLink + "' target='_blank'>Click here for the Changelog</a>";
    var alertMsg = "This is the final release of NCS. Thanks for using it while it was around, you're all truly awesome.";
    var cSource = "NCS is closing its source code due to someone mass copying our code, and the new donation system in the works. We don't appreciate code stealers, and are tired of dealing with it. Please update your links and bookmarklets by revisiting <a href='https://ncscript.gq' target='_blank'>ncscript.gq</a> and reinstalling NCS. You can find more information <a href='https://ncscript.gq/v2/source_closing.html' target='_blank'>here.</a>";

// NCS Settings
var ncsSettings = $.extend({
    autoLike: false,
    eta: false,
    cBackground: false,
    backgroundUrl: '',
    autoJoin: false,
    ncsThemeEnabled: false,
    customThemeEnabled: false,
    desktopNotifications: false,
    moderatorSongDurationAlert: true,
    djAlert: true,
    dlBtn: false,
    loaded: false,
    preventNavigation: false,
    chatImages: true,
    frndNotifDisabled: false,
    modSettings: {
        showDeletedChat: false
    }
}, (JSON.parse(localStorage.getItem('ncs-settings')) || {}));

// Any setting manually set to false here has some sort of working or kinda working setting saving that needs to be fixed or completed.
ncsSettings.autoLike = false;
ncsSettings.eta = false;
ncsSettings.ncsThemeEnabled = false;
ncsSettings.customThemeEnabled = true;
ncsSettings.autoJoin = false;
ncsSettings.dlBtn = false;
ncsSettings.preventNavigation = false;
// End manual settings

var ccSettings = {exists:false};

var NCSFunct = {
    init: function () {
        // Removed private code. Rewrite this yourself for functionality.
    },
    
    save: function () {
      localStorage.setItem('ncs-settings', JSON.stringify(ncsSettings));  
    },
    
    fixvideo: function () {
        if ($('#room').hasClass("video-only")) {
            // If in video-only mode
            $('#vote').addClass('voteVO');
            $('#woot').addClass('wootVO');
            $('#grab').addClass('grabVO');
            $('#meh').addClass('mehVO');
        } else {
            // If not in video only mode
            $('#vote').removeClass('voteVO');
            $('#woot').removeClass('wootVO');
            $('#grab').removeClass('grabVO');
            $('#meh').removeClass('mehVO');
        }
    },
    
    AutoLike: function () {
        if (ncsSettings.autoLike === false) {
            $('#ncs-woot-toggle').children('.ncs-menu-icon').show();
            console.info('[NCS] Autolike Enabled.');
            $('#auto-woot').addClass('active');
            $('#woot').click();
            API.on(API.ADVANCE, callback);
            function callback(obj) {
                $('#woot').click();
                console.info('[NCS] Wooted track');
            }
            ncsSettings.autoLike = true;
        } else {
            $('#ncs-woot-toggle').children('.ncs-menu-icon').hide();
            console.info('[NCS] Autolike Disabled.');
            ncsSettings.autoLike = false;
        }
    },
    
    toggleDlBtn: function () {
        if( ncsSettings.dlBtn === true ) {
            setTimeout(function() {
                $('#NCSDlBtn').remove();
                $('.ncs-dl-toggle').children('.ncs-menu-icon').hide();
                ncsSettings.dlBtn = false;
            }, 100);
        } else {
            setTimeout(function() {
                $('#vote').append('<div id="NCSDlBtn" class="crowd-response" onclick="NCSFunct.downloadMp3();"><div class="top">Download</div><div class="bottom">MP3</div></div>');
                $('.ncs-dl-toggle').children('.ncs-menu-icon').show();
                ncsSettings.dlBtn = true;
            }, 100);
        }
    },
    
    downloadMp3: function () {
        var uri = "https://youtube.com/watch?v=" + API.getMedia().cid;
        window.open('https://www.youtubeinmp3.com/fetch/?video=' + uri);
    },
    
    toggleFrndNotif: function () {
            if( ncsSettings.frndNotifDisabled === false ) {
                $('.ncs-frndnotif-btn').children('.ncs-menu-icon').show();
                $('.request-count').addClass('NCSHideRequestCount');
                ncsSettings.frndNotifDisabled = true;
            } else {
                if( ncsSettings.frndNotifDisabled === true ) {
                $('.ncs-frndnotif-btn').children('.ncs-menu-icon').hide();
                $('.request-count').removeClass('NCSHideRequestCount');
                ncsSettings.frndNotifDisabled = false;
            }
        }
    },
    
    toggleEta: function () {
        if (ncsSettings.eta === true) {
            $('.ncs-eta-toggle').children('.ncs-menu-icon').hide();
            ncsSettings.eta = false;
            console.info('[NCS] Disabled ETA.');
        } else {
            $('.ncs-eta-toggle').children('.ncs-menu-icon').show();
            ncsSettings.eta = true;
            console.info('[NCS] Enabled ETA.');
        }
    },
    
    toggleDeletedChat: function() {
        ncsSettings.modSettings.showDeletedChat = !ncsSettings.modSettings.showDeletedChat;
        if (ncsSettings.modSettings.showDeletedChat === true) {
            $('.ncs-del-chat-toggle').children('.ncs-menu-icon').hide();
            console.info('[NCS] Disabled Deleted Chat.');
        } else {
            $('.ncs-del-chat-toggle').children('.ncs-menu-icon').show();
            console.info('[NCS] Enabled Deleted Chat.');
        }
    },
    
    toggleAutoJoinV2: function () {
        if( ncsSettings.autoJoin === false ) {
            API.on(API.ADVANCE, NCSFunct.AutoJoinV2);
            ncsSettings.autoJoin = true;
            $('.ncs-join-toggle').children('.ncs-menu-icon').show();
            console.log('[NCS] AutoJoinV2 Enabled!');
        } else if( ncsSettings.autoJoin === true ) {
            ncsSettings.autoJoin = false;
            $('.ncs-join-toggle').children('.ncs-menu-icon').hide();
            console.log('[NCS] AutoJoinV2 Disabled!');
        }
    },
    
    AutoJoinV2: function () {
        if( ncsSettings.autoJoin === true ) {
            if( API.getDJ().id === API.getUser().id ) {
            console.log('[NCS] User is DJ, waiting till next cycle.');
        } else if(API.getWaitListPosition() !== -1){
            console.log("[NCS] User already in waitlist.");
        } else {
            console.log('[NCS] User is not DJ and is not in WaitList, ');
            API.djJoin();
        }
        }
    },
    
    backgroundSelect: function () {
        if (ncsSettings.cBackground === false) {
            console.info('[NCS] Custom Background Enabled.');
            var bgfile = prompt('Enter the link to a background. A resolution of 1600x900 is recomended.', 'https://i.imgur.com/EFXFnql.png');
            ncsSettings.backgroundUrl = bgfile;
            $('.room-background').css("background-image", " url('" + ncsSettings.backgroundUrl + "')");
            $('.ncs-bg-toggle').children('.ncs-menu-icon').show();
            ncsSettings.cBackground = true;
        } else {
            console.info('[NCS] Custom Background Disabled.');
            $('.ncs-bg-toggle').children('.ncs-menu-icon').hide();
            ncsSettings.cBackground = false;
            $('.room-background').css("background-image", "url('https://cdn.plug.dj/_/static/images/community/background.ea778295-651f-4bb8-bc2f-9fa7e6a81876.jpg')");
        }
    },
    
    ccsTheme: function () {
        if (ncsSettings.customThemeEnabled === false) {
            $('.ccs-theme-toggle').children('.ncs-menu-icon').show();
            NCSFunct.initCcsTheme();
            ncsSettings.customThemeEnabled = true;
        } else {
            $('.ccs-theme-toggle').children('.ncs-menu-icon').hide();
            $('#CCSTheme').remove();
            ncsSettings.customThemeEnabled = false;
        }
    },
    
    initCcsTheme: function () {
        setTimeout(function () {
            if (ccSettings.css) {
                $('head').append(`<link id="CCSTheme" rel="stylesheet" href="${ccSettings.css}" type="text/css" />`);
            }
        }, 500);
    },
    
    ncsTheme: function () {
        if (ncsSettings.ncsThemeEnabled === false) {
            $('.ncs-theme-toggle').children('.ncs-menu-icon').show();
            setTimeout(function () {
                $('head').append('<link id="NCSTheme" rel="stylesheet" href="https://rawgit.com/bentenz5/NCS-Plugdj/master/NCSTheme.css" type="text/css" />');
                $('.room-background').css('background-image', 'url(\'https://i.imgur.com/N82wzhY.png\')')
            }, 500);
            ncsSettings.ncsThemeEnabled = true;
        } else {
            $('.ncs-theme-toggle').children('.ncs-menu-icon').hide();
            $('#NCSTheme').remove();
            ncsSettings.ncsThemeEnabled = false;
        }
    },
    
    readable: function (total) {
        var hours = ~~(total / 3600);
        var minutes = (~~(total / 60)) % 60;
        var seconds = total % 60;
        return NCSFunct.normalize(hours) + ':' + NCSFunct.normalize(minutes) + ':' + NCSFunct.normalize(seconds);
    },
    
    normalize: function (number) {
        var addition = (number < 10
        ? '0'
        : '');
        return addition + number;
    },
    
    setVol: function () {
        var i = prompt("Enter a number between 0 and 100");
        API.setVolume(i);
    },
    
    toggleNavigation: function () {
        ncsSettings.preventNavigation = !ncsSettings.preventNavigation;
        if (ncsSettings.preventNavigation) {
            $('.ncs-accnav-toggle').children('.ncs-menu-icon').show();
            window.onbeforeunload = function () {
                return 'You sure? You told us to ask this.';
            };
        } else {
            window.onbeforeunload = function () {
            };
            $('.ncs-accnav-toggle').children('.ncs-menu-icon').hide();
        }
    },
    
    defaultStyles: function () {
        $('head').append('<link href="https://rawgit.com/bentenz5/NCS-Plugdj/master/ncs.css" rel="stylesheet" type="text/css">');
        $('head').append('<link href="https://rawgit.com/bentenz5/NCS-Plugdj/master/menu.css" rel="stylesheet" type="text/css">');
    },
    
    nc331Theme: function () {
        // https://cdn.bssecure.net/nc-themes/plug-themes/nc331-theme.css
    },
    
    updateCheck: function () {
        $.ajax({
            type: "GET",
            url: "https://rawgit.com/bentenz5/NCS-Plugdj/master/latest.json"
        }).done(function (data) {
            if (data.version != version) {
                // notifLong("NCS has been updated! Refresh your page to get the latest update! | Current Version: " + version + " | New Version: " + data.version + " | <a href='" + data.changelog + "' target='_blank'>Changelog</a>");
                $('#chat-messages').append('<center style=color:#A77DC2 class="cm ncs-broadcast"><div class="mdi mdi-alert msg"></div> NCS has updated! Refresh your page to get the latest update!<br> <a href="' + data.changelog + '" target="_blank">Changelog</a> | New version: ' + data.version + '</center>');
                console.log("[NCS] Update available");
            } else {
                console.log("[NCS] Up to date!");
            }
        });
    },
    
    startupMsgs: function () {
        $('#chat-messages').append('<center style=color:#A77DC2 class="cm ncs-greet">' +
        [startUpMsg, newFeaturesMsg, alertMsg].join('<br>') + '</center>');
        //$('#chat-messages').append('<center style="color:#A77DC2" class="ncs-err">' + cSource + '</center>');
    },
    
    redir: function (uri) {
        window.open(uri);
    },
    
    checkUsers: function () {
        // This checks how many users on plug are using NCS and puts it in the menu.
        // Removed old websocket code. Rewrite for functionality.
    }
}

    var NCS = (function () {
    var models = {
        'tab': `<div id="ncs-menu-button" class="header-panel-button ncs-tab">
                    <span class="icon-info ncs-menu-button-info">NCS</span>
                </div>`,
        menu: function() {
            return '<div id="ncs-menu" style="display:none"><div class="ncs-menu-header list-header"><span class="title">NCS Settings</span></div><div class="list staff jspScrollable" style="top:40px!important;overflow:hidden;padding:0px;outline:none;width:345px;height:'+($(document).height()-148)+'px" tabindex="0"><div class="jspContainer" style="overflow:scroll;width:340px;top:5px;height:'+($(document).height()-153)+'px"><div class="jspPane" style="padding:0px;top:0px;left:0px;width:331px;"><div class="group"><div id="ncs-woot-toggle" class="user ncs-menu-item item" onclick="NCSFunct.AutoLike();"><i class="icon icon-check-blue ncs-menu-icon"></i><span class="name ncs-menu-span">Auto-Woot</span></div><div class="user ccs-theme-toggle ncs-menu-item item" onclick="NCSFunct.ccsTheme();"><i class="icon icon-check-blue ncs-menu-icon"></i><span class="name ncs-menu-span">Custom Theme</span></div><div class="user ncs-theme-toggle ncs-menu-item item" onclick="NCSFunct.ncsTheme();"><i class="icon icon-check-blue ncs-menu-icon"></i><span class="name ncs-menu-span">NCS Custom Theme</span></div><div class="user ncs-join-toggle ncs-menu-item" onclick="NCSFunct.toggleAutoJoinV2();"><i class="icon icon-check-blue ncs-menu-icon"></i><span class="name ncs-menu-span">Auto-Join</span></div><div class="user ncs-eta-toggle ncs-menu-item" onclick="NCSFunct.toggleEta()"><i class="icon icon-check-blue ncs-menu-icon"></i><span class="name ncs-menu-span">ETA</span></div><div class="user ncs-dl-toggle ncs-menu-item" onclick="NCSFunct.toggleDlBtn()"><i class="icon icon-check-blue ncs-menu-icon"></i><span class="name ncs-menu-span">Toggle Download Button</span></div><div class="user ncs-bg-toggle ncs-menu-item" onclick="NCSFunct.backgroundSelect()"><i class="icon icon-check-blue ncs-menu-icon"></i><span class="name ncs-menu-span">Custom Background</span></div><div class="user ncs-accnav-toggle ncs-menu-item" onclick="NCSFunct.toggleNavigation();"><i class="icon icon-check-blue ncs-menu-icon"></i><span class="name ncs-menu-span">Accidental Navigation Prevention</span></div><div class="user ncs-update-btn ncs-menu-item" onclick="NCSFunct.updateCheck();"><i class="icon icon-check-blue ncs-menu-icon"></i><span class="name ncs-menu-span">Check for Updates</span></div><div class="user ncs-donate-btn ncs-menu-item" onclick="NCSFunct.redir(\'https://paypal.me/CSxKING\');"><i class="icon icon-check-blue ncs-menu-icon"></i><span class="name ncs-menu-span">Donate to NCS!</span></div><div class="user ncs-frndnotif-btn ncs-menu-item" onclick="NCSFunct.toggleFrndNotif()"><i class="icon icon-check-blue ncs-menu-icon"></i><span class="name ncs-menu-span">Disable Friend Notification Blip</span></div><div class="user ncs-report-btn ncs-menu-item" onclick="NCSFunct.redir(\'https://ncs.csxking.me/bugs/\')"><i class="icon icon-check-blue ncs-menu-icon"></i><span class="name ncs-menu-span">Found an issue? Report it here!</span></div></div>' + '<div class="ncs-menu-header list-header"><span class="title">Moderation</span></div><div class="group"><div class="user ncs-menu-item item ncs-del-chat-toggle" onclick="NCSFunct.toggleDeletedChat();"><i class="icon icon-check-blue ncs-menu-icon"></i><span class="name ncs-menu-span">Show Deleted Chat</span></div></div>' + '</div></div></div></div>'
        }
    };

    $('#header-panel-bar').append(models.tab);
    $('#header-panel-bar').click(function () {
        setTimeout(function () {
            if (!$('#ncs-menu-button').hasClass('selected')) {
                $('#ncs-menu').hide();
            }
        })
    });
    $('#ncs-menu-button').click(function () {
        if (!$('#ncs-menu-button').hasClass('selected')) {
            $(".header-panel-button").removeClass('selected')
            $('#ncs-menu-button').addClass('selected');
            $('.app-right').children().hide();
            $('#ncs-menu').show();
        }
    });

    $('#meh').removeClass('disabled');

    $('.app-right').append(models.menu());

    $('#room').append('<span id="loli-counter">Loli count: 0</span>');
    var img_regex = /^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpg|gif|png|jpeg)$/;
    var lolis = 0;
    API.on(API.CHAT, function (msg) {
        lolis += (msg.message.match(/loli/g) || []).length;
        $('#loli-counter').text('Loli count: ' + lolis);
        // Developer Icon
        if ([4404760, 5751501].indexOf(msg.uid) !== -1) {
            $($($('div[data-cid^="' + msg.cid + '"]').addClass('ncs-developer')).children('.msg')).children('.from').prepend('<i title="NCS Developer" class="icon"style="width:16px;height:16px;background: url(\'https://i.imgur.com/uerI4EX.png\')">')
        }
        // VIP Icon
        if ([4537120, 4674471, 3620521].indexOf(msg.uid) !== -1) {
            $($($('div[data-cid^="' + msg.cid + '"]').addClass('ncs-vip')).children('.msg')).children('.from').prepend('<i title="NCS VIP" class="icon"style="width:16px;height:16px;background: url(\'https://i.imgur.com/K9qSqOX.png\')">')
        }
        // Donator Icon
        if ([5371972].indexOf(msg.uid) !== -1) {
            $($($('div[data-cid^="' + msg.cid + '"]').addClass('ncs-donate')).children('.msg')).children('.from').prepend('<i title="NCS Donator" class="icon"style="width:16px;height:16px;background: url(\'https://i.imgur.com/naLYLHV.png\')">')
        }
        // Kidyeon Gif
        if ([5371972].indexOf(msg.uid) !== -1) {
            $($($('div[data-cid^="' + msg.cid + '"]').addClass('ncs-kidyeon')).children('.msg')).children('.from').prepend('<i title="Wizardly Editor" class="icon"style="width:16px;height:16px;background: url(\'https://i.imgur.com/7m5XynH.gif\')">')
        }
        if ([5371972].indexOf(msg.uid) !== -1) {
            $($($('div[data-cid^="' + msg.cid + '"]').addClass('ncs-wizard')).children('.msg')).children('.from').prepend('<i title="Wizardly Editor" class="icon"style="width:16px;height:16px;background: url(\'https://i.imgur.com/7m5XynH.gif\')">')
        }
        if (ncsSettings.chatImages) {
            var matches = msg.message.match(img_regex);
            if (matches) {
                matches.forEach((match)=> {
                    $('.text.cid-' + msg.cid).html(function (i, html) {
                        return html + '<img src="' + match + '">';
                    });
                });
            }
        }
    });

    var tab = $('.dash .tray').append(models.tab);
    var back = $('#app-right').append(models.back);

    back.find('.item').append('<i class="mdi mdi-check"></i>');
    back.find('.editable').append('<i class="mdi mdi-pencil"></i>');
    //destroys friendlist

    this.elements = new (function () {

    });

    this.hideVideo = function () {

    }
    back.find('.item .hide-video').on('click', this.hideVideo);

})();

API.on(API.ADVANCE, NCSFunct.checkUsers);

var etaAppend = 0;

var eta1 = null;
$('#dj-button').append('<span id="etacount">ETA: undefined</span>');
var ETAInterval = setInterval(function () {
    var position = API.getWaitListPosition()
    position = (position < 0) ? API.getWaitList().length : position;
    var eta = ~~((position * (3.5 * 60)) + (API.getTimeRemaining()));
    if (ncsSettings.eta === true) {
        $('#etacount').show();
        eta1 = eta;
        $('#dj-button').attr('data-eta', 'ETA: ' + NCSFunct.readable(eta));
        $('#etacount').html('ETA: ' + NCSFunct.readable(eta1));
        $('#vote').css('width', '350px');
    } else {
        $('#etacount').hide();
    }
}, 1000);

setInterval(function() {
    NCSFunct.fixvideo();
    NCSFunct.checkUsers();
}, 5000);

setInterval(function() {
    console.clear();
}, 100000);

setTimeout(function() {
    NCSFunct.init();
    NCSFunct.defaultStyles();
    NCSFunct.startupMsgs();
    NCSFunct.fixvideo();
    $('#ncs-menu').append('<span id="ncsusers">NAN people using NCS in NAN rooms!</span>');
    NCSFunct.checkUsers();
}, 2500);
