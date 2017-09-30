$(document).ready(function(){
  console.log('Start rock!');
  
  // INIT CAROUSELS
//  $(".main-crsl").owlCarousel({
//    loop: true,
//    items: 1,
//    nav: true,
//    autoplay: true,
//    autoplayTimeout: 10000
//  });

  // FANCY MODALS
//  $('.js-consult').on('click', function() {
//    $.fancybox.open({src: '#consulting'});
//  });
  
  // ANCHOR SCROLL
//  if($('.js-anchor').length) {
//    $('.js-anchor').click(function(e) {
//      e.preventDefault();
//      var id  = $(this).attr('href'),
//      top = $(id).offset().top - 100;
//      $('body,html').animate({scrollTop: top}, 1000);
//    });
//  }
  
  // TABS
//  $('.tabs__item').on('click', function() {
//    $(this).addClass('tabs__item_active').siblings().removeClass('tabs__item_active');
//    $(this).closest('.tabs').find('.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
//  });
  
  
  /*---------------
      #Masks
  ---------------*/
  window.sitename = {};
  
  window.sitename.form = ({
    
    init: function(){
      
      var _th = this;

      
      $('form').submit(function(){
                if (!_th.checkForm($(this))) {
                  return false
                }
            });
    },
    
    checkForm: function(form){
      var checkResult = true;
      form.find('.warning').removeClass('warning');
      form.find('input, textarea, select').each(function(){
        if ($(this).data('req')){
          switch($(this).data('type')){
            case 'tel':
              var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
              if (!re.test($(this).val())){
                  $(this).addClass('warning');
                  checkResult = false;
              }
              break;
          case 'email':
              var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
              if (!re.test($(this).val())){
                  $(this).addClass('warning');
                  checkResult = false;
              }
              break;
          default:
          if ($.trim($(this).val()) === ''){
            $(this).addClass('warning');
                            checkResult = false;
                        }
                        break;
                }
             }
      });
      if ($('.checkbox_front').length) {
        if (!$('.checkbox_front').is(':checked')) {
          $('.checkbox_front').addClass('warning');
          checkResult = false;
        }
      }
      return checkResult;
    }
    
  }).init();


});

