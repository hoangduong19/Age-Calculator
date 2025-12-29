let currentMonth;
let currentYear;

let selectedDay = null;
let selectedMonth = null;
let selectedYear = null;

document.addEventListener("DOMContentLoaded", () => {
    init();

    document.getElementById("prev-month-button")
        .addEventListener("click", prevMonth);

    document.getElementById("next-month-button")
        .addEventListener("click", nextMonth);
    
    document.getElementById("open-calendar-button")
        .addEventListener("click", openCalendar);
    
    document.getElementById("calendar-overlay")
        .addEventListener("click", e => {
            if (e.target.id === "calendar-overlay") {
                closeCalendar();
            }
        });
    
    document.getElementById("calculate-button")
        .addEventListener("click", calculateAge);
});

function init() {
    const now = new Date();
    currentMonth = now.getMonth();
    currentYear = now.getFullYear();
    renderCalendar(currentYear, currentMonth);
}

function renderCalendar(year, month) {
    const calendarGrid = document.getElementById("calendar-grid");
    calendarGrid.innerHTML = `
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
        <div>Sun</div>
    `;

    document.getElementById("current-month").textContent = new Date(currentYear, currentMonth).toLocaleString("en-US", { month: "long" });
    document.getElementById("current-year").textContent = currentYear;


    const firstDay = new Date(year, month, 1).getDay(); //index của ngày đầu tiên của tháng
    const startIndex = (firstDay + 6) % 7; // Chuyển chủ nhật thành 6, thứ hai thành 0, thứ ba thành 1...
    const daysInMonth = new Date(year, month + 1, 0).getDate(); //Ngày cuối cùng của tháng hiện tại
    const prevDaysInMonth = new Date(year, month, 0).getDate(); //Ngày cuối cùng của tháng trước
    

    for (let i=startIndex - 1; i>=0; i--) {
        const div = document.createElement('div');
        div.className = "day inactive";
        div.textContent = prevDaysInMonth - i;
        div.addEventListener("click", () => { 
            prevMonth();
        });
        calendarGrid.appendChild(div);
    }
    
    for (let d = 1; d <= daysInMonth; d++) {
        const div = document.createElement('div');
        div.textContent = d;
        div.className = "day";
        
        div.addEventListener("click", () => { 
            selectedDay = d;
            selectedMonth = month;
            selectedYear = year;
            updateDateUI();
            closeCalendar();
        });
        calendarGrid.appendChild(div);
    }

    let remainingCells = 42 - daysInMonth - startIndex;
    for (let i = 1; i <= remainingCells; i++) {
        const div = document.createElement('div');
        div.className = "day inactive";
        div.textContent = i;
        div.addEventListener("click", () => { 
            nextMonth();
        });
        calendarGrid.appendChild(div);
    }
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentYear, currentMonth);
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentYear, currentMonth);
}

function openCalendar() {
    const overlay = document.getElementById("calendar-overlay");
    overlay.classList.add("active");
}

function closeCalendar() {
    const overlay = document.getElementById("calendar-overlay");

    overlay.classList.remove("active");
}

function updateDateUI() {
    document.getElementById("birth-day").textContent = selectedDay;
    document.getElementById("birth-month").textContent = selectedMonth + 1;
    document.getElementById("birth-year").textContent = selectedYear;
}

function calculateAge() {
    
    const today = new Date();
    const birthDate = new Date(selectedYear, selectedMonth, selectedDay);
    let monthCalculation = today.getMonth() - birthDate.getMonth();
    let yearCalculation = today.getFullYear() - birthDate.getFullYear();

    if (today.getMonth() < birthDate.getMonth() || today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate()) {
        yearCalculation--;
        monthCalculation += 11;
    }

    
    document.getElementById("current-age-month").textContent = monthCalculation;
    document.getElementById("current-age-year").textContent = yearCalculation;

}