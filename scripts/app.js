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

const CURRENT_YEAR = new Date().getFullYear();

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

submitBtn.addEventListener("click", () => {
  const isDayValid = validateInput(
    dayInput,
    dayLabel,
    requiredLabelDay,
    "day",
    1,
    31,
    CURRENT_YEAR
  );
  const isMonthValid = validateInput(
    monthInput,
    monthLabel,
    requiredLabelMonth,
    "month",
    1,
    12,
    CURRENT_YEAR
  );
  const isYearValid = validateInput(
    yearInput,
    yearLabel,
    requiredLabelYear,
    "year",
    1900,
    CURRENT_YEAR,
    CURRENT_YEAR
  );

  if (isDayValid && isMonthValid && isYearValid) {
    calcAge();
  }
});

function validateInput(
  input,
  label,
  requiredLabel,
  dateType,
  minVal,
  maxVal,
  currentYear
) {
  if (input.value === "") {
    label.style.color = "var(--Light-red)";
    requiredLabel.style.display = "block";
    requiredLabel.innerHTML = "This field is required";
    document.getElementById(dateType).style.border =
      "1px solid var(--Light-red)";
    return false;
  } else if (
    input.value < minVal ||
    input.value > maxVal ||
    input.value > currentYear
  ) {
    label.style.color = "var(--Light-red)";
    if (dateType === "year" && input.value > currentYear) {
      requiredLabel.innerHTML = "Must be in the past";
    } else {
      requiredLabel.innerHTML = "Must be a valid " + dateType;
    }
    requiredLabel.style.display = "block";
    document.getElementById(dateType).style.border =
      "1px solid var(--Light-red)";
    return false;
  } else {
    label.style.color = "";
    requiredLabel.style.display = "none";
    document.getElementById(dateType).style.border = "";
    return true;
  }
}
