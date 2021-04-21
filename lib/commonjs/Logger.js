"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _XHRInterceptor = _interopRequireDefault(require("react-native/Libraries/Network/XHRInterceptor"));

var _NetworkRequestInfo = _interopRequireDefault(require("./NetworkRequestInfo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let nextXHRId = 0;

class Logger {
  constructor() {
    _defineProperty(this, "requests", []);

    _defineProperty(this, "xhrIdMap", {});

    _defineProperty(this, "maxRequests", 500);

    _defineProperty(this, "callback", requests => {});

    _defineProperty(this, "setCallback", callback => {
      this.callback = callback;
    });

    _defineProperty(this, "getRequest", xhrIndex => {
      if (xhrIndex === undefined) return undefined;
      const requestIndex = this.requests.length - this.xhrIdMap[xhrIndex] - 1;
      return this.requests[requestIndex];
    });

    _defineProperty(this, "updateRequest", (index, update) => {
      const networkInfo = this.getRequest(index);
      if (!networkInfo) return;
      Object.assign(networkInfo, update);
    });

    _defineProperty(this, "openCallback", (method, url, xhr) => {
      xhr._index = nextXHRId++;
      const xhrIndex = this.requests.length;
      this.xhrIdMap[xhr._index] = xhrIndex;
      const newRequest = new _NetworkRequestInfo.default(`${nextXHRId}`, 'XMLHttpRequest', method, url);

      if (this.requests.length >= this.maxRequests) {
        this.requests.pop();
      }

      this.requests.unshift(newRequest);
    });

    _defineProperty(this, "requestHeadersCallback", (header, value, xhr) => {
      const networkInfo = this.getRequest(xhr._index);
      if (!networkInfo) return;
      networkInfo.requestHeaders[header] = value;
    });

    _defineProperty(this, "headerReceivedCallback", (responseContentType, responseSize, responseHeaders, xhr) => {
      this.updateRequest(xhr._index, {
        responseContentType,
        responseSize,
        responseHeaders: xhr.responseHeaders
      });
    });

    _defineProperty(this, "sendCallback", (data, xhr) => {
      this.updateRequest(xhr._index, {
        startTime: Date.now(),
        dataSent: data
      });
      this.callback(this.requests);
    });

    _defineProperty(this, "responseCallback", (status, timeout, response, responseURL, responseType, xhr) => {
      this.updateRequest(xhr._index, {
        endTime: Date.now(),
        status,
        timeout,
        response,
        responseURL,
        responseType
      });
      this.callback(this.requests);
    });

    _defineProperty(this, "enableXHRInterception", options => {
      if (_XHRInterceptor.default.isInterceptorEnabled()) {
        return;
      }

      if ((options === null || options === void 0 ? void 0 : options.maxRequests) !== undefined) {
        if (typeof options.maxRequests !== 'number' || options.maxRequests < 1) {
          console.warn('react-native-network-logger: maxRequests must be a number greater than 0. The logger has not been started.');
          return;
        }

        this.maxRequests = options.maxRequests;
      }

      _XHRInterceptor.default.setOpenCallback(this.openCallback);

      _XHRInterceptor.default.setRequestHeaderCallback(this.requestHeadersCallback);

      _XHRInterceptor.default.setHeaderReceivedCallback(this.headerReceivedCallback);

      _XHRInterceptor.default.setSendCallback(this.sendCallback);

      _XHRInterceptor.default.setResponseCallback(this.responseCallback);

      _XHRInterceptor.default.enableInterception();
    });

    _defineProperty(this, "getRequests", () => {
      return this.requests;
    });

    _defineProperty(this, "clearRequests", () => {
      this.requests = [];
      this.callback(this.requests);
    });
  }

}

exports.default = Logger;
//# sourceMappingURL=Logger.js.map