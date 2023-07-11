/*********************************************************************************
*  WEB700 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Jason Go   Student ID: 128693223      Date: June 18,2023
*
********************************************************************************/ 



const collegeData = require('./modules/collegeData');
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();

var path = require('path');
app.get('/', (req, res) => {  
  let filePath = path.join(__dirname, 'views/home.html');
  res.sendFile(filePath);
});

app.get('/about', (req, res) => {  
  let filePath = path.join(__dirname, 'views/about.html');
  res.sendFile(filePath);
});

app.get('/htmlDemo', (req, res) => {  
  let filePath = path.join(__dirname, 'views/htmlDemo.html');
  res.sendFile(filePath);
});

app.get('/students', (req, res) => {
  var studentcode = req.query.course;
  // console.log(studentcode)
    studentcode = parseInt(studentcode);
    if(studentcode){
      collegeData.initialize().then(() => {
        collegeData.getStudentsByCourse(studentcode).then(studentListBycourses => {
            result = studentListBycourses;
            res.send(result);
          }).catch(error => {
            result = 'getCoursesResult'+ error;
            res.send(result);
          });
        })
        .catch(error => {
          res.send(error);
        });
    }else{
  collegeData.initialize().then(() => {
    ////////////////
      collegeData.getAllStudents().then(students => {        
        res.send(students);
      }).catch(error => {
        res.json({ message: 'No results' });
      });
    ///////////////
    }).catch(error => {
      res.send(error);
    }
  );
    }
})

app.get('/tas', (req, res) => { 
  // res.send('Hello tas!')
  collegeData.initialize().then(() => {
    ////////////////
    collegeData.getTAs().then(tas => {
        result =   tas;
        if(result.length>0){
          res.send(result);
        }else{
          res.json({ message: 'No results' });
        }        
      }).catch(error => {                
        res.json(error);
      });
    ///////////////
    }).catch(error => {
      res.send(error);
    }
  );
})


app.get('/courses', (req, res) => { 
  // res.send('Hello tas!')
  collegeData.initialize().then(() => {
  // res.send('Hello course!')
    ////////////////
    collegeData.getCourses().then(course => {
        result =   course;
        if(result.length>0){
          res.send(result);
        }else{
          res.json({ message: 'No results' });
        }        
      }).catch(error => {                
        res.json(error);
      });
    ///////////////
    }).catch(error => {
      res.send(error);
    }
  );
})

app.get('/student/:num', (req, res) => { 
  // res.send(req.params.num)
  var studeNum = req.params.num;
  studeNum = parseInt(studeNum);
  collegeData.initialize().then(() => {
  // res.send(studeNum)
  collegeData.getStudentByNum(studeNum).then(studentListBycourses => {
    result =   studentListBycourses;
    if(result.length>0){
      res.send(result);
    }else{
      res.json({ message: 'No results' });
    }        
    }).catch(error => {
      res.json(error);
    });
  })
  .catch(error => {
    res.send(error);
  }
);
})


app.get('*', (req, res) => {
  // res.status(404).send('Page Not Found');
  let filePath = path.join(__dirname, 'views/404.html');
  res.sendFile(filePath);
});


  collegeData.initialize().then(() => {
    app.listen(HTTP_PORT, ()=>{console.log("server listening on port: " + HTTP_PORT)});
    }).catch(error => {
      console.log(error);
    }
  );