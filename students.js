"use strict!";

//Global varibles
let searchInput = document.getElementById("searchInput");



//Function to find student through inputField 

function findStudent () {

    let student = DATABASE.students
    .filter((student) => student.lastName.toLowerCase().includes(searchInput.value))
    .map((student) => student.firstName + " " + student.lastName);

    return student;
}


//EventListner for input field that calles the findStudent()
searchInput.addEventListener("keyup", function() {

    let foundStudent = findStudent();
    let wrapper = document.getElementById("students");

    //Clears the HTML each time keyUp() is called. 
    wrapper.innerHTML = "";
    createHTML(foundStudent);

    //If the searchinput is empty no students should be found. 
    if(searchInput.value == 0){
        wrapper.innerHTML = "";
    }

    
    
});



//Function that creates HTML-content  including student first and last name each time you search for a student. 
function createStudent(student){
   
    let div = document.createElement("div");
    div.classList.add("students");
    
    let wrapper = document.getElementById("students");
    wrapper.appendChild(div);
    
    div.innerHTML = student;
}

//Fn


function createHTML(students){
    
    students.forEach(student => { 
      createStudent(student);

    })

}