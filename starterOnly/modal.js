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
const everyFormInputs = document.querySelectorAll(".formData input");
const formElement = document.querySelector(".modal-body form");
const errorMessages = document.querySelectorAll(".error-msg");

// regex and date 
const regexFirstLastName = /^[a-zA-Z\u00e0-\u00ff]+(([- ])?[a-zA-Z\u00e0-\u00ff])+$/;
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexTournament = /\d$/;
let today = new Date();
let date = new Date(today.getFullYear(),today.getMonth(),today.getDate());
let minimumDate = new Date("January 1, 1900");

// launch modal form
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

function launchModal() {
  modalBg.style.display = "block";
  body.style.overflow = "hidden";
  window.scrollTo({ top: 0, behavior: 'smooth' })

  errorMessages.forEach(errorMessage => {
    if (errorMessage.style.display = "block") {
      errorMessage.style.display = "none"
    }
  })
  everyFormInputs.forEach(input => {
    if (input.style.border = "2px solid #e54858") {
      input.style.border = "0.8px solid #ccc";
    }
  })

}

// close button 
closeBtn.addEventListener("click", function() {
  modalBg.style.display = "none";
  body.style.overflow = "auto";
})

// shows if errors were made by users

/**
 * displays an error-message if `input` element is invalid
 */
function showValidation(input, isValid) {

  // errorElement gets the error message who has an input as sibling
  const errorElement = input.parentNode.querySelector(".error-msg")
  console.log(errorElement);

  if(isValid) {
    errorElement.style.display = "none";
    input.style.border = "none";
  }
  else {
    errorElement.style.display = "block";
    input.style.border = "2px solid #ff4e60";
  }
}

// validation of inputs
everyFormInputs.forEach(input => {
  input.addEventListener("input", function() {
    inputValidation(input)})
})


/**
 * checks what type of input is used in everyFormInputs and displays, or not, an error message from showValidation. Returns a boolean.
 * @param {*} input 
 * @returns 
 */
function inputValidation(input) {

  // creation of a boolean to check if there is
  // an error in at least one input
  let isErrorInInput = false;

  if(input.getAttribute("name") === "email") {
    console.log("input email")
    if(regexEmail.test(input.value)) {
      showValidation(input, true)
    }
    else {
      showValidation(input, false)
      isErrorInInput = true;
    }
  }

   else if(input.getAttribute("type") === "text") {
      console.log("input text")
      if(input.value.length >= 2 && regexFirstLastName.test(input.value)) {
        showValidation(input, true)
      }
      else {
        showValidation(input, false)
        isErrorInInput = true;
      }
    }
  
    
    else if(input.getAttribute("type") === "date") {
      console.log("input date")
      let dateSelected = new Date(document.querySelector(".formData #birthdate").value);
      
      if(dateSelected.getTime() < date.getTime() && dateSelected.getTime() > minimumDate.getTime()) {
        showValidation( input, true);
      }
      else {
        showValidation( input, false);
        isErrorInInput = true;
      }
    }
    
    else if(input.getAttribute("type") === "number") {
      console.log("input number")
      if(regexTournament.test(input.value) && input.value >= 0 && input.value < 100) {
        showValidation( input, true)
      }
      else {
        showValidation( input, false)
        isErrorInInput = true;
      }
    }
    
    else if(input.getAttribute("type") === "radio") {
      console.log("input radio")
      const inputsRadio = document.querySelectorAll(".formData .radio-input");

      // creation of a boolean to check if at least one of the
      // 6 radio-input is checked
      let isAtLeastOneRadioChecked = false;

      for (i in inputsRadio) {
        if(inputsRadio[i].checked) {
          isAtLeastOneRadioChecked = true;
          break;
        }
      }

      // isErrorInInput takes the opposite boolean value
      // of isAtLeastOneRadioChecked
      isErrorInInput = !isAtLeastOneRadioChecked;
      showValidation(input, isAtLeastOneRadioChecked);
    }
    
    else if(input.getAttribute("type") === "checkbox" && input.hasAttribute("data-required")) {
      console.log("input checkbox")
      if(input.checked) {
        console.log("input checkbox true")
        showValidation( input, true)
      }
      else {
        console.log("input checkbox false")
        showValidation( input, false)
        isErrorInInput = true;
      }
    }
  return isErrorInInput;
}

/**
 *  * checks if there's an error in the form when sumit btn is clicked
 * and returns a boolean
 */
function checkForm() {
  let isErrorInForm = false;

  everyFormInputs.forEach(input => {
    console.log(input);
    if(inputValidation(input)) {
      isErrorInForm = true;
      console.error("error on " , input)
    }
  })
  return isErrorInForm
}


formElement.addEventListener("submit", handleForm);

/**
 * checks if there's still an error in form and displays the "thank you"
 * message if there's none
 */

function handleForm(e) {
  e.preventDefault();
  const isCheckFormErrors = checkForm();

  if(isCheckFormErrors) {
    console.log("button disabled")
  }
  else {
    formElement.reset();
    submitBtn.style.backgroundColor = "#FE142F";
    formData.forEach(form => {
      form.style.display = "none"
    });
    thankYou.style.display = "block";
    submitBtn.value = "Fermer";
    submitBtn.addEventListener("click", function() {
      modalBg.style.display = "none";
      thankYou.style.display = "none";
      submitBtn.value = "C'est parti!";
      formData.forEach(form => {
        form.style.display = "block"
      });
    })
  }
}

