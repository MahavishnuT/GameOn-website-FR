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
const thankYou = document.querySelector("#thank-you");
const content = document.querySelector(".content");
const body = document.querySelector("body");

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
      showValidation(index, false)
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
  body.style.overflow = "hidden";
  window.scrollTo({ top: 0, behavior: 'smooth' })
}


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close button 
closeBtn.addEventListener("click", function() {
  modalBg.style.display = "none";
  body.style.overflow = "auto";
})

// validation & error messages
const validationTexts = document.querySelectorAll(".error-msg");
const textInput = document.querySelectorAll(".text-control");

function showValidation(index, validation, indexbis) {
  if(validation) {
    if(validationTexts[index, indexbis]) validationTexts[index, indexbis].style.display = "none";
    if(textInput[index, indexbis]) textInput[index, indexbis].style.border = "none";
  }
  else {
    if(validationTexts[index, indexbis]) validationTexts[index, indexbis].style.display = "block";
    if(textInput[index, indexbis]) textInput[index, indexbis].style.border = "2px solid #ff4e60";
  }
}

// first name validation
/* const firstNameInput = document.querySelector(".formData:nth-child(1) input");

firstNameInput.addEventListener("blur", firstNameValidation)
firstNameInput.addEventListener("input", firstNameValidation) */
const regexFirstLastName = /^[a-zA-Z\u00e0-\u00ff]+(([- ])?[a-zA-Z\u00e0-\u00ff])+$/;
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexTournament = /\d$/;
let today = new Date();
let date = new Date(today.getFullYear(),today.getMonth(),today.getDate());

/* function firstNameValidation() {
  if(firstNameInput.value.length >= 2 && regexFirstLastName.test(firstNameInput.value)) {
    showValidation(0, true)
    inputsValidity.firstName = true;
  }
  else {
    showValidation( 0, false)
    inputsValidity.firstName = false;
  }
} */

const inputGlobal = document.querySelectorAll(".formData input");
inputGlobal.forEach(input => {
  input.addEventListener("click", globalValidation(input))
  console.log("input");
})


inputGlobal.forEach(input => {
  input.addEventListener("blur", globalValidation(input))
})


function globalValidation(input) {
  console.log("globalValidation")
  for(i in inputGlobal) {

    if(inputGlobal[i].getAttribute("type") === "text") {
      console.log("input text")
      if(input.value.length >= 2 && regexFirstLastName.test(input.value)) {
        showValidation( 0, true, 1)
        inputsValidity.firstName = true;
        inputsValidity.lastName = true;
      }
      else {
        showValidation( 0, false, 1)
        inputsValidity.firstName = false;
        inputsValidity.lastName = false;
      }
    }
  
    else if(input.getAttribute("type") === "email") {
      console.log("input email")
      if(regexEmail.test(input.value)) {
        showValidation( 2, true)
        inputsValidity.email = true;
      }
      else {
        showValidation( 2, false)
        inputsValidity.email = false;
      }
    }
    
    else if(input.getAttribute("type") === "date") {
      console.log("input date")
      let dateSelected = new Date(document.querySelector(".formData:nth-child(4) input").value);
      
      if(dateSelected.getTime() < date.getTime()) {
        showValidation( 3, true);
        inputsValidity.birthDate = true;
      }
      else {
        showValidation( 3, false);
        inputsValidity.birthDate = false;
      }
    }
    
    else if(input.getAttribute("type") === "number") {
      console.log("input number")
      if(regexTournament.test(input.value) && input.value >= 0 && input.value < 100) {
        showValidation( 4, true)
        inputsValidity.tournaments = true;
      }
      else {
        showValidation( 4, false)
        inputsValidity.tournaments = false;
      }
    }
    
    else if(input.getAttribute("type") === "radio") {
      console.log("input radio")
      const inputRadio = document.querySelectorAll(".formData .radio-input");
      for (i in inputRadio) {
        if(inputRadio[i].checked) {
          showValidation( 5, true)
          inputsValidity.tournamentChoice = true;
          break;
        }
        else {
          showValidation( 5, false)
          inputsValidity.tournamentChoice = false;
        }
      }
    }
    
    else if(input.getAttribute("type") === "checkbox" && input.hasAttribute("required")) {
      console.log("input checkbox")
      if(input.checked) {
        showValidation( 6, true)
        inputsValidity.termsAndConditions = true;
      }
      else {
        showValidation( 6, false)
        inputsValidity.termsAndConditions = false;
      }
    }

  }
  
}

// last name validation 

/* const lastNameInput = document.querySelector(".formData:nth-child(2) input");

lastNameInput.addEventListener("blur", lastNameValidation)
lastNameInput.addEventListener("input", lastNameValidation)

function lastNameValidation() {
  if(lastNameInput.value.length >= 2 && regexFirstLastName.test(lastNameInput.value)) {
    showValidation( 1, true)
    inputsValidity.lastName = true;
  }
  else {
    showValidation( 1, false)
    inputsValidity.lastName = false;
  }
} */

// email validation

/* const emailInput = document.querySelector(".formData:nth-child(3) input"); */


/* emailInput.addEventListener("blur", emailValidation)
emailInput.addEventListener("input", emailValidation)

function emailValidation() {
  if(regexEmail.test(emailInput.value)) {
    showValidation( 2, true)
    inputsValidity.email = true;
  }
  else {
    showValidation( 2, false)
    inputsValidity.email = false;
  }
} */

// date validation



/* function dateValidation() {
  let dateSelected = new Date(document.querySelector(".formData:nth-child(4) input").value);

  if(dateSelected.getTime() < date.getTime()) {
    showValidation( 3, true);
    inputsValidity.birthDate = true;
  }
  else {
    showValidation( 3, false);
    inputsValidity.birthDate = false;
  }
}

const dateInput = document.querySelector(".formData:nth-child(4) input");
dateInput.addEventListener("blur", () => {dateValidation()})
dateInput.addEventListener("change", () => {dateValidation()}) */

// tournaments validation

/* const tournamentInput = document.querySelector(".formData:nth-child(5) input");
 */

/* tournamentInput.addEventListener("blur", tournamentValidation)
tournamentInput.addEventListener("input", tournamentValidation)

function tournamentValidation() {
  if(regexTournament.test(tournamentInput.value) && tournamentInput.value >= 0 && tournamentInput.value < 100) {
    showValidation( 4, true)
    inputsValidity.tournaments = true;

  }
  else {
    showValidation( 4, false)
    inputsValidity.tournaments = false;
  }
} */

// tournament choice validation

/* const tournamentChoices = document.querySelectorAll(".formData .radio-input");

tournamentChoices.forEach(tournamentChoice => {
  tournamentChoice.addEventListener("blur", tournamentChoiceValidation)
})
tournamentChoices.forEach(tournamentChoice => {
  tournamentChoice.addEventListener("click", tournamentChoiceValidation)
})

function tournamentChoiceValidation() {
  for (i in tournamentChoices) {
    if(tournamentChoices[i].checked) {
      showValidation( 5, true)
      inputsValidity.tournamentChoice = true;
      break;
    }
    else {
      showValidation( 5, false)
      inputsValidity.tournamentChoice = false;
    }
  }
} */

// terms and conditions validation

/* const termsAndConditions = document.querySelector("#checkbox1");

termsAndConditions.addEventListener("blur", termsAndConditionsValidation)
termsAndConditions.addEventListener("input", termsAndConditionsValidation)

function termsAndConditionsValidation() {
  if(termsAndConditions.checked) {
    showValidation( 6, true)
    inputsValidity.termsAndConditions = true;
  }
  else {
    showValidation( 6, false)
    inputsValidity.termsAndConditions = false;
  }
} */