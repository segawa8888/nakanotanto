// ロード時のみトランジションを外す設定
$(window).on('load',function(){
    if ($('body').hasClass('preload')) {
        $('body').removeClass('preload');
    }else{}
});
// ここまで

// アコーディオン
$(function() {
    var click = true;
    $('.acd-box .js-acd-trigger').on('click', function () {
        if(click) {
            click=false;
            setTimeout(function() {
              click = true;
            }, 300);//連続クリック制御
            $(this).parents().next('.acd-content').stop().slideToggle();
            // $(this).siblings('.acd-content').stop().slideToggle(450, 'linear');
            if ($(this).hasClass('close')) {
                $(this).removeClass('close');
            }else{
                $(this).addClass('close');
            }
        }
       
    });
    // コンテンツ内のクローズボタン
    $('.acd-box .js-acd-trigger-inner').on('click', function () {
        if(click) {
            click=false;
            setTimeout(function() {
              click = true;
            }, 300);//連続クリック制御
            $(this).parents('.acd-content').stop().slideToggle(600, 'linear');
            if ($(this).parents().prev('.acd-header').find('.js-acd-trigger').hasClass('close')) {
                $(this).parents().prev('.acd-header').find('.js-acd-trigger').removeClass('close');
            }else{
                $(this).parents().prev('.acd-header').find('.js-acd-trigger').addClass('close');
            }
        }
       
    });
    // スライダークリックの場合
    $('.infinity-slide-area').on('click', function () {
      if(click) {
          click=false;
          setTimeout(function() {
            click = true;
          }, 300);//連続クリック制御
          // $(this).siblings('.acd-content').stop().slideToggle(450, 'linear');
          if ($('.acd-box .js-acd-trigger').hasClass('close')) {
          }else{
              $('#js-acd-content').stop().slideToggle();
              $('.acd-box .js-acd-trigger').addClass('close');
          }
      }
     
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
        $(modal).find(".poke-modal__overlay,.poke-modal__contents").fadeIn();
        $(".poke-modal__contents").scrollTop(0);
  
        // スクロール付きモーダルの場合
        if ($(modal).hasClass("poke-modal--type2")) {
          $(modal).find(".poke-modal__inner").scrollTop(0);
        }
  
        $("body").css("overflow-y", "hidden"); // 本文の縦スクロールを無効
        $(modal).find(".poke-modal__img__slides").not(".slick-initialized").slick({
          autoplay: false, //自動再生
          dots: true, //スライドしたのドット
          arrows: true,
          focusOnSelect: true,
        });
        setTimeout(function () {
          $(modal).find(".poke-modal__img__slides").slick("setPosition");
        }, 500);
      });
    });
    $(".md-close").on("click", function () {
      var target = $(this).parent();
      const hasSlick = $(target).find(".poke-modal__img__slides").length ? true : false;
      const hasYoutube =  $(target).find(".js-youtube").length ? true : false;
  
      $(".poke-modal__overlay,.poke-modal__contents").fadeOut();
  
      if (hasSlick) {
        setTimeout(function () {
          $(target).find(".poke-modal__img__slides").slick("unslick");
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

// スマホページ内ナビ
$(function() {
    var click = true;
    $('.sp-inner-nav .inner-btn').on('click', function () {
        if(click) {
            click=false;
            setTimeout(function() {
              click = true;
            },10);//連続クリック制御
            if ($(this).hasClass('open')) {
                $(this).removeClass('open');
            }else{
                $(this).addClass('open');
            }
        }
       
    });
    // コンテンツ内のボタンをクリックの場合は、メニューをクローズ設定
    $('.sp-inner-nav .content-area .inner-main .btn01').on('click', function () {
        if(click) {
            click=false;
            setTimeout(function() {
              click = true;
            }, 10);//連続クリック制御
            if ($(this).parents('.content-area').prev('.inner-btn').hasClass('open')) {
                $(this).parents('.content-area').prev('.inner-btn').removeClass('open');
            }else{}
        }
    });
});

// ナビのドラワーにオープン時にコンテンツスクロールできないようにする
// $(function(){
//     var state = false;
//     var pos;
//     $('.sp-inner-nav .inner-btn').click(function(){
//     if (state == false) {
//         pos = $(window).scrollTop();
//         $('body').addClass('fixed').css({'top': -pos});
//         state = true;
//         } else {
//         $('body').removeClass('fixed').css({'top': 0});
//         window.scrollTo(0, pos);
//         state = false;
//       }
//     });
// });
// ここまで

// スムーズスクロール
$(function(){
  var headerHeight = $('.l-header').outerHeight(); /* ヘッダーの高さを取得 */
  $('a[href^="#"]').click(function() { /* ①クリックアクションを設定 */
    var speed = 600; /* ②スクロールの速さを指定 */
    var href= $(this).attr('href'); /* ③クリックするリンクの位置の値を取得 */
    var target = $(href == "#" || href == "" ? 'html' : href); /* ④スクロール先を取得 */
    var position = target.offset().top - headerHeight - 150; /* ⑤ヘッダーの高さを考慮してスクロール位置を設定 */
    $('body,html').animate({scrollTop: position}, speed, 'swing'); /* ⑥スクロールのアニメーション設定 */
    return false; /* ⑦falseを返し、URLに影響を与えないようにする */
  });
});

//  ここまで

$(document).ready(function() {
  // ウィンドウの幅を監視して、条件に応じてオプションを変更する
  function adjustWavifyOptions() {
    if ($(window).width() <= 470) { // ウィンドウの幅が470px以下の場合
      $('.wave').wavify({
        height: 90.135,
        bones: 7, // bones（波の数）を減らすなどの変更
        amplitude: 8, // amplitude（振幅）を減らすなどの変更
        color: '#F9D10C',
        speed: 0.15
      });
    } else { // ウィンドウの幅が470pxより大きい場合
      $('.wave').wavify({
        height: 90.135,
        bones: 20,
        amplitude: 30,
        color: '#F9D10C',
        speed: 0.15
      });
    }
  }

  // ページ読み込み時に初回実行
  adjustWavifyOptions();

  // ウィンドウサイズが変更されたときに実行
  $(window).resize(function() {
    adjustWavifyOptions();
  });
});



$(document).ready(function() {
  // ウィンドウの幅を監視して、条件に応じてオプションを変更する
  function adjustWavifyOptions() {
    if ($(window).width() <= 470) { // ウィンドウの幅が470px以下の場合
      $('.wave2').wavify({
        height: 90.135,
        bones: 7, // bones（波の数）を減らすなどの変更
        amplitude: 8, // amplitude（振幅）を減らすなどの変更
        color: '#FDF5D1',
        speed: 0.15,
        direction: 'reverse'
      });
    } else { // ウィンドウの幅が470pxより大きい場合
      $('.wave2').wavify({
        height: 90.135,
        bones: 20,
        amplitude: 30,
        color: '#FDF5D1',
        speed: 0.15,
        direction: 'reverse'
      });
    }
  }

  // ページ読み込み時に初回実行
  adjustWavifyOptions();

  // ウィンドウサイズが変更されたときに実行
  $(window).resize(function() {
    adjustWavifyOptions();
  });
});


$(function() {
  // ページ下部固定ボタン表示非表示
  $(window).on('load resize', function() {
    var btnOffset = $('.p-sns').offset().top;
    var winH = $(window).height();
    
    $(window).scroll(function() {
      if ($(this).scrollTop() > btnOffset - winH) {
        $('.p-bg-menu').fadeOut();
      } else {
        $('.p-bg-menu').fadeIn();
      }
    });
  });
});


gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".problem__image img").forEach(img => {
  gsap.from(img, {
    scrollTrigger: {
      trigger: img,
      start: 'center 70%',
      toggleActions: "play none none none",
      // markers: true,
    },
    duration: 1, // アニメーションの時間（秒）
    opacity: 1, // 初期透明度
    bottom: "-150px", // 初期位置
    ease: "power1.out", // イージング
    onComplete: function() { img.style.bottom = "0px"; } // アニメーション完了後にbottomを0に設定
  });
});