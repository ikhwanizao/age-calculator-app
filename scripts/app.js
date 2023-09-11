const submitBtn = document.querySelector(".js-submit-btn");

const dayLabel = document.querySelector(".js-day-label");
const monthLabel = document.querySelector(".js-month-label");
const yearLabel = document.querySelector(".js-year-label");

const requiredLabelDay = document.querySelector(".js-required-field-day");
const requiredLabelMonth = document.querySelector(".js-required-field-month");
const requiredLabelYear = document.querySelector(".js-required-field-year");

const yearOutput = document.querySelector(".js-output-year");
const monthOutput = document.querySelector(".js-output-month");
const dayOutput = document.querySelector(".js-output-day");

const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

function calcAge() {
  var d1 = document.getElementById("day").value;
  var m1 = document.getElementById("month").value;
  var y1 = document.getElementById("year").value;

  var date = new Date();
  var d2 = date.getDate();
  var m2 = 1 + date.getMonth();
  var y2 = date.getFullYear();
  var month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (d1 > d2) {
    d2 = d2 + month[m2 - 1];
    m2 = m2 - 1;
  }
  if (m1 > m2) {
    m2 = m2 + 12;
    y2 = y2 - 1;
  }
  var d = d2 - d1;
  var m = m2 - m1;
  var y = y2 - y1;

  yearOutput.innerHTML = y;
  monthOutput.innerHTML = m;
  dayOutput.innerHTML = d;
}

function emptyInput(input, label, requiredLabel, dateType) {
  input.addEventListener("input", () => {
    if (input.value === "") {
      label.style.color = "var(--Light-red)";
      requiredLabel.style.display = "block";
      document.getElementById(dateType).style.border = "1px solid var(--Light-red)";
    } else {
      label.style.color = "";
      requiredLabel.style.display = "none";
      document.getElementById(dateType).style.border = "";
    }
  });
}

emptyInput(dayInput, dayLabel, requiredLabelDay, "day");
emptyInput(monthInput, monthLabel, requiredLabelMonth, "month");
emptyInput(yearInput, yearLabel, requiredLabelYear, "year");

submitBtn.addEventListener("click", () => {
  calcAge();
});
