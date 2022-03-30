"use strict!";

//Global varibles
let searchInput = document.getElementById("searchInput");
let dark = document.querySelector("button");






//Function to find course through title in the inputField
function findCourse() {
  let course = DATABASE.courses.filter((course) =>
    course.title.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  //sort() courses by alphabetic order by title when you search on courseTitle

  course.sort(function (a, b) {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });

  return course;
}

//EventListner for input field that calles the findCourse()
searchInput.addEventListener("keyup", function () {
  let foundCourse = findCourse();

  let wrapper = document.getElementById("courses");

  //Clears the HTML each time keyUp() is called.
  wrapper.innerHTML = "";
  createHTML(foundCourse);

  //If the searchinput is empty no courses should be found/showed.
  if (searchInput.value == 0) {
    wrapper.innerHTML = "";
  }
});




//Function that creates HTML-content  including student first and last name each time you search for a student.
function createCourse(course) {
  
    //wrapper for each course. 

    let wrapper = document.getElementById("courses");
    let coursewrapper = document.createElement("div");
    coursewrapper.classList.add("coursewrapper");

    wrapper.appendChild(coursewrapper);


    let courseTitle = document.createElement("h2");

    coursewrapper.appendChild(courseTitle);
    
    courseTitle.innerText = course.title + " (" + course.totalCredits + " credits) " 


    //Responisble teacher 

    let foundResponsible = findResponsible(course);

    let responibleWrapper = document.createElement("div");
    coursewrapper.appendChild(responibleWrapper);

    let responibleTitle = document.createElement("h3");
    responibleTitle.innerText = "Course Responible:";
    responibleWrapper.appendChild(responibleTitle)

    
    
  

    for (let i = 0; i< foundResponsible.length; i++){

        let responsibleDiv = document.createElement("div");
        responsibleDiv.classList.add("responsibleDiv");
        responsibleDiv.innerText = foundResponsible[i].firstName + " " + foundResponsible[i].lastName + " (" + foundResponsible[i].post + " )";
        
        responibleWrapper.appendChild(responsibleDiv);

        
    }

    //Teachers 

    let foundTeachers = findTeachers(course);

    let teachersWrapper = document.createElement("div");
    coursewrapper.appendChild(teachersWrapper);
    
    let teacherTitle = document.createElement("h3");
    teacherTitle.style.gridColumn = "1/5";
    teacherTitle.innerText = "Teachers:";

    teachersWrapper.appendChild(teacherTitle);

    teachersWrapper.classList.add("teacherWrapper");


    for (let i = 0; i< foundTeachers.length; i++){

        let teacherDiv = document.createElement("div");
        teacherDiv.classList.add("teacherDiv");
        teacherDiv.innerText = foundTeachers[i].firstName + " " + foundTeachers[i].lastName + " (" + foundTeachers[i].post + ") ";
        
        teachersWrapper.appendChild(teacherDiv);

        
    }


    //studentwrapper for each course. 
    let studentWrapper = document.createElement("div");
    studentWrapper.classList.add("studentWrapper");
    coursewrapper.appendChild(studentWrapper);

    let studentTitle = document.createElement("h3");
    studentTitle.innerText = "Students:";
    studentWrapper.appendChild(studentTitle);

    studentTitle.style.gridColumn = "1/5";

    
    let foundStudents = getStudentById(course);

    let foundStudentCourse = [];

    for (let student of foundStudents){
        for (let courseArray of student.courses){
            if(courseArray.courseId == course.courseId){
                foundStudentCourse.push(courseArray);
            }

        }

    }

    
    


    for (let i = 0; i < foundStudents.length; i++) {


        let studentDiv = document.createElement("div");
        
        studentWrapper.appendChild(studentDiv);

        studentDiv.classList.add("students", "courseStudents");

        studentDiv.innerText = foundStudents[i].firstName + " " + foundStudents[i].lastName + " (" + foundStudentCourse[i].passedCredits + " credits " + ") " + "\n"
        + foundStudentCourse[i].started.semester +  " " + foundStudentCourse[i].started.year ;
    
        if(course.totalCredits == foundStudentCourse[i].passedCredits){
            studentDiv.style.backgroundColor = "green";
        }
        
  }
}



// Function to loop through the courses and adding the HTML

function createHTML(courses) {
  courses.forEach((course) => {
    createCourse(course);
  
  });
};


//Function to get courses that the each student has read based on the ID. 

function getStudentById(course) {


  let foundStudent = [];

  for (let student of DATABASE.students) {
    for (studentCourse of student.courses) {
        if (studentCourse.courseId == course.courseId) {
            foundStudent.push(student);
        }
    }
}
  
  return foundStudent;
}


//Function to get teacher per course. 

function findTeachers (course) {
    let foundTeacher = []
  
    for (let teacher of DATABASE.teachers) {
      for (let courseTeacher of course.teachers) {
        if (courseTeacher == teacher.teacherId) {
          foundTeacher.push(teacher)
        }
      }
    }
  
    return foundTeacher
  }


// Find responsible teacher per course. 

function findResponsible(course){

    let foundResponsible = [];

    for (let teacher of DATABASE.teachers){
    
            if(teacher.teacherId == course.courseResponsible){
                foundResponsible.push(teacher);
            }

        }

        return foundResponsible;
    }





    //Function for darkMode


    function myFunction() {
       var element = document.body;
       element.classList.toggle("dark-mode");
    }

      

//Function to get todays date 
function todayDate(){

    var today = new Date();
    var date =  + today.getDate() + "/" + (today.getMonth()+1) + " - " + today.getFullYear();
    let dateInput = document.createElement("div");
    
    let dateWrapper = document.getElementById("dateDiv");
    dateWrapper.appendChild(dateInput);
    
    
    dateInput.classList.add("dateInput");
    
    
    dateInput.innerHTML = "DATE: " + date;
    console.log(date);
    
    
    }
    
    
    todayDate();