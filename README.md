#Expo SQLite Migrations
Expo SQL migrations brings Eloquent like migrations to Expo's SQLite Module.

##Preparing the database
Expo SQLite Migrations uses the `migrations` table to track which migrations have been ran. To run migrations initialise the `ExpoMigration` class with the database object passed into the constructor. To prepare the migrations table call the `init` method on the `ExpoMigration` object. This will return a promise when the operation has completed.

```js
import { ExpoMigration } from '@langleyfoxall/react-native-expo-sql-migrations';

class ExampleComponent extends React.Component {
	constructor() {
		const db = SQLite.openDatabase('example');
		const migration = new ExpoMigration(db);
	
		migration.init().then(() => {
			console.log('Migration table initialised');
		}
	}
}
```

##Writing Migrations
The syntax for writing migrations is based on Eloquent. Migrations are classes that extend the `BaseMigration` class from the package. Logic for the migration is placed in the `migrate` function overriden from the base class.

###Creating tables
To create a table in a migration call `this.create` in the `migrate_function`. The first parameter on this parameter is the name of the table and the second parameter is a callback for the blueprint. To define columns on the blueprint call the respective method on the blueprint. For example `blueprint.text('name');` to create a text column called name on the table. The second parameter on these methods defines if the column is nullable, if it set to true the column is nullabke. By default columns in newly created tables are not nullable.

```js
import { BaseMigration } from '@langleyfoxall/react-native-expo-sql-migrations';

export default class example_migration extends BaseMigration{
    migrate(){
        this.create('crew', blueprint => {
            blueprint.text('name');
            blueprint.text('rank', true); // Nullable
            blueprint.integer('age');
            blueprint.real('stardate');
        })
    }
}
```

###Altering tables
To alter a table after it has been created you can call `this.alter` in the `migration` method. As with creation the first parameter in this method is the table name and the second parameter is the blueprint. By default columns added in the alter blueprints aren't nullable.

```js
import { BaseMigration } from '@langleyfoxall/react-native-expo-sql-migrations';

export default class example_migration_alter extends BaseMigration{
    migrate(){
        this.alter('crew', blueprint => {
            blueprint.text('species');
        })
    }
}
``` 