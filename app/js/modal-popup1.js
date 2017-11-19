"use strict";
// window.onbeforeunload = function(){
//  return false;
//  }

// var m1 = new Modal('#main');

function Modal (sSelector) {
    var m = this;
    // 1. Data section
    m.main           = $(sSelector);
    m.backgroundMask = m.main.find('.background-mask');
    m.AllModalBox    = m.main.find('.modal-box');
    // 2. Logic section
    m.showModal = function (event) {
        event.preventDefault();
        var  CurrentModalDiv = $(this).attr('href')
            ,ScrollPosition  = $(window).scrollTop() + 100;
            ;
        // console.log(" scrolltop = " + ScrollPosition);
        if ( !$(this).hasClass("modal-show_disabled") ) {
            m.backgroundMask.fadeIn(400,
              function () {
                $(CurrentModalDiv).css('display', 'block')//.toggleClass('scale-in');
                .animate({
                  // top : ScrollPosition + 'px'
                  // top : 4 + 'vh'
                  opacity : 1
                  //,transform : 'scale('1')'
                }
                , 300
                , function () {
                  window["mcListScroll"].resize(); // outside var ! niceScroll for minicart list
                }
              );
            }
          );
        }else return;
      }
    m.closeModal = function (e) {
        e.preventDefault();
        m.AllModalBox.animate({
                            opacity: 0
                            ,top: 0
                            }
                            ,400
                            ,function(){
                                $(this).css('display', 'none');
                                m.backgroundMask.fadeOut(400);
                                // m.backgroundMask.fadeDown(400);
                                }
             );
        return false;
        }
    // 3. Evevnts section
    m.main.find('.modal-show').bind('click', m.showModal);
    // m.main.find('.modal-show, .btn_add-to-basket').bind('click', m.showModal);
    // $('.modal-show').bind('click', m.showModal);
    m.main.find('.modal-box__close-btn, .modal-box__close-lnk, .background-mask').bind('click', m.closeModal);
}
