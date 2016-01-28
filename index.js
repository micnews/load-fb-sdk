'use strict';

var _FB;
var callbacks = [];

module.exports = function (callback) {
  if (_FB) {
    return process.nextTick(function () {
      callback(null, _FB);
    });
  }

  callbacks.push(callback);

  var initOpts = window.__LOAD_FB_SDK;

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
  };

 (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
};
