var fs = require('fs') //File System module

var s1 = "Hello World"

var s2 = new String('Seneca')

console.log(s1)
console.log(s2)

console.log(s1[0])
console.log(s1.charAt(0))

//convert string to lower an upper cased
console.log(s1.toLowerCase())
console.log(s1.toUpperCase())

//Get Substring
console.log(s1.substring(0,5)) //Hello
console.log(s1.substring(6)) //World
console.log(s1.substring(6, 6 + "World".length)) //World
console.log(s1.substring(6, -5)) //Hello

//Concate TWO strings
var r = s1 + s2
console.log(r)
r = s1.concat(s2)
console.log(r)

for(const c of s1){
    console.log(c)
}

//Type Conversion

var a = 'a100'

var c = parseInt(a) + 20
console.log(c)
console.log(isNaN(c)) //NULL //try..catch
if(isNaN(a)){
    console.log('Not a Number')
}

console.log(Math.PI)
console.log(Math.min(1,2,3,4))
console.log(Math.max(...[1,2,3,4]))
console.log(Math.abs(-10))

//Date
console.log(Date())
console.log(Date.now())
var today = new Date();
console.log(today.getTime())
console.log(today.getMonth())
console.log(today.getDay())

//JSON
var user = {
    id:1,
    firstname: "Pritesh",
    lastname: "Patel",
    address:{
        street: 'Street 1',
        city: 'Toronto',
        postcode: 'M1CM1X'
    }
}
console.log(user)
//converting JS object to JSON
var userJSON = JSON.stringify(user)
console.log(userJSON)

//converting JSON object to JS Object
var userObject = JSON.parse(userJSON)
console.log(userObject)


//Reading Data from file - JSON
fs.readFile('user.json', function(err, data) {
    console.log(data.toString())

    var userObject = JSON.parse(data.toString())
    console.log(userObject.name)
    console.log(userObject['username'])
    console.log(userObject.address.street)

    for(var v in userObject){
        console.log(userObject[v])
    }
})