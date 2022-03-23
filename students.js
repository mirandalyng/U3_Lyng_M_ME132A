"use strict!";

//Global varibles





let searchInput = document.getElementById("searchInput");

function findStudent () {

    let student = DATABASE.students
    .filter((student) => student.lastName.toLowerCase().includes(searchInput.value))
    .map((student) => student.firstName + " " + student.lastName);

    return student;
}





searchInput.addEventListener("keyup", function() {

    let foundStudent = findStudent();
    createInHTML(foundStudent);

});


function createInHTML(students){
    console.log(students);
}




