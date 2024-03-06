

document.addEventListener('DOMContentLoaded', function () {
    const list = document.querySelector("#todoList");
    const todoForm = document.querySelector("#todo-form");
    const storedTodos = [];
    todoForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let newTask = document.createElement("li");
        let userInput = document.querySelector("input[type='text']").value;
        if (userInput === '') {
            alert('What task?');
            return;
        }

        let taskText = document.createElement("span");
        taskText.textContent = userInput;

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "X";

        newTask.appendChild(taskText);
        newTask.appendChild(removeBtn);

        list.appendChild(newTask);
        todoForm.reset();
    });

    list.addEventListener("click", function (e) {
        if (e.target.textContent === "X") {
            e.target.parentElement.remove();
        } else if (e.target.tagName === "SPAN") {
            let taskItem = e.target;
            taskItem.style.textDecoration = taskItem.style.textDecoration ===
                "line-through" ?
                "none" :
                "line-through";
            taskItem.style.color = taskItem.style.color ===
                "darkgray" ?
                "black" :
                "darkgray"
        }

    });
});
