"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.function.name");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

var _BaseBlueprint2 = _interopRequireDefault(require("./BaseBlueprint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AlertBlueprint =
/*#__PURE__*/
function (_BaseBlueprint) {
  _inherits(AlertBlueprint, _BaseBlueprint);

  function AlertBlueprint() {
    _classCallCheck(this, AlertBlueprint);

    return _possibleConstructorReturn(this, _getPrototypeOf(AlertBlueprint).apply(this, arguments));
  }

  _createClass(AlertBlueprint, [{
    key: "text",
    value: function text(columnName) {
      var nullable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.columns.push({
        name: columnName,
        type: 'TEXT ',
        method: 'ADD',
        nullable: nullable
      });
    }
  }, {
    key: "integer",
    value: function integer(columnName) {
      var nullable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.columns.push({
        name: columnName,
        type: 'INTEGER',
        method: 'ADD',
        nullable: nullable
      });
    }
  }, {
    key: "real",
    value: function real(columnName) {
      var nullable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.columns.push({
        name: columnName,
        type: 'REAL',
        method: 'ADD',
        nullable: nullable
      });
    }
  }, {
    key: "blob",
    value: function blob(columnName) {
      var nullable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.columns.push({
        name: columnName,
        type: 'BLOB',
        method: 'ADD',
        nullable: nullable
      });
    }
  }, {
    key: "getSQL",
    value: function getSQL() {
      var _this = this;

      var sqlStatement = '';
      this.columns.forEach(function (column) {
        sqlStatement += "ALTER TABLE ".concat(_this.schemaName, " ").concat(column.method, " ").concat(column.name, " ").concat(column.type).concat(column.nullable ? '' : ' NOT NULL', "; ");
      });
      return sqlStatement;
    }
  }]);

  return AlertBlueprint;
}(_BaseBlueprint2.default);

exports.default = AlertBlueprint;