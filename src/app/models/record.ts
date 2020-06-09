import { NumberValueAccessor } from "@angular/forms";

class Record {

    private _id: number;
    private _student_id: number;
    private _student_name: string;
    private _subject_id: number;
    private _subject_name: string;
    private _hours: number;
    private _minutes: number;
    private _date: Date;
    private _notes: string;


    constructor(id, studentId, studentName, subjectId, subjectName, hours, minutes, date, notes) {

        if(minutes >= 60) {
            hours += Math.floor(minutes / 60);
            minutes = minutes % 60;
        }

        this._id = id;
        this._student_id = studentId;
        this._student_name = studentName;
        this._subject_id = subjectId;
        this._subject_name = subjectName;
        this._hours = hours;
        this._minutes = minutes;
        this._date = date;
        this._notes = notes;

        
    }

    get id() { return this._id; }
    get studentId() { return this._student_id; }
    get studentName() { return this._student_name; }
    get subjectId() { return this._subject_id; }
    get subjectName() { return this._subject_name; }
    get hours() { return this._hours; }
    get minutes() { return this._minutes; }
    get date() { return this._date; }
    get notes() { return this._notes; }

}

export default Record;
