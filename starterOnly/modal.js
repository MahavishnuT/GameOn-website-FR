function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalContent = document.querySelector(".content");
const formData = document.querySelectorAll(".formData");
const submitBtn = document.querySelector(".btn-submit");
const closeBtn = document.querySelector(".close");

// launch modal form
function launchModal() {
  modalBg.style.display = "block";
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));


// "thank you" message
submitBtn.addEventListener("click", function () {
  modalContent.style.display = "none";
  const thankYou = document.createElement("div");
  modalContent.appendChild(thankYou);
  thankYou.textContent = "Merci pour votre inscription"
  thankYou.style.color = "white";
  console.log(thankYou.textContent);
})

// close button 
closeBtn.addEventListener("click", function() {
  modalBg.style.display = "none";
})

// validation & error messages
const validationTexts = document.querySelectorAll(".error-msg");
const textInput = document.querySelectorAll(".text-control");

function showValidation({index, validation}) {
  if(validation) {
    if(validationTexts[index]) validationTexts[index].style.display = "none";
    textInput[index].style.border = "none";
  }
  else {
    if(validationTexts[index]) validationTexts[index].style.display = "block";
    textInput[index].style.border = "2px solid #ff4e60";
  }
}

// first name validation
const firstNameInput = document.querySelector(".formData:nth-child(1) input");

firstNameInput.addEventListener("blur", firstNameValidation)
firstNameInput.addEventListener("input", firstNameValidation)
const regexFirstLastName = /^[a-zA-Z\u00e0-\u00ff]+(([- ])?[a-zA-Z\u00e0-\u00ff])+$/;

function firstNameValidation() {
  if(firstNameInput.value.length >= 2 && regexFirstLastName.test(firstNameInput.value)) {
    showValidation({index: 0, validation: true})
  }
  else {
    showValidation({index: 0, validation: false})
  }
}

// last name validation 

const lastNameInput = document.querySelector(".formData:nth-child(2) input");

lastNameInput.addEventListener("blur", lastNameValidation)
lastNameInput.addEventListener("input", lastNameValidation)

function lastNameValidation() {
  if(lastNameInput.value.length >= 2 && regexFirstLastName.test(lastNameInput.value)) {
    showValidation({index: 1, validation: true})
  }
  else {
    showValidation({index: 1, validation: false})
  }
}

// email validation

const emailInput = document.querySelector(".formData:nth-child(3) input");
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

emailInput.addEventListener("blur", emailValidation)
emailInput.addEventListener("input", emailValidation)

function emailValidation() {
  if(regexEmail.test(emailInput.value)) {
    showValidation({index: 2, validation: true})
  }
  else {
    showValidation({index: 2, validation: false})
  }
}

// date validation

const dateInput = new Date(document.querySelector(".formData:nth-child(4) input").value);

let today = new Date();
let date = new Date(today.getFullYear(),today.getMonth(),today.getDate());
console.log(dateInput);
console.log(date);
console.log(dateInput.getTime());
console.log(date.getTime());

dateInput.addEventListener("blur", dateValidation)
dateInput.addEventListener("change", dateValidation)

function dateValidation() {
  if(dateInput.getTime() < date.getTime()) {
    showValidation({index: 3, validation: true})
  }
  else {
    showValidation({index: 3, validation: false})
  }
}

// tournaments validation

const tournamentInput = document.querySelector(".formData:nth-child(5) input");
const regexTournament = /\d$/

tournamentInput.addEventListener("blur", tournamentValidation)
tournamentInput.addEventListener("input", tournamentValidation)

function tournamentValidation() {
  if(regexTournament.test(tournamentInput.value) && tournamentInput.value >= 0) {
    showValidation({index: 4, validation: true})
  }
  else {
    showValidation({index: 4, validation: false})
  }
}

// tournament choice validation

const tournamentChoice = document.querySelectorAll(".formData .radio-input")

function tournamentChoiceValidation () {
  if(tournamentChoice) {
    showValidation({index: 5, validation: true})
  }
  else {
    showValidation({index: 5, validation: false})
  }
}