import BaseBlueprint from './BaseBlueprint';
import Column from './Column';

export default class CreateBlueprint extends BaseBlueprint{
    text(columnName) {
        const column = new Column(columnName, 'TEXT');

        this.columns.push(column);

        return column;
    }

    integer(columnName) {
        const column = new Column(columnName, 'INTEGER');

        this.columns.push(column);

        return column;
    }

    real(columnName) {
        const column = new Column(columnName, 'REAL');

        this.columns.push(column);

        return column;
    }

    getInnerSQL() {
        let innerSqlString = '';
        const finalIndex = this.columns.length - 1;

        this.columns.forEach((column, index) => {
            innerSqlString += `${column.name} ${column.type}${column.constraints}`;

            if(index !== finalIndex){
                innerSqlString += ', ';
            }
        });

        return innerSqlString;
    }

    getSQL() {
        return `CREATE TABLE ${this.schemaName} ( ${this.getInnerSQL()} ); `;
    }
}