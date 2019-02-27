"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.function.name");

var _CreateBlueprint = _interopRequireDefault(require("./Blueprints/CreateBlueprint"));

var _AlertBlueprint = _interopRequireDefault(require("./Blueprints/AlertBlueprint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BaseMigration =
/*#__PURE__*/
function () {
  function BaseMigration() {
    _classCallCheck(this, BaseMigration);

    this.blueprints = [];
  }
  /**
   * Method for the user to overwrite. It will be called by execute when the
   * migration is migrated.
   */


  _createClass(BaseMigration, [{
    key: "migrate",
    value: function migrate() {
      throw new Error('Migration not implemented');
    }
    /**
     * Create an existing table, returns a callback with the blueprint
     * for the user to edit.
     * @param schemaName
     * @param callable
     */

  }, {
    key: "create",
    value: function create(schemaName, callable) {
      var blueprint = new _CreateBlueprint.default(schemaName);
      callable(blueprint);
      this.blueprints.push(blueprint);
    }
    /**
     * Alter an existing table, returns a callback with the blueprint
     * for the user to edit.
     * @param schemaName
     * @param callable
     */

  }, {
    key: "alter",
    value: function alter(schemaName, callable) {
      var blueprint = new _AlertBlueprint.default(schemaName);
      callable(blueprint);
      this.blueprints.push(blueprint);
    }
    /**
     * After the statement has been executed, insert the class name into the
     * migrations table so the migration is not reran.
     * @param transaction
     */

  }, {
    key: "insertMigrationRow",
    value: function insertMigrationRow(transaction) {
      transaction.executeSql('INSERT INTO migrations (migration_name) values (?)', [this.constructor.name]);
    }
    /**
     * Called when the migration is being migrated. The migrate method is called to
     * build the blueprints from the user input. All blueprints are then turned into
     * SQL statements and executed in the transaction.
     * @param transaction
     */

  }, {
    key: "execute",
    value: function execute(transaction) {
      var sqlStatement = '';
      this.migrate();
      this.blueprints.forEach(function (blueprint) {
        sqlStatement += blueprint.getSQL();
      });
      transaction.executeSql(sqlStatement);
      this.insertMigrationRow(transaction);
    }
  }]);

  return BaseMigration;
}();

exports.default = BaseMigration;