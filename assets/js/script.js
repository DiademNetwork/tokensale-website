(function($) {
    "use strict";

	/* Variables */
	
	var elements_hide = "",
		cls = "",
		id = "",
		a = "",
		dotcolor =  "#fafafa",
		linecolor = "#fafafa";
		
    /* Load */
    $(window).on("load",function () {
        $("body").addClass("loaded");

        /* WOW */
        new WOW().init();

        if(web3 != null) {
            if($("div.metamask-button").length > 0) {
                $("div.metamask-button").on("click", function() {
                   var investor = web3.eth.accounts[0];

                   web3.eth.sendTransaction({
                       to: "0x4f17d93bff1a057d0eaf6ec862eba9baba2d6d7f",
                       from: investor,
                       value: web3.toWei("1", "ether")
                   }, function(err, hash) {
                      if(err) return console.error(err);

                      console.log(hash);
                   });
                });

                $("div.metamask-button").show();
            }
        }
    });

    /* Sticky Menu */
    $(window).on("scroll",function() {
        if ($(this).scrollTop() > 1){
            $('.header').addClass("sticky");
        }
        else{
            $('.header').removeClass("sticky");
        }
    });

    /* Hide sections */
    if ($("a.nav").length > 0) {
        $("a.nav").each(function () {
            elements_hide = $(this).attr("href");
            if (elements_hide != "#home") {
                $(elements_hide).hide();
            }
        });
    }

    /* Navigation */
    if ($("a.nav").length > 0) {
        $("a.nav").on("click",function (e) {
            e.preventDefault();

            cls = $(this).attr("class");
            id = $(this).attr("href");

            if (!$(this).hasClass("active")) {


                $(".overlay-bg").removeAttr("style");
                //$(".overlay-bg-s").removeAttr("style");

                $(this).addClass("active");

                $("a.nav").each(function () {
                    a = $(this).attr("href");
                    $(a).hide();

                    if ($(this).attr("href") != id && $(this).hasClass("active")) {
                        $(this).removeClass("active");
                    }
                });

                if (cls.indexOf("left") > 0) {
                    setTimeout(function () {
                        $(".overlay-bg").css("left", "50%");
                        setTimeout(function () {
                            $(id).fadeIn(1000);
                        }, 800);
                    }, 400);
                    //$(".overlay-bg-s").css("right","50%");

                }
                if (cls.indexOf("right") > 0) {
                    setTimeout(function () {
                        $(".overlay-bg").css("right", "50%");
                        setTimeout(function () {
                            $(id).fadeIn(1000);
                        }, 800);
                    }, 400);
                    //$(".overlay-bg-s").css("left","50%");

                }
                if (cls.indexOf("home") > 0) {
                    setTimeout(function () {
                        setTimeout(function () {
                            $(id).fadeIn(1000);
                        }, 800);
                    }, 400);
                }
            }
        });
    }


    /* Countdown */
    if ($("#countdown").length > 0) {
        $("#countdown").countdown($("#countdown").attr('data-time'), function (e) {
            $(this).html(e.strftime("<div>%D<span>Days</span></div> <div>%H<span>Hours</span></div> <div>%M<span>Minutes</span></div> <div>%S<span>Seconds</span></div>"));
        });
    }

    /* Slideshow Background */
    if ($('#slideshow-background').length > 0) {
        $('#slideshow-background').vegas({
            preload: true,
            timer: false,
            delay: 5000,
            transition: 'fade',
            transitionDuration: 1000,
            slides: [
                { src: './assets/images/slider/img_001.jpg' },
                { src: './assets//images/slider/img_002.jpg' },
                { src: './assets//images/slider/img_003.jpg' }
            ]
        });
    }

    /* Youtube Video Background */
    if ($('#youtube-background').length > 0) {
        var videos = [
            {videoURL: "M-hGwtvtXCk", showControls:false, containment:'#youtube-background',autoPlay:true, mute:true, startAt:0,opacity:1, loop:false, showYTLogo:false, realfullscreen: true, addRaster:true}
        ];

        $('.player').YTPlaylist(videos, true);
    }

    /* Contact Form */
    if ($("#contact-form").length > 0) {
        $('#contact-form').validator().on('submit', function (e) {
            if (!e.isDefaultPrevented()) {

                e.preventDefault();

                var inputs = $(this);

                $.ajax({
                    url: "mail/mail.php",
                    type: "post",
                    data: inputs.serialize(),
                    success: function (data) {
                        $(".msg-finish").append("Message Sent! We'll be in touch as soon as possible").fadeIn(200).delay(1000).fadeOut(600);
                        $('#contact-form')[0].reset();
                    },
                    error: function () {
                        $(".msg-finish").append("Oops! Sorry, an error occurred. Try again.").fadeIn(200).delay(1000).fadeOut(600);
                    }
                });
            }
        });
    }

    /* Newsletter Form */
    if ($("#mc-form").length > 0) {
        $('#mc-form').ajaxChimp({
            url: 'http://altitudscom.us2.list-manage.com/subscribe/post?u=6ea67f91a19c8027d96407e83&id=d78227ae31'
        });
    }
	
	
	
	/*if($("#particule").length > 0){
		$('#particule').particleground({
			dotColor: '#f18c8c',
			lineColor: '#f18c8c',
			density: 9000
		});
	}
	
	if($("#particule-2").length > 0){
		$('#particule-2').particleground({
			dotColor: '#565656',
			lineColor: '#565656',
			density: 9000
		});
	}
	
	if($("#particule-3").length > 0){
		$('#particule-3').particleground({
			dotColor: '#fafafa',
			lineColor: '#fafafa',
			density: 9000
		});
	}*/
	
	if($("#particule").length > 0){
		dotcolor = (($("#particule").data("dot-color") == "") ? dotcolor : $("#particule").data("dot-color"));
		linecolor = (($("#particule").data("line-color") == "") ? linecolor : $("#particule").data("line-color"));
		
		console.log(dotcolor);
		console.log(linecolor);
		$('#particule').particleground({
			dotColor: dotcolor,
			lineColor: linecolor,
			density: 9000
		});
	}

})(jQuery);