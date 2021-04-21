function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import XHRInterceptor from 'react-native/Libraries/Network/XHRInterceptor';
import NetworkRequestInfo from './NetworkRequestInfo';
let nextXHRId = 0;
export default class Logger {
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
      const newRequest = new NetworkRequestInfo(`${nextXHRId}`, 'XMLHttpRequest', method, url);

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
      if (XHRInterceptor.isInterceptorEnabled()) {
        return;
      }

      if ((options === null || options === void 0 ? void 0 : options.maxRequests) !== undefined) {
        if (typeof options.maxRequests !== 'number' || options.maxRequests < 1) {
          console.warn('react-native-network-logger: maxRequests must be a number greater than 0. The logger has not been started.');
          return;
        }

        this.maxRequests = options.maxRequests;
      }

      XHRInterceptor.setOpenCallback(this.openCallback);
      XHRInterceptor.setRequestHeaderCallback(this.requestHeadersCallback);
      XHRInterceptor.setHeaderReceivedCallback(this.headerReceivedCallback);
      XHRInterceptor.setSendCallback(this.sendCallback);
      XHRInterceptor.setResponseCallback(this.responseCallback);
      XHRInterceptor.enableInterception();
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
//# sourceMappingURL=Logger.js.map