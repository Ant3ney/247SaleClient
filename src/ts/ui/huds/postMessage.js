const cookie = require('cookiejs');

let postMessage = {
    test: (msg) => {
        if(!window.ReactNativeWebView){
            return;
        }
        var message = window.auth || "No auth cookie found";

        if(msg){
            window.ReactNativeWebView.postMessage(msg);
        }
        return message;
    },
    sendAuthRequest: (req) => {
        window.ReactNativeWebView.postMessage(req);
    },
    send: (msg) => {
        if(window.ReactNativeWebView){
            window.ReactNativeWebView.postMessage(msg);
        }
    }
}
export default postMessage;