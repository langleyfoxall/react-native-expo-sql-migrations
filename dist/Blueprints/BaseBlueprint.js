"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BaseBlueprint =
/*#__PURE__*/
function () {
  function BaseBlueprint(schemaName) {
    _classCallCheck(this, BaseBlueprint);

    this.schemaName = schemaName;
    this.columns = [];
  }

  _createClass(BaseBlueprint, [{
    key: "getSQL",
    value: function getSQL() {
      throw new Error('getSQL not implemented');
    }
  }]);

  return BaseBlueprint;
}();

exports.default = BaseBlueprint;