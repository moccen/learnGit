/*
 *
 * @authors your name (you@example.org)
 * @date    2015-03-06 21:16:33
 * @version $id$
 */
var timer = null;
var offset = 5000;
var index = -99;
var target = [];
var loadedImgs = {};
var currindex = -99;
var jsondata = {
    "album": {
        "name": "summer at the lake, 2008"
    },
    "photos": [{
        "id": "1",
        "url": "test_images/image1.jpg",
        "thumb_url": "test_images/thumb1.jpg",
        "title": "julie sitting on the grass",
        "date": "december 12, 2008",
        "location": "los angeles, california"
    }, {
        "id": "2",
        "url": "test_images/image2.jpg",
        "thumb_url": "test_images/thumb2.jpg",
        "title": "shoes",
        "date": "january 1, 2008",
        "location": "tokyo, japan"
    }, {
        "id": "3",
        "url": "test_images/image3.jpg",
        "thumb_url": "test_images/thumb3.jpg",
        "title": "jessica and amy by the lake",
        "date": "february 26, 2008",
        "location": "paris, france"
    }, {
        "id": "4",
        "url": "test_images/image4.jpg",
        "thumb_url": "test_images/thumb4.jpg",
        "title": "mike and julie",
        "date": "may 1, 2008",
        "location": "new york, new york"
    }, {
        "id": "5",
        "url": "test_images/image5.jpg",
        "thumb_url": "test_images/thumb5.jpg",
        "title": "canoe!",
        "date": "march 13, 2008",
        "location": "london, england"
    }, {
        "id": "6",
        "url": "test_images/image6.jpg",
        "thumb_url": "test_images/thumb6.jpg",
        "title": "the girls in the tent",
        "date": "july 4, 2008",
        "location": "dubai, united arab emirates"
    }]
};
//
//
function loadimagecontainer(img) {
    $("#loading_image").hide();
    $(img).hide();
    $("#image_container").empty().append(img);
    $(img).fadeIn();
    // if ($.browser.msie) {
    //     $(img).show();
    // } else {
    //     $(img).fadein();
    // }
}

function showimage(selectedindex) {
    if (!jsondata) {
        return;
    }
    if (selectedindex < 0) {
        selectedindex = jsondata.photos.length-1;
    } else if (selectedindex > jsondata.photos.length - 1) {
        selectedindex = 0;
    }
    // if (index == selectedindex) {
    //     return;
    // }
    index = selectedindex;
    // show loader image
    var offset = $("#image_container img").offset();
    var width = $("#image_container img").width();
    var height = $("#image_container img").height();
    if (offset) {
        $("#loading_image").css("left", offset.left + width / 2).css("top", offset.top + height / 2).show();
    }
    // show the large image
    var img = loadedImgs[index];
    if (!img) {
        img = new Image();
        img.src = jsondata.photos[index].url;
        img.onload = function(e) {
            loadimagecontainer(img);
            loadedImgs[index] = img;
        }
    } else {
        loadimagecontainer(img);
    }
}

$(document).keydown(function(e){
    if(e.keycode == 39) {
      $("#big_play_next").click();
    } else if(e.keycode == 37) {
      $("#big_play_prev").click();
    }
  });

function slideimage(i) {
    var id = 'image_' + target[i];
    $('#' + id).animate({
        opacity: 1
    }, 800, function() {
        $(this).find('.word').animate({
            height: 'show'
        }, 'slow');
    }).show().siblings(':visible').find('.word').animate({
        height: 'hide'
    }, 'fast', function() {
        $(this).parent().animate({
            opacity: 0
        }, 800).hide();
    });
}
//bind thumb a
function hookthumb() {
    $('#thumbs li a').bind('click', function() {
        if (timer) {
            cleartimeout(timer);
        }
        var id = this.id;
        index = getindex(id.substr(6));
        rechange(index);
        slideimage(index);
        timer = window.settimeout(auto, offset);
        this.blur();
        return false;
    });
}
//bind next/prev img
function hookbtn() {
    $('#thumbs li img').filter('#play_prev,#play_next').bind('click', function() {
        if (timer) {
            cleartimeout(timer);
        }
        var id = this.id;
        if (id == 'play_prev') {
            index--;
            if (index < 0) index = 6;
        } else {
            index++;
            if (index > 6) index = 0;
        }
        //rechange(index);
        slideimage(index);
        //timer = window.settimeout(auto, offset);
    });
}

function bighookbtn() {
    $('#bigpicarea p span').filter('#big_play_prev,#big_play_next').bind('click', function() {
        if (timer) {
            cleartimeout(timer);
        }
        var id = this.id;
        if (id == 'big_play_prev') {
            index--;
            if (index < 0) index = 6;
        } else {
            index++;
            if (index > 6) index = 0;
        }
        //rechange(index);
        //slideimage(index);
        //timer = window.settimeout(auto, offset);
        showimage(index);
    });
}
//get index
function getindex(v) {
    for (var i = 0; i < target.length; i++) {
        if (target[i] == v) return i;
    }
}

function rechange(loop) {
    var id = 'thumb_' + target[loop];
    $('#thumbs li a.current').removeclass('current');
    $('#' + id).addclass('current');
}

function auto() {
    index++;
    if (index > 6) {
        index = 0;
    }
    //rechange(index);
    slideimage(index);
    timer = window.settimeout(auto, offset);
}
$(function() {
    //change opacity
    $('div.word').css({
        opacity: 0.85
    });
    //auto();  
    // hookthumb(); 
    // hookbtn();
    bighookbtn();
    $('.close_modal').click(function() {
        //use the function to close it
        //hide the mask
        $('#mask').fadeOut(500);
        //hide modal window(s)
        $('.close_modal').fadeOut(500);
    });
});

function initialwelcomepage() {
    //get the height and width of the page
    var window_width = $(window).width();
    var window_height = $(window).height();
    //vertical and horizontal centering of modal window(s)
    /*we will use each function so if we have more then 1 
    modal window we center them all*/
    $('.modal_window').each(function() {
        //get the height and width of the modal
        var modal_height = $(this).outerheight();
        var modal_width = $(this).outerwidth();
        //calculate top and left offset needed for centering
        var top = (window_height - modal_height) / 2;
        var left = (window_width - modal_width) / 2;
        //apply new top and left css values 
        $(this).css({
            'top': top,
            'left': left
        });
    });
    //$('.activate_modal').click(function () {
    //    //get the id of the modal window stored in the name of the activating element       
    //    var modal_id = $(this).attr('name');
    //    //use the function to show it
    //    show_modal(modal_id);
    //});
    show_modal('modal_window'); // show modal window by default
    $('.close_modal').click(function() {
        //use the function to close it
        close_modal();
    });
    //close when click the picture
    $('.modal_window').click(function(event) {
        /* act on the event */
        close_modal();
    });
};
//the functions
function close_modal() {
    $('#bigpic').hide();
    //hide the mask
    $('#mask').fadeout(500);
    //hide modal window(s)
}

function show_modal(modal_id) {
    //set display to block and opacity to 0 so we can use fadeto
    $('#mask').css({
        'display': 'block',
        opacity: 0
    });
    //fade in the mask to opacity 0.8 
    $('#mask').fadeto(500, 0.8);
    //show the modal window
    $('#' + modal_id).fadein(500);
}

//showimage(0);