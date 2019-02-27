import BaseBlueprint from './BaseBlueprint';
import Column from "./Column";

export default class AlertBlueprint extends BaseBlueprint{
    text(columnName, nullable = true){
        const column = new Column(columnName, 'TEXT');
        this.columns.push(column)
        return column;
    }

    integer(columnName, nullable = true){
        const column = new Column(columnName, 'INTEGER');
        this.columns.push(column)
        return column;
    }

    real(columnName, nullable = true){
        const column = new Column(columnName, 'REAL');
        this.columns.push(column)
        return column;
    }

    getSQL() {
        let sqlStatement = '';

        this.columns.forEach(column => {
            sqlStatement += `ALTER TABLE ${this.schemaName} ADD COLUMN ${column.name} ${column.type}${column.constraints}; `;
        });

        return sqlStatement;
    }
}