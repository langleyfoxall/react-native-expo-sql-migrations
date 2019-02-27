export default class Column {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.constrains = '';
    }

    primary(){
        this.constrains += ' PRIMARY KEY';
        return this;
    }

    unique(){
        this.constrains += ' UNIQUE';
        return this;
    }

    required(){
        this.constrains += ' NOT NULL';
        return this;
    }
}