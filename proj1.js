const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from local storage on page load
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
savedTasks.forEach(taskText => {
    createTaskElement(taskText);
});

addTaskBtn.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        createTaskElement(taskText);
        saveTask(taskText);
        taskInput.value = "";
    }
}

function createTaskElement(taskText) {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        ${taskText}
        <button class="deleteBtn">Delete</button>
    `;
    taskList.appendChild(taskItem);

    const deleteBtn = taskItem.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", () => {
        taskList.removeChild(taskItem);
        removeTask(taskText);
    });
}

function saveTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}