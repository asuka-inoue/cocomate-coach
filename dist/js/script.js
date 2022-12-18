
jQuery(function ($) {
  var appear = false;
  var mainPos = $(".p-main-view").height();
  var cvBtn = $('.js-cv-btn');
    $(window).scroll(function () {
      if ($(window).scrollTop() > mainPos) {
        if (appear == false) {
          appear = true;
          cvBtn.stop().animate({
            'bottom': '30px' 
          }, 300); 
        }
      } else {
        if (appear) {
          appear = false;
          cvBtn.stop().animate({
            'bottom': '-200px' 
          }, 300); 
        }
      }
      scrollHeight = $(document).height(); //ドキュメントの高さ 
        scrollPosition = $(window).height() + $(window).scrollTop(); //現在地 
        footHeight = $('footer').innerHeight(); //footerの高さ（＝止めたい位置）
        if ( scrollHeight - scrollPosition  <= footHeight ) { //ドキュメントの高さと現在地の差がfooterの高さ以下になったら
            $('.js-cv-btn').css({
                'position':'absolute', //pisitionをabsolute（親：wrapperからの絶対値）に変更
                'bottom': footHeight - 180 //下からfooterの高さ - 180px上げた位置に配置
            });
        } else { //それ以外の場合は
            $('.js-cv-btn').css({
                'position':'fixed', //固定表示
                'bottom': '30px' //下から20px上げた位置に
            });
        }
  });


  // スムーススクロール (絶対パスのリンク先が現在のページであった場合でも作動。ヘッダーの高さ考慮。)
  $(document).on('click', 'a[href*="#"]', function () {
    let time = 400;
    let header = $('header').innerHeight();
    let target = $(this.hash);
    if (!target.length) return;
    let targetY = target.offset().top - header;
    $('html,body').animate({ scrollTop: targetY }, time, 'swing');
    return false;
  });


  // ハンバーガーメニュー
  $('.js-hamburger').click(function () {
    $(this).toggleClass('is-active');
    if ($(this).hasClass('is-active')) {
      $(".js-drawer").addClass("is-active");
      $("body").toggleClass("noscroll");
    } else {
      $(".js-drawer").removeClass("is-active");
    }
  });

  $(".js-drawer a").click(function () {
    $(".js-hamburger,.js-drawer").removeClass("is-active");
  });
  


  // スライダー
  let mySwiper = new Swiper('.js-swiper', {
    loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  // デフォルトの設定
  slidesPerView: 1,
  spaceBetween: 26,

  //ナビゲーションボタン（矢印）表示の設定
  navigation: { 
    nextEl: '.swiper-button-next', //「次へボタン」要素の指定
    prevEl: '.swiper-button-prev', //「前へボタン」要素の指定
  },
  
  // レスポンシブブレーポイント（画面幅による設定）
  breakpoints: {
    // 画面幅が 768px 以上の場合（window width >= 768px）
    768: {
      slidesPerView: 2,
      spaceBetween: 30
    },
  },
  });

  // スクロールヒント
  window.onload = function() {
    new ScrollHint('.js-scroll');
}

//アコーディオン
$('.js-accordion-btn').on('click', function() {//タイトル要素をクリックしたら
  $('.js-accordion-content').slideUp(500);//クラス名.js-accordion-contentがついたすべてのアコーディオンを閉じる
    
  var findElm = $(this).next('.js-accordion-content');//タイトル直後のアコーディオンを行うエリアを取得
    
  if($(this).hasClass('open')){//タイトル要素にクラス名openがあれば
    $(this).removeClass('open');//クラス名を除去    
  }else{//それ以外は
    $('.open').removeClass('open'); //クラス名openを全て除去した後
    $(this).addClass('open');//クリックしたタイトルにクラス名openを付与し
    $(findElm).slideDown(500);//アコーディオンを開く
  }
});

//ページが読み込まれた際にopenクラスをつけ、openがついていたら開く動作
$(window).on('load', function(){
  $('.p-accordion__item:first-child .js-accordion-btn').addClass('open'); //はじめのp-accordion__itemにある.js-accordion-btnにopenクラスを追加    
  $('.p-accordion__item:first-child .js-accordion-content').slideDown(500);//アコーディオンを開く
  });


});
