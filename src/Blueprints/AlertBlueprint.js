import BaseBlueprint from './BaseBlueprint';

export default class AlertBlueprint extends BaseBlueprint{
    text(columnName, nullable = true){
        this.columns.push({
            name: columnName,
            type: 'TEXT ',
            method: 'ADD',
            nullable,
        })
    }

    integer(columnName, nullable = true){
        this.columns.push({
            name: columnName,
            type: 'INTEGER',
            method: 'ADD',
            nullable,
        })
    }

    real(columnName, nullable = true){
        this.columns.push({
            name: columnName,
            type: 'REAL',
            method: 'ADD',
            nullable,
        })
    }

    blob(columnName, nullable = true){
        this.columns.push({
            name: columnName,
            type: 'BLOB',
            method: 'ADD',
            nullable,
        })
    }

    getSQL() {
        let sqlStatement = '';

        this.columns.forEach(column => {
            sqlStatement += `ALTER TABLE ${this.schemaName} ${column.method} ${column.name} ${column.type}${column.nullable ? '' : ' NOT NULL'}; `;
        });

        return sqlStatement;
    }
}