var taskInput = document.getElementById("new-task"); // Add a new task
var addButton = document.querySelector(".new-task__btn-add");
var incompleteTaskHolder = document.querySelector(".section__incomplete-tasks");
var completedTasksHolder = document.querySelector(".section__completed-tasks");


// New task list item
var createNewTaskElement = function (taskString) {
    var listItem = document.createElement("li");
    var checkBox = document.createElement("input");
    var label = document.createElement("label");
    var editInput = document.createElement("input");
    var editButton = document.createElement("button");
    var deleteButton = document.createElement("button");
    var deleteButtonImg = document.createElement("img");

    label.innerText = taskString;
    label.className = "task";

    // Each elements, needs appending
    checkBox.type = "checkbox";
    checkBox.className = "checkbox";
    editInput.type = "text";
    editInput.className = "task";

    editButton.innerText = "Edit";
    editButton.className = "btn-edit";

    deleteButton.className = "btn-delete";
    deleteButtonImg.src = "./icon-delete.svg";
    deleteButtonImg.className = "btn-delete__icon";
    deleteButtonImg.setAttribute("alt", "Delete note button");
    deleteButton.appendChild(deleteButtonImg);

    // And appending
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
};


var addTask = function () {
    console.log("Add Task...");
    // Create a new list item with the text from the #new-task
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);
    // Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
    listItem.classList.add("list__incomplete");
};


// Edit an existing task
var editTask = function() {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");
    var listItem = this.parentNode;
    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");
    var editBtn = listItem.querySelector(".btn-edit");
    var containsClass = listItem.classList.contains("list__edit-mode");
    // If class of the parent is .list__edit-mode
    if (containsClass) {
        // Switch to .list__edit-mode
        // Label becomes the inputs value
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
        listItem.classList.add("list__incomplete");
        listItem.classList.toggle("list__edit-mode");
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = "Save";
        listItem.classList.add("list__edit-mode");
        listItem.classList.toggle("list__incomplete");
    };
};


// Delete task
var deleteTask = function () {
    console.log("Delete Task...");
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    // Remove the parent list item from the ul
    ul.removeChild(listItem);
};


// Mark task completed
var taskCompleted = function () {
    console.log("Complete Task...");
    // Append the task list item to the .section__completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
    listItem.classList.remove("list__edit-mode");
    listItem.classList.remove("list__incomplete");
    listItem.classList.add("list__completed");
};


var taskIncomplete = function () {
    // Mark task as incomplete
    console.log("Incomplete Task...");
    // When the checkbox is unchecked,
    // append the task list item to the .section__incomplete-tasks
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    if (listItem.children[3].innerText === "Edit") {
        listItem.classList.add("list__incomplete")
    } else if (listItem.children[3].innerText === "Save") {
        listItem.classList.add("list__edit-mode")
    }
    listItem.classList.remove("list__completed");
};


var ajaxRequest = function () {
    console.log("AJAX Request");
};


addButton.onclick = addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
    // Select ListItems children
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.btn-edit");
    var deleteButton = taskListItem.querySelector("button.btn-delete");
    // Bind editTask to edit button
    editButton.onclick = editTask;
    // Bind deleteTask to delete button
    deleteButton.onclick = deleteTask;
    // Bind taskCompleted to checkBoxEventHandler
    checkBox.onchange = checkBoxEventHandler;
};


// Cycle over incompleteTaskHolder ul list items for each list item
for (var i=0; i<incompleteTaskHolder.children.length; i++) {
    // Bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
};


// Cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length; i++) {
    // Bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
};