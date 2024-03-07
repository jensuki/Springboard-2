





const todoList = document.querySelector("#todoList");
const todoForm = document.querySelector("#todoForm");

// load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

todoForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let userInput = document.querySelector("input[type='text']").value;
    if (userInput === '') {
        alert('What task?');
        return;
    }

    // create a new list item
    let newListItem = document.createElement("li");
    let taskText = document.createElement("span");
    let removeBtn = document.createElement("button");

    taskText.textContent = userInput;
    removeBtn.textContent = "X";

    newListItem.appendChild(taskText);
    newListItem.appendChild(removeBtn);
    todoList.appendChild(newListItem);

    // save tasks to localStorage
    saveTasks();

    todoForm.reset();
});

todoList.addEventListener("click", function (e) {
    if (e.target.textContent === "X") {
        // remove the task when the "X" button is clicked
        e.target.parentElement.remove();
        // save tasks to localStorage after removal
        saveTasks();
    } else if (e.target.tagName === "SPAN") {
        // toggle line-through and color for the task text when clicked
        let taskItem = e.target;
        taskItem.style.textDecoration = taskItem.style.textDecoration ===
            "line-through" ?
            "none" :
            "line-through";
        taskItem.style.color = taskItem.style.color ===
            "darkgray" ?
            "black" :
            "darkgray";

        // save tasks to localStorage after the style changes
        saveTasks();
    }
});

function saveTasks() {
    // save all tasks to localStorage
    let tasks = [];
    todoList.querySelectorAll("li").forEach(task => {
        tasks.push({
            text: task.querySelector("span").textContent,
            completed: task.querySelector("span").style.textDecoration === "line-through"
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    // load savedTasks from localStorage and add them to the list
    let storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        let tasks = JSON.parse(storedTasks);
        tasks.forEach(task => {
            let newListItem = document.createElement("li");
            let taskText = document.createElement("span");
            let removeBtn = document.createElement("button");

            taskText.textContent = task.text;
            removeBtn.textContent = "X";

            newListItem.appendChild(taskText);
            newListItem.appendChild(removeBtn);
            todoList.appendChild(newListItem);

            // set the style based on if completed
            taskText.style.textDecoration = task.completed ? "line-through" : "none";
            taskText.style.color = task.completed ? "darkgray" : "black";
        });
    }
}


