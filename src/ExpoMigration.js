export default class ExpoMigration {
    constructor(database) {
        this.database = database;
        this.completedMigrations = [];
    }

    /**
     * Create the migrations table if it doesn't exist and find all completed migrations.
     * @returns {Promise<any>}
     */
    init() {
        return new Promise((resolve, reject) => {
            this.database.transaction(transaction => {
                    transaction.executeSql(
                        'CREATE TABLE IF NOT EXISTS migrations (id integer primary key not null, migration_name text);'
                    );
                    transaction.executeSql('select * from migrations', [], (_, { rows }) => this.completedMigrations = rows._array);
                },
                reject,
                resolve);
        })
    }

    /**
     * Run migrations that are yet to run. All migrations are ran in
     * one transaction so if one fails all will rollback
     * @param migrations
     * @returns {Promise<any>}
     */
    migrate(migrations) {
        return new Promise((resolve, reject) => {
            this.database.transaction(transaction => {
                    migrations.forEach(migration => {
                        const migrationInstance = new migration();
                        const migrationName = migrationInstance.constructor.name;
                        const alreadyMigrated = this.completedMigrations.some(completedMigration => {
                            return completedMigration.migration_name === migrationName;
                        });

                        if (alreadyMigrated) {
                            console.log(`Skipping Migration ${migrationName}`);
                        } else {
                            console.log(`Migrating ${migrationName}`);
                            migrationInstance.execute(transaction);
                        }
                    })
                },
                reject,
                resolve,
            );
        })
    }
}
