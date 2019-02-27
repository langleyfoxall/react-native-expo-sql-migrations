import BaseBlueprint from './BaseBlueprint';

export default class CreateBlueprint extends BaseBlueprint{
    text(columnName, nullable = false){
        this.columns.push({
            name: columnName,
            type: 'TEXT',
            nullable,
        })
    }

    integer(columnName, nullable = false){
        this.columns.push({
            name: columnName,
            type: 'INTEGER',
            nullable,
        })
    }

    real(columnName, nullable = false){
        this.columns.push({
            name: columnName,
            type: 'REAL',
            nullable,
        })
    }

    blob(columnName, nullable = false){
        this.columns.push({
            name: columnName,
            type: 'BLOB',
            nullable,
        })
    }

    getInnerSQL(){
        let innerSqlString = '';
        const finalIndex = this.columns.length - 1;

        this.columns.forEach((column, index) => {
            innerSqlString += `${column.name} ${column.type}${column.nullable ? '' : ' NOT NULL'}`;

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