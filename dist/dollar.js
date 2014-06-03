(function(root, undefined) {

  "use strict";


/* dollar main */

// Base function.
var dollar = function (s) {

  var bindUtils = function ($) {
    var _each = function(obj, handler) {
      if (obj.constructor.name == 'NodeList') {
        for (var i = 0; i < obj.length; i++) {
          handler(obj[i], i);
        }
      } else {
        handler(obj);
      }
      return obj;
    };

    $.on = function (eventName, eventHandler) {
      this.addEventListener(eventName, eventHandler);
    };
    $.fadeIn = function (duration, callback) {
      var el = this;
      el.style.opacity = 0;

      var last = +new Date();
      var tick = function () {
        el.style.opacity = +el.style.opacity + (new Date() - last) / duration;
        last = +new Date();

        if (+el.style.opacity < 1) {
          if (root.requestAnimationFrame) {
            root.requestAnimationFrame(tick);
          } else {
            setTimeout(tick, 16);
          }
        } else {
          if (callback) {
            callback();
          }
        }
      };

      tick();
    };
    $.hide = function () {
      return _each(this, function(el) {
        el.style.display = 'none';
      });
    };
    $.show = function () {
      return _each(this, function(el) {
        el.style.display = '';
      });
    };
    $.addClass = function(className) {
      return _each(this, function(el) {
        if (el.classList) {
          el.classList.add(className);
        }
        else {
          el.className += ' ' + className;
        }
      });
    };
    $.find = function(selector) {
      return bindUtils(this.querySelectorAll(selector));
    };
    return $;
  };

  if (s) {
    if (typeof s == 'function') {
      root.document.addEventListener('DOMContentLoaded', s);
    } else if (typeof s == 'object') {
      return bindUtils(s);
    } else {
      var result = root.document.querySelectorAll(s);
      return bindUtils(result);
    }
  }
};

dollar.ajax = function () {

};

// Version.
dollar.VERSION = '0.0.0';


// Export to the root, which is probably `window`.
root.dollar = dollar;
if (!root.$) {
  root.$ = dollar;
}


}(this));
