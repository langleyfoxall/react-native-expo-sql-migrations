"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.some");

require("core-js/modules/es6.function.name");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.promise");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ExpoMigration =
/*#__PURE__*/
function () {
  function ExpoMigration(database) {
    _classCallCheck(this, ExpoMigration);

    this.database = database;
    this.completedMigrations = [];
  }
  /**
   * Create the migrations table if it doesn't exist and find all completed migrations.
   * @returns {Promise<any>}
   */


  _createClass(ExpoMigration, [{
    key: "init",
    value: function init() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.database.transaction(function (transaction) {
          transaction.executeSql('CREATE TABLE IF NOT EXISTS migrations (id integer primary key not null, migration_name text);');
          transaction.executeSql('select * from migrations', [], function (_, _ref) {
            var rows = _ref.rows;
            return _this.completedMigrations = rows._array;
          });
        }, reject, resolve);
      });
    }
    /**
     * Run migrations that are yet to run. All migrations are ran in
     * one transaction so if one fails all will rollback
     * @param migrations
     * @returns {Promise<any>}
     */

  }, {
    key: "migrate",
    value: function migrate(migrations) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.database.transaction(function (transaction) {
          migrations.forEach(function (migration) {
            var migrationInstance = new migration();
            var migrationName = migrationInstance.constructor.name;

            var alreadyMigrated = _this2.completedMigrations.some(function (completedMigration) {
              return completedMigration.migration_name === migrationName;
            });

            if (alreadyMigrated) {
              console.log("Skipping Migration ".concat(migrationName));
            } else {
              console.log("Migrating ".concat(migrationName));
              migrationInstance.execute(transaction);
            }
          });
        }, reject, resolve);
      });
    }
  }]);

  return ExpoMigration;
}();

exports.default = ExpoMigration;