class Subject {

    private _name: string;
    private _is_core: boolean;
    private _id: number;

    constructor(id, name, is_core = true) {
        this._name = name;
        this._is_core = is_core;
        this._id = id;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get isCore() {
        return this._is_core;
    }

    set isCore(value) {
        this._is_core = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }
}

export default Subject;