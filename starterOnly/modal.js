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
const modalBody = document.querySelector(".modal-body");
const formData = document.querySelectorAll(".formData");
const submitBtn = document.querySelector(".btn-submit");
const closeBtn = document.querySelector(".close");
const thankYou = document.querySelector("#thank-you")
const content = document.querySelector(".content")

// modal form validity 
const inputsValidity = {
  firstName: false,
  lastName: false,
  email: false,
  birthDate: false,
  tournaments: false,
  tournamentChoice: false,
  termsAndConditions: false
}

modalBody.addEventListener("submit", handleForm)

function handleForm(e) {
  e.preventDefault()

  const keys = Object.keys(inputsValidity)
  const failedInputs = keys.filter(key => !inputsValidity[key])

  if(failedInputs.length) {
    failedInputs.forEach(input => {
      const index = keys.indexOf(input)
      showValidation({index: index, validation: false})
    })
  }
  else {
    formData.forEach(form => {
      form.style.display = "none"
    });
    thankYou.style.display = "block";
    submitBtn.value = "Fermer";
    submitBtn.addEventListener("click", function() {
      modalBg.style.display = "none";
    })
  }
}

// launch modal form
function launchModal() {
  modalBg.style.display = "block";
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

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
    if(textInput[index]) textInput[index].style.border = "none";
  }
  else {
    if(validationTexts[index]) validationTexts[index].style.display = "block";
    if(textInput[index]) textInput[index].style.border = "2px solid #ff4e60";
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
    inputsValidity.firstName = true;
  }
  else {
    showValidation({index: 0, validation: false})
    inputsValidity.firstName = false;
  }
}

// last name validation 

const lastNameInput = document.querySelector(".formData:nth-child(2) input");

lastNameInput.addEventListener("blur", lastNameValidation)
lastNameInput.addEventListener("input", lastNameValidation)

function lastNameValidation() {
  if(lastNameInput.value.length >= 2 && regexFirstLastName.test(lastNameInput.value)) {
    showValidation({index: 1, validation: true})
    inputsValidity.lastName = true;
  }
  else {
    showValidation({index: 1, validation: false})
    inputsValidity.lastName = false;
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
    inputsValidity.email = true;
  }
  else {
    showValidation({index: 2, validation: false})
    inputsValidity.email = false;
  }
}

// date validation

let today = new Date();
let date = new Date(today.getFullYear(),today.getMonth(),today.getDate());

function dateValidation() {
  let dateSelected = new Date(document.querySelector(".formData:nth-child(4) input").value);

  if(dateSelected.getTime() < date.getTime()) {
    showValidation({index: 3, validation: true});
    dateSelected;
    inputsValidity.birthDate = true;
  }
  else {
    showValidation({index: 3, validation: false});
    dateSelected;
    inputsValidity.birthDate = false;
  }
}

const dateInput = document.querySelector(".formData:nth-child(4) input");
dateInput.addEventListener("blur", () => {dateValidation()})
dateInput.addEventListener("change", () => {dateValidation()})

// tournaments validation

const tournamentInput = document.querySelector(".formData:nth-child(5) input");
const regexTournament = /\d$/

tournamentInput.addEventListener("blur", tournamentValidation)
tournamentInput.addEventListener("input", tournamentValidation)

function tournamentValidation() {
  if(regexTournament.test(tournamentInput.value) && tournamentInput.value >= 0 && tournamentInput.value < 100) {
    showValidation({index: 4, validation: true})
    inputsValidity.tournaments = true;
  }
  else {
    showValidation({index: 4, validation: false})
    inputsValidity.tournaments = false;
  }
}

// tournament choice validation

const tournamentChoices = document.querySelectorAll(".formData .radio-input");

tournamentChoices.forEach(tournamentChoice => {
  tournamentChoice.addEventListener("blur", tournamentChoiceValidation)
})
tournamentChoices.forEach(tournamentChoice => {
  tournamentChoice.addEventListener("click", tournamentChoiceValidation)
})

function tournamentChoiceValidation() {
  for (i in tournamentChoices) {
    if(tournamentChoices[i].checked) {
      showValidation({index: 5, validation: true})
      console.log("test true");
      inputsValidity.tournamentChoice = true;
      break;
    }
    else {
      showValidation({index: 5, validation: false})
      console.log("test false");
      inputsValidity.tournamentChoice = false;
    }
  }
}

// terms and conditions validation

const termsAndConditions = document.querySelector("#checkbox1");

termsAndConditions.addEventListener("blur", termsAndConditionsValidation)
termsAndConditions.addEventListener("input", termsAndConditionsValidation)

function termsAndConditionsValidation() {
  if(termsAndConditions.checked) {
    showValidation({index: 6, validation: true})
    inputsValidity.termsAndConditions = true;
  }
  else {
    showValidation({index: 6, validation: false})
    inputsValidity.termsAndConditions = false;
  }
}