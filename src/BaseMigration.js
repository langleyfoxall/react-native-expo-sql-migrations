import CreateBlueprint from './Blueprints/CreateBlueprint';
import AlterBlueprint from './Blueprints/AlertBlueprint';

export default class BaseMigration {

    constructor(){
        this.blueprints = [];
    }

    /**
     * Method for the user to overwrite. It will be called by execute when the
     * migration is migrated.
     */
    migrate() {
        throw new Error('Migration not implemented');
    }

    /**
     * Create an existing table, returns a callback with the blueprint
     * for the user to edit.
     * @param schemaName
     * @param callable
     */
    create(schemaName, callable){
        const blueprint = new CreateBlueprint(schemaName);
        callable(blueprint);

        this.blueprints.push(blueprint);
    }

    /**
     * Alter an existing table, returns a callback with the blueprint
     * for the user to edit.
     * @param schemaName
     * @param callable
     */
    alter(schemaName, callable){
        const blueprint = new AlterBlueprint(schemaName);
        callable(blueprint);

        this.blueprints.push(blueprint);
    }

    /**
     * After the statement has been executed, insert the class name into the
     * migrations table so the migration is not reran.
     * @param transaction
     */
    insertMigrationRow(transaction){
        transaction.executeSql('INSERT INTO migrations (migration_name) values (?)', [this.constructor.name])
    }

    /**
     * Called when the migration is being migrated. The migrate method is called to
     * build the blueprints from the user input. All blueprints are then turned into
     * SQL statements and executed in the transaction.
     * @param transaction
     */
    execute(transaction){
        let sqlStatement = '';
        this.migrate();

        this.blueprints.forEach(blueprint => {
            sqlStatement += blueprint.getSQL();
        });

        transaction.executeSql(sqlStatement);
        this.insertMigrationRow(transaction);
    }
}