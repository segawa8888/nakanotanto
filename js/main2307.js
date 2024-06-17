$(function () {
  $("#js-hamburger").on('click',function () {
    $(this).toggleClass("active"), $("#js-nav").toggleClass("active");
  });
});

$(function () {
  $("#js-tooltip-open").hover(
    function () {
      $("#js-tooltip").addClass("is-acive").fadeIn(300);
    },
    function () {
      $("#js-tooltip").removeClass("is-acive").fadeOut(300);
    }
  );
});

// SPナビ　sub__nav アコーディオン
$(function() {
  $('#js-sub__nav-trigger').on('click',function () {
    $(this).next('.sub-area').slideToggle();
    // $(this).siblings('.acd-content').stop().slideToggle(450, 'linear');
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
    }else{
        $(this).addClass('active');
    }
  });
});

$(".p-topItems__item__image__view").slick({
  autoplay: true, //自動再生
  loop: true,
  autoplaySpeed: 10000, //自動再生のスピード
  speed: 5000, //スライドするスピード
  dots: false, //スライドしたのドット
  arrows: false,
});

// Slick JS
$(".p-modal__img__slides").not(".slick-initialized").slick({
  autoplay: false, //自動再生
  dots: true, //スライドしたのドット
  arrows: true,
  focusOnSelect: true,
});

$(function () {
  $(window).on("scroll", function () {
    30 < $(this).scrollTop()
      ? $("#js-header__bgChange").addClass("is-scrolled")
      : $("#js-header__bgChange").removeClass("is-scrolled");
  });
});

// Modal JS -- items page
$(function () {
  function postMessageToPlayer(player, command) {
    if (player == null || command == null) return;
    player.contentWindow.postMessage(JSON.stringify(command), "*");
  }

  $(".js-md-btn").each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      var target = $(this).data("target");
      var modal = document.getElementById(target);
      $(modal).find(".p-modal__overlay,.p-modal__contents").fadeIn();
      $(".p-modal__contents").scrollTop(0);

      // スクロール付きモーダルの場合
      if ($(modal).hasClass("p-modal--type2")) {
        $(modal).find(".p-modal__inner").scrollTop(0);
      }

      $("body").css("overflow-y", "hidden"); // 本文の縦スクロールを無効
      $(modal).find(".p-modal__img__slides").not(".slick-initialized").slick({
        autoplay: false, //自動再生
        dots: true, //スライドしたのドット
        arrows: true,
        focusOnSelect: true,
      });
      setTimeout(function () {
        $(modal).find(".p-modal__img__slides").slick("setPosition");
      }, 500);
    });
  });
  $(".md-close").on("click", function () {
    var target = $(this).parent();
    const hasSlick = $(target).find(".p-modal__img__slides").length ? true : false;
    const hasYoutube =  $(target).find(".js-youtube").length ? true : false;

    $(".p-modal__overlay,.p-modal__contents").fadeOut();

    if (hasSlick) {
      setTimeout(function () {
        $(target).find(".p-modal__img__slides").slick("unslick");
      }, 300);
    }

    if (hasYoutube) {
      $(target).find('.js-youtube').each((i, elm) => {
        const player = $(elm).get(0);
        postMessageToPlayer(player, {
          event: "command",
          func: "stopVideo",
        });
      });
    }

    $("body").css("overflow-y", "auto"); // 本文の縦スクロールを有効
  });
});

// ====================
//  button hover　挙動制御
// ====================
$(function () {
  var userAgent = navigator.userAgent; // ユーザーエージェント判定
  var link = $(".u-button--md, .u-button--sm"); // aタグ要素代入
  // aタグを踏んだ時の端末判定とhover装飾
  if (
    userAgent.indexOf("iPhone") >= 0 ||
    userAgent.indexOf("iPad") >= 0 ||
    userAgent.indexOf("Android") >= 0
  ) {
    link.on("touchstart", function () {
      $(this).addClass("u-button__hover");
    });
    link.on("touchend", function () {
      $(this).removeClass("u-button__hover");
    });
  } else {
    link.hover(
      function () {
        $(this).addClass("u-button__hover");
      },
      function () {
        $(this).removeClass("u-button__hover");
      }
    );
  }
});
