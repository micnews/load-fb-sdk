'use strict';

var _FB;
var callbacks = [];

module.exports = function (callback) {
  _FB = _FB || window.FB;

  if (_FB) {
    return process.nextTick(function () {
      callback(null, _FB);
    });
  }

  callbacks.push(callback);

  // Avoid resetting fbAsyncInit multiple times
  if (callbacks.length > 1) {
    return;
  }

  var initOpts = window.__LOAD_FB_SDK;
  var prevAsyncInit = typeof window.fbAsyncInit === 'function'
    ? window.fbAsyncInit
    : null;

  window.fbAsyncInit = function() {
    try {
      window.FB.init(initOpts);
    } catch (e) {
      return callback(e);
    }

    _FB = window.FB;

    callbacks.forEach(function (_callback) {
      _callback(null, _FB);
    });

    // Call previous fbAsyncInit in the new stack
    if (prevAsyncInit) {
      setTimeout(prevAsyncInit, 1);
    }
  };

 (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
};
