'use strict';

var _FB;
var callbacks = [];

module.exports = function (callback) {
  if (_FB) {
    return process.nextTick(function () {
      callback(_FB);
    });
  }

  callbacks.push(callback);

  var initOpts = window.__LOAD_FB_SDK;

  window.fbAsyncInit = function() {
    _FB = window.FB;
    _FB.init(initOpts);

    callbacks.forEach(function (_callback) {
      _callback(_FB);
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
