/*!
 * howFast v1.0
 * TODO: Github url
 *
 * Copyright 2018 Andrew Ckor Ltd. and other contributors
 * Released under the Apache License 2.0
 *
 * Date: March 14, 2018
 */

howFast = function (selector, options) {
  
  // Save this to return it
  var parent = this;

  // Setup functions
  var methods = {

    init: function (options) {

      var defaults = {
        listener          :  'keyup', // startCountOn
        listenerReset     :  'blur',  // stopCountOn
        defaultDuration   :  250,
        minDuration       :  250,
        maxDuration       :  3500,
        resetAfter        :  100,     // Times
        selector          : 'input',
        rounder           :  50
      }

      // Set default options
      var o              =  defaults,
          prevTime       =  0;

      // Override default options
      for (var property in options) {
        if (options.hasOwnProperty(property)) {
            o[property] = options[property]
        }
      }

      // Get Settings on startup
      settings = methods.getSettings();
      
      // Update public settings
      methods.settings = settings;

      function keyIsAllowed(key) {
        // 8       | Backspace
        // 32      | Space
        // 48 - 90 | All characters
        if (key == 8 || key == 32 || key >= 48 && key <= 90) {
          return true
        } else {
          return false;
        }
      }

      function timeRounding(amount, rounder) {
        rounder = rounder || o.rounder;
        if (amount % rounder  == 0){
            return amount
        } else {
            less = amount % rounder
            return amount - less + rounder
        }
      }

      /**
       * (Internal) Setup the listeners for the element 
       * that tracks the key bindings.
       */
      

      function bindSelectors() {
        document.querySelectorAll(o.selector).forEach(function(element){
          if (!!!element.getAttribute('data-howFast-enabled')) {
            
            // Enable the input
            element.setAttribute('data-howFast-enabled', true);

            // Bind typing input
            o.listener.split(' ').forEach(function(event){
              element.addEventListener(event, function(e){
                if (keyIsAllowed(e.keyCode)) {
                  var currentTime = new Date().getTime(),
                      elapsedTime = 0;
  
                  // Update total key presses
                  settings.times++
  
                  // DELETE: Update total key presses
                  document.querySelector('.js-total-keys').value = settings.times;
  
                  if (prevTime == 0) {
                    // Calculate elapsed time
                    elapsedTime = o.defaultDuration
                  } else {
                    // Calculate elapsed time
                    elapsedTime = currentTime - prevTime;
                  }
  
                  // Set max time
                  if (elapsedTime < o.minDuration) {
                    elapsedTime =  o.minDuration
                  } else if (elapsedTime > o.maxDuration) {
                    elapsedTime =  o.maxDuration
                  }
                  
                  // DELETE: Update elapsed time
                  document.querySelector('.js-inbetween-time').value = elapsedTime;

                  // Update elapsed time
                  prevTime = currentTime;
  
                  // Update total duration
                  settings.total += elapsedTime;
  
                  // Update average time
                  settings.speed = timeRounding(parseInt(settings.total/settings.times));
                  
                  // DELETE:
                  document.querySelector('.js-average-time').value = settings.speed;
  
                  // Reset counters if needed
                  if (settings.times >= o.resetAfter) {
                    settings.times = 0;
                    settings.total = 0;
                  }
  
                  // Save current settings on browser
                  methods.setSettings(settings);
  
                  //console.log(settings);
                }
              });
            });

            // Unbind counting
            o.listenerReset.split(' ').forEach(function(event){
              element.addEventListener(event, function(e){
                prevTime = 0;
              });
            });
          }
        });
      }

      // Bind howFast
      bindSelectors();

    }, // End of init

    settings: {
      total   : 250,
      times      : 1,
      time : 250
    },

    getSettings: function (){
      var self = this;

      // Gets the saved settings from localStorage or cookie
      if (localStorage) {
        if (localStorage.getItem("hfSettings")) {
          return JSON.parse(localStorage.getItem("hfSettings"));
        } else {
          return self.settings;
        }
      }
    },

    setSettings: function(settings) {
      var self = this;

      // Update live settings object
      self.settings = settings;

      // Stringify settings for cookie
      var settings = JSON.stringify(settings);

      // Gets the saved settings from localStorage or cookie
      if (localStorage) {

        if (localStorage.hfSettings) {
          localStorage.hfSettings = settings;
        } else {
          localStorage.setItem("hfSettings", settings);
        }

      }
    }

  };

  if (typeof selector === 'string' && typeof options === "object") {
    options.selector = selector;
  } else if (typeof selector === 'string') {
    options = { selector: selector };
  } else {
    options = {}
  }

  // Initialize the instance
  methods.init(options);

  // Return the instance
  return methods.settings;
};