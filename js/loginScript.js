"use strict";

function generateRandomString(length) {
  let result = "";
  const characters = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 10);
}

function generateTextCaptcha() {
  document.getElementById("captcha").innerText = generateRandomString(6);
}

function generateMathCaptcha() {
  const num1 = generateRandomNumber();
  const num2 = generateRandomNumber();
  document.getElementById("captcha").innerText = `${num1}+${num2}`;
  return num1 + num2;
}

function validateCaptcha(event) {
  event.preventDefault();
  k += 1;
  const captchaInput = document.getElementById("captchaInput").value;
  if (k == 1 && !isEmpty(captchaInput)) {
    if (
      captchaInput.toLowerCase() ===
      document.getElementById("captcha").innerText.toLowerCase()
    ) {
      document.getElementById("button-g").disabled = false;
      document.getElementById("captchaForm").display = "none";
    } else {
      res = generateMathCaptcha();
    }
  } else if (!isEmpty(captchaInput)) {
    console.log(captchaInput);
    console.log(res);
    if (captchaInput == res) {
      document.getElementById("button-g").disabled = false;
    } else {
      alert("Ошибка");
      window.location.href = "#";
    }
  }
}

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

let k = 0;
let res;

generateTextCaptcha();

function fun() {
  window.location.href = "#";
}
