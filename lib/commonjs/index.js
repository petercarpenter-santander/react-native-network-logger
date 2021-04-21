"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _NetworkLogger.default;
  }
});
Object.defineProperty(exports, "getBackHandler", {
  enumerable: true,
  get: function () {
    return _backHandler.getBackHandler;
  }
});
Object.defineProperty(exports, "ThemeName", {
  enumerable: true,
  get: function () {
    return _theme.ThemeName;
  }
});
exports.clearRequests = exports.getRequests = exports.startNetworkLogging = void 0;

var _loggerSingleton = _interopRequireDefault(require("./loggerSingleton"));

var _NetworkLogger = _interopRequireDefault(require("./components/NetworkLogger"));

var _backHandler = require("./backHandler");

var _theme = require("./theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const startNetworkLogging = options => {
  _loggerSingleton.default.enableXHRInterception(options);
};

exports.startNetworkLogging = startNetworkLogging;

const getRequests = () => _loggerSingleton.default.getRequests();

exports.getRequests = getRequests;

const clearRequests = () => _loggerSingleton.default.clearRequests();

exports.clearRequests = clearRequests;
//# sourceMappingURL=index.js.map