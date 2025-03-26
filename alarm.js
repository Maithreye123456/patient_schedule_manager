document.addEventListener("DOMContentLoaded", function() {
    scheduleMealNotifications();
});

function selectMeal(mealType, inputId) {
    const mealInput = document.getElementById(inputId).value;
    if (!mealInput) return;
    
    let mealList;
    let fixedTime;
    if (mealType === 'Breakfast') {
        mealList = document.getElementById("morningList");
        fixedTime = "08:00 AM";
    } else if (mealType === 'Lunch') {
        mealList = document.getElementById("afternoonList");
        fixedTime = "01:00 PM";
    } else if (mealType === 'Snacks') {
        mealList = document.getElementById("snackList");
        fixedTime = "05:00 PM";
    } else if (mealType === 'Dinner') {
        mealList = document.getElementById("eveningList");
        fixedTime = "08:00 PM";
    }

    // Create list item dynamically
    const listItem = document.createElement("li");
    listItem.style.overflow = "hidden";
    listItem.style.padding = "5px";
    listItem.style.border = "1px solid #ccc";
    listItem.style.borderRadius = "5px";
    listItem.style.background = "#f9f9f9";

    listItem.innerHTML = `
        <input type="checkbox" onclick="toggleMeal(this)">
        ${mealType}: ${mealInput} <span style="color: gray; font-size: 0.8em;">(${fixedTime})</span>
        <button onclick="removeMeal(this)">❌</button>
    `;
    mealList.appendChild(listItem);
    document.getElementById(inputId).value = "";

    // Save to database via AJAX (Fetch API)
    saveMealToDB(mealType, mealInput, fixedTime);
}

// Function to save meal to database
function saveMealToDB(mealType, mealName, mealTime) {
    fetch('get_reminders.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            type: mealType, 
            name: mealName, 
            time: mealTime 
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("Meal saved successfully!");
        } else {
            console.error("Error saving meal:", data.error);
        }
    })
    .catch(err => console.error("Fetch error:", err));
}

function toggleMeal(checkbox) {
    const listItem = checkbox.parentElement;
    if (checkbox.checked) {
        listItem.style.textDecoration = "line-through";
    } else {
        listItem.style.textDecoration = "none";
    }
}

function removeMeal(button) {
    button.parentElement.remove();
}

function playNotificationSound() {
    const audio = new Audio('notification.mp3');
    audio.play();
}

function scheduleMealNotifications() {
    const meals = [
        { name: "Breakfast", time: "08:00 AM" },
        { name: "Lunch", time: "01:00 PM" },
        { name: "Snacks", time: "05:00 PM" },
        { name: "Dinner", time: "08:00 PM" }
    ];
    
    meals.forEach(meal => {
        const now = new Date();
        const mealTime = new Date();
        const [hours, minutes, period] = meal.time.split(/[: ]/);
        let mealHour = parseInt(hours, 10);
        if (period === "PM" && mealHour !== 12) mealHour += 12;
        if (period === "AM" && mealHour === 12) mealHour = 0;
        mealTime.setHours(mealHour, parseInt(minutes, 10), 0);
        
        let timeDiff = mealTime - now;
        if (timeDiff < 0) timeDiff += 24 * 60 * 60 * 1000;
        
        setTimeout(() => {
            playNotificationSound();
            alert(`It's time for ${meal.name}! Scheduled time: ${meal.time}`);
        }, timeDiff);
    });
}
