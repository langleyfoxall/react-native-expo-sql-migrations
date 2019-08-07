export default class Column {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.constraints = '';
    }

    primary() {
        this.constraints += ' PRIMARY KEY';

        return this;
    }

    unique() {
        this.constraints += ' UNIQUE';

        return this;
    }

    required() {
        this.constraints += ' NOT NULL';

        return this;
    }

    default(value) {
        if(typeof value === 'string') {
            value = `'${value}'`;
        }

        this.constraints += ` DEFAULT (${value})`;

        return this;
    }
}