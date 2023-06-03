class Data {

    students;
    courses;

    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}

var dataCollection = null;

const fs = require('fs');

const initialize = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/students.json', 'utf8', (err, dataFromStudents) => {
            if (err) {
                reject('unable to read students.json');
                return;
            }
            
            fs.readFile('./data/courses.json', 'utf8', (err, dataFromCourses) => {
                if (err) {
                    reject('unable to read courses.json');
                    return;
                }
                try {
                    const studentDataFromFile = JSON.parse(dataFromStudents);
                    const courseDataFromFile = JSON.parse(dataFromCourses);
                    const dataCollection = new Data(studentDataFromFile, courseDataFromFile);
                    resolve(dataCollection);
                } catch (error) {
                    reject("Unable to resolve the dataCollejection object");
                }
            });
        });
    });
};

const getAllStudents = (dataCollection) => {
    return new Promise((resolve, reject) => {
        if (dataCollection.length === 0) {
            reject("no data returned");
            return;
        } else if (dataCollection.students.length === 0) {
            reject("no students returned");
            return;
        }
        resolve(dataCollection.students);
    });
};

const getTAs = (dataCollection) => {
    return new Promise((resolve, reject) => {
        if (dataCollection.students.length === 0) {
            reject("no students returned");
            return;
        }
        const TAs = dataCollection.students.filter( student => student.TA === true);
        if (TAs.length === 0) {
            reject("no results of students with TA returned");
            return;
        }
        resolve(TAs);
    });
}; 

const getCourses = (dataCollection) => {
    return new Promise((resolve, reject) => {
        if (dataCollection.length === 0) {
            reject("no data returned");
            return;
        } else if (dataCollection.courses.length === 0) {
            reject("no courses returned");
            return;
        }
        resolve(dataCollection.courses);
    });
};

module.exports = {initialize, getAllStudents, getTAs, getCourses};