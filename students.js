"use strict!";

//Global varibles
let searchInput = document.getElementById("searchInput");
const toggleBtn = document.getElementById("modeBtn");
const theme = document.querySelector("body");
let darkMode = localStorage.getItem("darkmode");

//Function to find student through inputField
function findStudent() {
  let student = DATABASE.students.filter((student) =>
    student.lastName.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  //sort() students by alphabetic order by firstname when you search on lastname

  DATABASE.students.sort(function (a, b) {
    if (a.firstName < b.firstName) {
      return -1;
    }
    if (a.firstName > b.firstName) {
      return 1;
    }
    return 0;
  });

  return student;
}

//EventListner for input field that calles the findStudent()
searchInput.addEventListener("keyup", function () {
  let foundStudent = findStudent();

  let wrapper = document.getElementById("students");

  //Clears the HTML each time keyUp() is called.
  wrapper.innerHTML = "";
  createHTML(foundStudent);

  //If the searchinput is empty no students should be found/showed.
  if (searchInput.value == 0) {
    wrapper.innerHTML = "";
  }
});

//Function that creates HTML-content
function createStudent(student) {
  //Passed credits
  let passedCreds = getPassedCredits(student);
  let totalCreditsforStudent = passedCreds.reduce(function (a, b) {
    return a + b;
  }, 0);

  //Student wrapper + HTML
  let wrapper = document.getElementById("students");
  let div = document.createElement("div");

  wrapper.appendChild(div);
  div.classList.add("students");

  let p = document.createElement("p");
  div.appendChild(p);
  p.innerText =
    student.firstName +
    " " +
    student.lastName +
    " " +
    "(Total Credits:" +
    " " +
    totalCreditsforStudent +
    ")";

  //Course-title, Wrapper and HTML
  let p1 = document.createElement("p");
  div.appendChild(p1);
  p1.innerText = "Courses:";

  let courseWrapper = document.createElement("div");
  courseWrapper.classList.add("courseWrapper");

  div.appendChild(courseWrapper);

  let foundCourses = getCourseById(student);

  for (let i = 0; i < foundCourses.length; i++) {
    let coursesDiv = document.createElement("div");
    coursesDiv.classList.add("oneCourse");

    courseWrapper.appendChild(coursesDiv);

    coursesDiv.innerText =
      foundCourses[i].title +
      " " +
      "\n" +
      " " +
      student.courses[i].started.semester +
      " " +
      student.courses[i].started.year +
      " " +
      "( " +
      student.courses[i].passedCredits +
      " / " +
      foundCourses[i].totalCredits +
      " " +
      "credits)";

    if (foundCourses[i].totalCredits == student.courses[i].passedCredits) {
      coursesDiv.style.backgroundColor = "green";
    }
  }
}

// Function to loop through the students and adding the HTML

function createHTML(students) {
  students.forEach((student) => {
    createStudent(student);
  });
}

//Function to get courses that the each student has read based on the ID.

function getCourseById(student) {
  let foundCourses = [];
  for (let i = 0; i < student.courses.length; i++) {
    foundCourses.push(
      DATABASE.courses.find((course) => {
        return course.courseId == student.courses[i].courseId;
      })
    );
  }
  return foundCourses;
}

// Function to get passed credits per course and student.
function getPassedCredits(student) {
  let foundCredits = [];
  for (let studentCourses of student.courses) {
    for (let DBC of DATABASE.courses) {
      if (studentCourses.courseId == DBC.courseId) {
        foundCredits.push(studentCourses.passedCredits);
      }
    }
  }

  return foundCredits;
}

//Functions for the darkmode and localStorage.

const enableDarkMode = () => {
  theme.classList.add("dark-mode");
  toggleBtn.classList.remove("modeBtn");
  localStorage.setItem("darkmode", "enabled");
};

const disableDarkMode = () => {
  theme.classList.remove("dark-mode");
  toggleBtn.classList.add("modeBtn");
  localStorage.setItem("darkmode", "disabled");
};

if (darkMode === "enabled") {
  enableDarkMode(); // set state of darkMode on page load
}

toggleBtn.addEventListener("click", (e) => {
  darkMode = localStorage.getItem("darkmode"); // update darkMode when clicked
  if (darkMode === "disabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

//Function to get todays date
function todayDate() {
  var today = new Date();
  var date =
    +today.getDate() +
    "/" +
    (today.getMonth() + 1) +
    " - " +
    today.getFullYear();
  let dateInput = document.createElement("div");

  let dateWrapper = document.getElementById("dateDiv");
  dateWrapper.appendChild(dateInput);

  dateInput.classList.add("dateInput");

  dateInput.innerHTML = "DATE: " + date;
  console.log(date);
}

//Direct Code

todayDate();
