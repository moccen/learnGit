$(document).ready(function() {
  var jsondatasrc = "http://127.0.0.1/downloads/js photo album/demo-album-master/gallery_json.txt";
  var jsondata = null;
  var currindex = -99;
  var testdata = {
  "album": {
    "name": "summer at the lake, 2008"
  },
  "photos": [
    {
      "id":"1",
      "url":"test_images/image1.jpg",
      "thumb_url":"test_images/thumb1.jpg",
      "title":"julie sitting on the grass",
      "date":"december 12, 2008",
      "location":"los angeles, california"
    },
    {
      "id":"2",
      "url":"test_images/image2.jpg",
      "thumb_url":"test_images/thumb2.jpg",
      "title":"shoes",
      "date":"january 1, 2008",
      "location":"tokyo, japan"
    },
    {
      "id":"3",
      "url":"test_images/image3.jpg",
      "thumb_url":"test_images/thumb3.jpg",
      "title":"jessica and amy by the lake",
      "date":"february 26, 2008",
      "location":"paris, france"
    },
    {
      "id":"4",
      "url":"test_images/image4.jpg",
      "thumb_url":"test_images/thumb4.jpg",
      "title":"mike and julie",
      "date":"may 1, 2008",
      "location":"new york, new york"
    },
    {
      "id":"5",
      "url":"test_images/image5.jpg",
      "thumb_url":"test_images/thumb5.jpg",
      "title":"canoe!",
      "date":"march 13, 2008",
      "location":"london, england"
    },
    {
      "id":"6",
      "url":"test_images/image6.jpg",
      "thumb_url":"test_images/thumb6.jpg",
      "title":"the girls in the tent",
      "date":"july 4, 2008",
      "location":"dubai, united arab emirates"
    }
  ]
};
  // use a hash to store previously loaded images for faster repeat playback
  var loadedimages = {};

  function loadimagecontainer(img) {
    $("#loading_image").hide();
    $(img).hide();
    $("#image_container").empty().append(img);
    if($.browser.msie) { $(img).show(); }
    else { $(img).fadein(); }
  }

  function showimage(index) {
    if(!jsondata) { return; }
    if(index < 0) { index = 0; }
    else if(index > jsondata.photos.length - 1) {
      index = jsondata.photos.length - 1;
    }
    if(currindex == index) { return; }
    currindex = index;

    // show loader image
    var offset = $("#image_container img").offset();
    var width =  $("#image_container img").width();
    var height = $("#image_container img").height();
    if(offset) {
      $("#loading_image").css("left", offset.left + width/2).css("top", offset.top + height/2).show();
    }

    // highlight thumbnail 
    $("#thumbnails img").removeclass("selected")
    $("#thumb_"+index).addclass("selected");

    // show the large image
    var img = loadedimages[index];
    if(!img) { 
      img = new image();
      img.onload = function(e) {
        loadimagecontainer(img);
  loadedimages[index] = img;
      }
      img.src = jsondata.photos[index].url;
    } else {
      loadimagecontainer(img);
    }

    $("#image_title").html(jsondata.photos[index].title || "untitled");
    var imageinfo = "";

    // gracefully handle missing date or location or both
    if(jsondata.photos[index].date) {
      imageinfo += " on " + jsondata.photos[index].date;
    }
    if(jsondata.photos[index].location) {
      imageinfo += " in " + jsondata.photos[index].location;
    }
    if(imageinfo) {
      imageinfo = "taken " + imageinfo;
    }

    $("#image_info").html(imageinfo);
  }

  function showthumbs(photos) {
    if(!photos) { return; }

    var thumbhtml = "<ul>";
    for(var i in photos) {
      thumbhtml += "<li><img id=\"thumb_" + i + "\" src=\"" + photos[i].thumb_url + "\"/></li>";
    }
    thumbhtml += "</ul>";
    $("#thumbnails").html(thumbhtml);

    // add click handler
    $("#thumbnails img").click(function(e) {
      var imageid = e.target.id;
      var imageindex = 1 * imageid.substr(imageid.indexof("_")+1)
      showimage(imageindex);
    });

    showimage(0);
  }

  function showgallery(data) {
    if(!data) { return; }
    jsondata = data;

    $("#album_title").html(data.album.name);

    // generate thumbnail list
    showthumbs(data.photos);
  }

  // $.ajax({url:jsondatasrc, success:function(data, status) {
  //   $("#splash").hide();
  //   showgallery(json.parse(data));
  // }, error: function() {
  //   $("#splash").html("oops! could not load gallery data!");
  //   $("#splash").show();
  // }});
  // 
  $('#splash').hide();
  showgallery(testdata);

  // install handlers for the prev and next buttons
  $("#link_prev").click(function(e){
    showimage(currindex - 1);
  });

  $("#link_next").click(function(e){
    showimage(currindex + 1);
  });

  // also enable left and right keys for navigation
  $(document).keydown(function(e){
    if(e.keycode == 39) {
      $("#link_next").click();
    } else if(e.keycode == 37) {
      $("#link_prev").click();
    }
  });

  // firefox specific hack to get the bottom outer border of large images to align up
  if($.browser.mozilla) {
    $("#image_container").addclass("mozilla");
  }

});
