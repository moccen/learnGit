(function ($) {
    $.fn.fbmodal = function (options, callback) {

//Default values
        var defaults = {
            title:"FB Modal",
            cancel:"Cancel",
            okay:"Okay",
            okaybutton:true,
            cancelbutton:true,
            buttons:true,
            opacity:0.0,
            fadeout:true,
            overlayclose:true,
            modaltop:"30%",
            modalwidth:"",
            close:false
        };

        var options = $.extend(defaults, options);

        var fbmodalHtml = '\
<div id="fbmodal" > \
<div class="popup"> \
<table> \
<tbody> \
<tr> \
<td class="tl"/><td class="b"/><td class="tr"/> \
</tr> \
<tr> \
<td class="b"/> \
<td class="body"> \
<div class="title">\
</div> \
<div class="container">\
<div class="content">\
</div> \
<div class="footer"> \
<div class="right">\
<div class="button_outside_border_blue" id="ok">\
<div class="button_inside_border_blue" id="okay">\
</div>\
</div>\
<div class="button_outside_border_grey" id="close">\
<div class="button_inside_border_grey" id="cancel">\
</div>\
</div>\
</div>\
<div class="clear">\
</div>\
</div> \
</div>\
</td> \
<td class="b"/> \
</tr> \
<tr> \
<td class="bl"/><td class="b"/><td class="br"/> \
</tr> \
</tbody> \
</table> \
</div> \
</div>';

        var preload = [ new Image(), new Image() ];
        $('#fbmodal').find('.b:first, .bl, .br, .tl, .tr').each(function () {
            preload.push(new Image());
            preload.slice(-1).src = $(this).css('background-image').replace(/url\((.+)\)/, '$1');
        });
        var dat = this.html();
        $("body").append(fbmodalHtml);
        $('#fbmodal .content').
            append('<div class="loading"><img src="loading.gif"/></div>');
        $('#fbmodal').css("top", options.modaltop);
        if (options.okaybutton == false || options.buttons == false) {
            $('#fbmodal #ok').hide();
        }
        if (options.cancelbutton == false || options.buttons == false) {
            $('#fbmodal #close').hide();
        }
        $('#fbmodal .title').append(options.title);
        $('#fbmodal #okay').append(options.okay);
        $('#fbmodal #cancel').append(options.cancel);
        $('#fbmodal .content').append(dat).css("width", options.modalwidth);
        $('#fbmodal .loading').remove();
        $("body").append('<div id="fbmodal_overlay" class="fbmodal_hide"></div>');
        $('#fbmodal_overlay').addClass("fbmodal_overlay").fadeTo(0, options.opacity);
        fbWidth();
        $(window).bind("resize", function () {
            fbWidth();
        });
        function fbWidth() {
            var windowWidth = $(window).width();
            var fbmodalWidth = $("#fbmodal").width();
            var fbWidth = windowWidth / 2 - fbmodalWidth / 2;
            $("#fbmodal").css("left", fbWidth);
        }

        if (options.close == true) {
            if (options.fadeout == true) {
                $("#fbmodal").fadeOut(function () {
                    $("#fbmodal").remove();
                    $('#fbmodal_overlay').removeClass("fbmodal_overlay");
                });
            } else {
                $("#fbmodal").remove();
                $('#fbmodal_overlay').removeClass("fbmodal_overlay");
            }
        }
        if (options.overlayclose == true) {
            var overlay = "ok, #close, .fbmodal_hide";
        } else {
            var overlay = "ok, #close";
        }
        $("#" + overlay).click(function () {
            if (options.fadeout == true) {
                $("#fbmodal").fadeOut(function () {
                    $("#fbmodal").remove();
                    $('#fbmodal_overlay').removeClass("fbmodal_overlay");
                });
            } else {
                $("#fbmodal").remove();
                $('#fbmodal_overlay').removeClass("fbmodal_overlay");
            }
        });


    }
})(jQuery);