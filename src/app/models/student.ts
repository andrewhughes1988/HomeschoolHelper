class Student {

    private _name: string;
    private _id: number;

    constructor(id, name) {
        this._id = id;
        this._name = name;        
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }
}

export default Student;