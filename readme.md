# load-fb-sdk
Small wrapper to load the Facebook JavaScript SDK.

## Install
`npm install load-fb-sdk`

## Usage
```js
var loadFbSdk = require('load-fb-sdk');
var fbInitOpts = {
  appId: YOUR_FB_APP_ID,
  version: 'v2.5',
  ...
};

// This must be set before running loadFbSdk() the first time.
window.__LOAD_FB_SDK = fbInitOpts;
loadFbSdk(function (err, FB) {
  if (err) {
    return console.log(err);
  }
  // Do stuff with the Facbeook JS SDK.
});

```

See [FB JS SDK documentation](https://developers.facebook.com/docs/javascript/reference/FB.init) for more details about the options and api.
