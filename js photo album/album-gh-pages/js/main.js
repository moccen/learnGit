$(document).ready(function() {

	$('#nav01').click(function() {

		window.open("photos.html", "_self")
	}

	)
	$('#nav02').click(function() {

		window.open("photos_stream.html", "_self")
	}

	)
	$('#nav03').click(

	function() {

		window.open("photos_albums.html ", "_self")
	})


	$(".sel-input").focus(function() {

		if ($(this).val() == this.defaultValue) {
			$(this).val("");
		}
	}).blur(function() {

		if ($(this).val() == '') {
			$(this).val(this.defaultValue);
		}
	});



	$('.photo-thumb').masonry({
		itemSelector: '.photo-fade',
		columnWidth: 1,
		isAnimated: true
	});


	$('.add-desc').click(function() {

		$('.content-desc').show();
		$(this).hide();
	})

	$('.content-desc-submit').click(function() {

		$('.add-desc').show();
		$('.content-desc').hide();
	})





	$('.album-subset').slideshow();
	$('.photo-fade .photo-sort,.photo-fade-album').mosaic();




	$('.highlight-btn').click(function() {
		var $moving = $('.photo-thumb');
		var _conzoom = $(this).parent().parent().parent().parent().parent().parent().parent();
		var _conzoomchild = _conzoom.children().children().length;
		var _conzoom_h = _conzoom.width();
		var _conzoom_a1 = _conzoom.hasClass('col_1');
		var _conzoom_a2 = _conzoom.hasClass('col_2');
		var _conzoom_a3 = _conzoom.hasClass('col_3');
		if ($(this).hasClass('btn-act')) {

			$(this).parent().parent().parent().parent().css({
				"width": "205",
				"height": "205"
			});
			$(this).removeClass("btn-act");
			$(this).parent().parent().next().removeClass("big-zoom");
			$(this).parent().parent().next().next().next().css("top", "210px")
			if (_conzoom_h > 211 * _conzoomchild && (_conzoom_a1 == true || _conzoom_a2 == true || _conzoom_a3 == true)) {
				_conzoom.css("width", _conzoom_h - 211);
			}
		}
		else {
			$(this).parent().parent().parent().parent().css({
				"width": "416",
				"height": "416"
			});
			$(this).addClass("btn-act");
			$(this).parent().parent().next().addClass("big-zoom");
			$(this).parent().parent().next().next().next().css("top", "420px");
			if ((_conzoom_h + 211) <= 844 && (_conzoom_a1 == true || _conzoom_a2 == true || _conzoom_a3 == true)) {
				_conzoom.css("width", _conzoom_h + 211);
			}
		}
		$moving.masonry('reload');
	})
	$('.edit-remove-btn,.edit-option-btn,.edit-option-privacy').toggle(function() {
		$(this).children('.tools-btn').show()
		$(this).addClass("btn-act");
		$(this).parent().parent().next().addClass("big-zoom-btn");
	}, function() {
		$(this).children('.tools-btn').hide()
		$(this).removeClass("btn-act");
		$(this).parent().parent().next().removeClass("big-zoom-btn");
	})
	$('.tools-btn .has-icon').hover(function() {
		$(this).addClass("icon-hover")
	}, function() {
		$(this).removeClass("icon-hover")
	})
	$('.highlight-btn,.edit-remove-btn,.edit-option-btn').tooltipster({
		animation: 'fade',
		trigger: 'hover'
	});

	$('.icon-comment').toggle(function() {
		var iconcomment = $(this).parent().parent().parent().next().next().next('.comment-content')

		if (iconcomment.is(":hidden")) {
			$('.comment-content').hide()
			iconcomment.show();
		}
		else {
			iconcomment.hide();
		}
	}, function() {
		var iconcomment = $(this).parent().parent().parent().next().next().next('.comment-content')

		if (iconcomment.is(":hidden")) {
			$('.comment-content').hide()
			iconcomment.show();
		}
		else {
			iconcomment.hide();
		}
	})

	$('.photo-thumb li .mask-all').fancybox({
		openEffect: 'none',
		closeEffect: 'none',
		prevEffect: 'none',
		nextEffect: 'none',
		padding: 0,
		helpers: {
			title: {
				type: 'inside'
			},
		}

	}


	);
});

