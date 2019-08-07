import BaseBlueprint from './BaseBlueprint';
import Column from './Column';

export default class AlterBlueprint extends BaseBlueprint {
    text(columnName){
        const column = new Column(columnName, 'TEXT');

        this.columns.push(column);

        return column;
    }

    integer(columnName){
        const column = new Column(columnName, 'INTEGER');

        this.columns.push(column);

        return column;
    }

    real(columnName){
        const column = new Column(columnName, 'REAL');

        this.columns.push(column);

        return column;
    }

    getSQL() {
        return (
            this.columns
                .map(column => (
                    `ALTER TABLE ${this.schemaName} ADD COLUMN ${column.name} ${column.type}${column.constraints}; `
                ))
                .join('')
        );
    }
}