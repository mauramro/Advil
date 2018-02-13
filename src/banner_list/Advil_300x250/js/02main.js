'use strict';

/**
 *
 * Main Application
 *
 **/

function App_banner() {
  if (App_banner.instance !== undefined) {
    return App_banner.instance;
  } else {
    App_banner.instance = this;
  }
  LTApp.call(this);
  return App_banner.instance;
}
App_banner.prototype = new LTApp();
App_banner.fn = App_banner.prototype;

/**
 *
 * Singleton thing
 *
 **/
App_banner.getInstance = function() {
  if (App_banner.instance === undefined) {
    new App_banner();
  }
  return App_banner.instance;
}

/**
 *
 * Initialize your app, surcharge with whatever needed
 *
 **/
App_banner.fn.init = function() {
  if (!this.INITED) {
    this.INITED = true;

    /**
     * Add the images url you want to preload in the empty array on the first parameter
     */
    this.preload([], this.display.bind(this));
  }
};

/**
 *
 * shows everything, start animating
 *
 **/
App_banner.fn.display = function() {
  this.steps = $('.step');
  this.goTo(1);
  $('body').removeClass('loading');
  $('body').addClass('loaded');
};

/**
 *
 * Display the given step
 *
 */
App_banner.fn.goTo = function(stepNumber) {
  this.steps.each(function(i, el) {
    var $el = $(el);

    if ($el.data('order') == stepNumber) {
      $('.step-active').removeClass('step-active');
      $el.addClass('step-active');
    }
  });

  if (this['step' + stepNumber]) {
    this['step' + stepNumber]();
  }
};

/**
 *
 * Display the given step
 *
 */

App_banner.fn.goToAndWait = function(stepNumber, seconds) {
  this.steps.each(function(i, el) {
    var $el = $(el);
    var $old;

    if ($el.data('order') == stepNumber) {
      $old = $('.step-active');
      $el.addClass('step-active');

      setTimeout(function() {
        $old.removeClass('step-active');
      }, seconds);
    }
  });

  if (this['step' + stepNumber]) {
    this['step' + stepNumber]();
  }
};


App_banner.fn.step1 = function() {

  // Variables
  var tl          = new TimelineMax(),
      frame1      = $("#frame1"),
      frame3        = $("#frame3"),
      frame4        = $("#frame4"),
      otc_text      = $("#otc"),
      frame7        = $("#frame7"),
      frame8        = $("#frame8");


  //Assign timeline to window to be able to test.
  window.tl = tl;

  //
  //Timeline Animation
  //
  
    // Frame 1-2
  tl.addLabel('frame1')
    .fromTo(frame1, 1, {x: -500}, {x: 400}, 'frame1')
    // Frame 3
    .addLabel('frame3')
    .from(frame3, 1.5, {autoAlpha: 0}, 'frame3')
    .to(frame3, 1, {autoAlpha: 0})
    // Frame 4-6
    .addLabel('frame4')
    .to(otc_text, 0.6, {autoAlpha: 1}, 'frame4')
    .from(frame4, 1, {x:500}, 'frame4')
    .to([frame4, otc_text], 1, {autoAlpha: 0, delay: 2.5})
    // Frame 7
    .addLabel('frame7')
    .from(frame7, 1.5, {autoAlpha:0}, 'frame7')
    .to(frame7, 1, {autoAlpha: 0, delay: 1})
    // Frame 8
    .addLabel('frame8')
    .from(frame8, 1, {autoAlpha: 0}, 'frame8')

    // console.log(tl.duration());
    
  // Exits Listeners
  $('#main-panel').on('click', App_banner.fn.mainExitHandler);
  $('#more-facts').on('click', App_banner.fn.moreFactsExitHandler);

};

//Main Exit Handler
App_banner.fn.mainExitHandler = function(e) {
  e.preventDefault();
  Enabler.exit('Main Exit','https://www.advil.com/advil');
}
// More Facts Exit handler
App_banner.fn.moreFactsExitHandler = function(e) {
  e.preventDefault();
  e.stopPropagation();
  Enabler.exit('More facts','https://www.advilaide.com/drug-facts');
}
