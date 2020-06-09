class User {

    private _name: string;
    private _token: string;
    private _id: number;
    private _loggedIn: boolean;

    constructor(id = null, name = null, token = null, loggedIn = false) {
        this._name = name;
        this._token = token;
        this._id = id;
        this._loggedIn = loggedIn;
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

    get token() {
        return this._token;
    }

    set token(value) {
        this._token = value;
    }

    get loggedIn() {
        return this._loggedIn;
    }

    set loggedIn(value) {
        this._loggedIn = value;
    }
}

export default User;