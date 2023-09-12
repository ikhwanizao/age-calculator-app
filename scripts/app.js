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
  var dayVal = document.getElementById("day").value;
  var monthVal = document.getElementById("month").value;
  var yearVal = document.getElementById("year").value;

  var date = new Date();
  var nowDay = date.getDate();
  var nowMonth = 1 + date.getMonth();
  var yearMonth = date.getFullYear();
  var month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (dayVal > nowDay) {
    nowDay = nowDay + month[nowMonth - 1];
    nowMonth = nowMonth - 1;
  }
  if (monthVal > nowMonth) {
    nowMonth = nowMonth + 12;
    yearMonth = yearMonth - 1;
  }
  var d = nowDay - dayVal;
  var m = nowMonth - monthVal;
  var y = yearMonth - yearVal;

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
  const inputValue = input.value;
  const inputValueNumber = Number(inputValue);

  if (inputValue === "") {
    // Handle empty input
    label.style.color = "var(--Light-red)";
    requiredLabel.style.display = "block";
    requiredLabel.innerHTML = "This field is required";
    document.getElementById(dateType).style.border =
      "1px solid var(--Light-red)";
    return false;
  } else if (
    isNaN(inputValueNumber) ||
    inputValueNumber < minVal ||
    inputValueNumber > maxVal
  ) {
    // Handle invalid number or out-of-range input
    label.style.color = "var(--Light-red)";
    requiredLabel.innerHTML = "Must be a valid " + dateType;
    requiredLabel.style.display = "block";
    document.getElementById(dateType).style.border =
      "1px solid var(--Light-red)";
    return false;
  } else if (dateType === "day") {
    // Check for valid day based on selected month
    const selectedMonth = Number(monthInput.value);
    const daysInMonth = new Date(currentYear, selectedMonth, 0).getDate();

    if (inputValueNumber > daysInMonth) {
      label.style.color = "var(--Light-red)";
      requiredLabel.innerHTML = "Must be a valid date";
      requiredLabel.style.display = "block";
      document.getElementById(dateType).style.border =
        "1px solid var(--Light-red)";
      return false;
    }
  } else if (dateType === "year" && inputValueNumber > currentYear) {
    // Handle year in the future
    label.style.color = "var(--Light-red)";
    requiredLabel.innerHTML = "Must be in the past";
    requiredLabel.style.display = "block";
    document.getElementById(dateType).style.border =
      "1px solid var(--Light-red)";
    return false;
  }

  // If all checks pass, the input is considered valid
  label.style.color = "";
  requiredLabel.style.display = "none";
  document.getElementById(dateType).style.border = "";
  return true;
}
