const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const submitBtn = document.querySelector(".js-submit-btn");

const dayOutput = document.querySelector(".js-output-day");
const monthOutput = document.querySelector(".js-output-month");
const yearOutput = document.querySelector(".js-output-year");


submitBtn.addEventListener("click", () => {
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    let ageDay = currentDay - day;
    let ageMonth = currentMonth - month;
    let ageYear = currentYear - year;

    if (currentMonth < month || (currentMonth == month && currentDay < day)) {
        ageYear--;
        ageMonth += 11;

    }

    dayOutput.innerHTML = ageDay;
    monthOutput.innerHTML = ageMonth;
    yearOutput.innerHTML = ageYear;
});
