function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import BlobFileReader from 'react-native/Libraries/Blob/FileReader';
import fromEntries from './utils/fromEntries';
export default class NetworkRequestInfo {
  constructor(id, type, method, url) {
    _defineProperty(this, "id", '');

    _defineProperty(this, "type", '');

    _defineProperty(this, "url", '');

    _defineProperty(this, "method", void 0);

    _defineProperty(this, "status", -1);

    _defineProperty(this, "dataSent", '');

    _defineProperty(this, "responseContentType", '');

    _defineProperty(this, "responseSize", 0);

    _defineProperty(this, "requestHeaders", {});

    _defineProperty(this, "responseHeaders", {});

    _defineProperty(this, "response", '');

    _defineProperty(this, "responseURL", '');

    _defineProperty(this, "responseType", '');

    _defineProperty(this, "timeout", 0);

    _defineProperty(this, "closeReason", '');

    _defineProperty(this, "messages", '');

    _defineProperty(this, "serverClose", undefined);

    _defineProperty(this, "serverError", undefined);

    _defineProperty(this, "startTime", 0);

    _defineProperty(this, "endTime", 0);

    this.id = id;
    this.type = type;
    this.method = method;
    this.url = url;
  }

  get duration() {
    return this.endTime - this.startTime;
  }

  get curlRequest() {
    let headersPart = this.requestHeaders && Object.entries(this.requestHeaders).map(([key, value]) => `'${key}: ${this.escapeQuotes(value)}'`).join(' -H ');
    headersPart = headersPart ? `-H ${headersPart}` : '';
    const body = this.dataSent && this.escapeQuotes(this.dataSent);
    const methodPart = this.method !== 'GET' ? `-X${this.method.toUpperCase()}` : '';
    const bodyPart = body ? `-d '${body}'` : '';
    const parts = ['curl', methodPart, headersPart, bodyPart, `'${this.url}'`];
    return parts.filter(Boolean).join(' ');
  }

  escapeQuotes(value) {
    var _value$replace;

    return (_value$replace = value.replace) === null || _value$replace === void 0 ? void 0 : _value$replace.call(value, /'/g, `\\'`);
  }

  stringifyFormat(data) {
    try {
      var _data$_parts;

      if (data !== null && data !== void 0 && (_data$_parts = data._parts) !== null && _data$_parts !== void 0 && _data$_parts.length) {
        return JSON.stringify(fromEntries(data === null || data === void 0 ? void 0 : data._parts), null, 2);
      }

      return JSON.stringify(JSON.parse(data), null, 2);
    } catch (e) {
      return `${data}`;
    }
  }

  getRequestBody() {
    return this.stringifyFormat(this.dataSent);
  }

  async parseResponseBlob() {
    const blobReader = new BlobFileReader();
    blobReader.readAsText(this.response);
    return await new Promise((resolve, reject) => {
      const handleError = () => reject(blobReader.error);

      blobReader.addEventListener('load', () => {
        resolve(blobReader.result);
      });
      blobReader.addEventListener('error', handleError);
      blobReader.addEventListener('abort', handleError);
    });
  }

  async getResponseBody() {
    const body = await (this.responseType !== 'blob' ? this.response : this.parseResponseBlob());
    return this.stringifyFormat(body);
  }

}
//# sourceMappingURL=NetworkRequestInfo.js.map