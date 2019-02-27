export default class BaseBlueprint {
    constructor(schemaName) {
        this.schemaName = schemaName;

        this.columns = [];
    }

    getSQL() {
        throw new Error('getSQL not implemented');
    }
}