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

function showValidation({index, validation}) {
  if(validation) {
    if(validationTexts[index]) validationTexts[index].style.display = "none";
  }
  else {
    if(validationTexts[index]) validationTexts[index].style.display = "block";
  }
}

// first name validation
const firstNameInput = document.querySelector(".formData:nth-child(1) input");

firstNameInput.addEventListener("blur", firstNameValidation)
firstNameInput.addEventListener("input", firstNameValidation)

function firstNameValidation() {
  if(firstNameInput.value.length >= 2) {
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
  if(lastNameInput.value.length >= 2) {
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