const fs = require('fs');

class Data {
  constructor(students, courses) {
    this.students = students;
    this.courses = courses;
  }
}

let dataCollection = null;

function initialize() {
  return new Promise((resolve, reject) => {
    fs.readFile('./data/students.json', 'utf8', (err, studentDataFromFile) => {
      if (err) {
        reject('Unable to read students.json');
        return;
      }

      fs.readFile('./data/courses.json', 'utf8', (err, courseDataFromFile) => {
        if (err) {
          reject('Unable to read courses.json');
          return;
        }

        const studentData = JSON.parse(studentDataFromFile);
        const courseData = JSON.parse(courseDataFromFile);

        dataCollection = new Data(studentData, courseData);
        resolve();
      });
    });
  });
}

function addStudent(studentData) {
  return new Promise((resolve, reject) => {
    if (dataCollection && dataCollection.students) {
      // Set TA to false if undefined, otherwise true
      studentData.TA = studentData.TA === undefined ? false : true;

      // Set studentNum as length of students array plus one
      studentData.studentNum = dataCollection.students.length + 1;

      // Push the new studentData to the students array
      dataCollection.students.push(studentData);

      resolve();
    } else {
      reject('Unable to add student');
    }
  });
}

function getAllStudents() {
  return new Promise((resolve, reject) => {
    if (dataCollection && dataCollection.students.length > 0) {
      resolve(dataCollection.students);
    } else {
      reject('No students available');
    }
  });
}

function getTAs() {
  return new Promise((resolve, reject) => {
    if (dataCollection && dataCollection.students.length > 0) {
      const tas = dataCollection.students.filter(student => student.TA);
      resolve(tas);
    } else {
      reject('No TAs available');
    }
  });
}

function getCourses() {
  return new Promise((resolve, reject) => {
    if (dataCollection && dataCollection.courses.length > 0) {
      resolve(dataCollection.courses);
    } else {
      reject('No courses available');
    }
  });
}

function getStudentsByCourse(course) {
  return new Promise((resolve, reject) => {
    if (dataCollection && dataCollection.students.length > 0) {
      const studentsByCourse = dataCollection.students.filter(student => student.course === course);
      if (studentsByCourse.length > 0) {
        resolve(studentsByCourse);
      } else {
        reject('No results returned');
      }
    } else {
      reject('No students available');
    }
  });
}

function getStudentByNum(num) {
  return new Promise((resolve, reject) => {
    if (dataCollection && dataCollection.students.length > 0) {
      const student = dataCollection.students.find(student => student.studentNum === num);
      if (student) {
        resolve(student);
      } else {
        reject('No results returned');
      }
    } else {
      reject('No students available');
    }
  });
}

module.exports = {
  initialize,
  addStudent,
  getAllStudents,
  getTAs,
  getCourses,
  getStudentsByCourse,
  getStudentByNum,
};
