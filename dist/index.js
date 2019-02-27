"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ExpoMigration", {
  enumerable: true,
  get: function get() {
    return _ExpoMigration.default;
  }
});
Object.defineProperty(exports, "BaseMigration", {
  enumerable: true,
  get: function get() {
    return _BaseMigration.default;
  }
});

var _ExpoMigration = _interopRequireDefault(require("ExpoMigration"));

var _BaseMigration = _interopRequireDefault(require("BaseMigration"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }