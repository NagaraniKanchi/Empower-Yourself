let todoItemsContainer = document.getElementById('todoItemsContainer');

let addButton = document.getElementById("addButton");

let userInput = document.getElementById('userInput');

let saveTodo = document.getElementById('saveTodo');

// let todoList=[
// {
// text:"Learn Html",
// unqueNo:1
// },
// {
// text:"Learn Css",
// unqueNo:2
// },
// {
// text:"Learn JavaScript",
// unqueNo:3
// }
// ];
function getTodoListFromLocalStorage() {
let stringifiedTodoList = localStorage.getItem("todoList");
let parsedTodoList = JSON.parse(stringifiedTodoList);
if (parsedTodoList === null) {
return [];
}
else {
return parsedTodoList;
}

}
let todoList = getTodoListFromLocalStorage();
saveTodo.onclick = function () {
localStorage.setItem("todoList", JSON.stringify(todoList));
}

let todoCount = todoList.length;

function onTodoStatusChange(checkboxId, labelId) {
let checkboxEl = document.getElementById(checkboxId);
let labelEl = document.getElementById(labelId);
labelEl.classList.toggle("checked");
// if(checkboxEl.checked===true)
// {
// labelEl.classList.add("checked");

// }
// else{
// labelEl.classList.remove("checked");
// }
}

function onDeleteIcon(todoId) {
let todoEl = document.getElementById(todoId);
todoItemsContainer.removeChild(todoEl);
}
function createAndAppendTodo(todo) {
let todoId = "todoId" + todo.unqueNo;
let checkboxId = "checkboxId" + todo.unqueNo;
let labelId = "lableId" + todo.unqueNo;

let todoElement = document.createElement('li');
todoElement.classList.add("d-flex", "flex-row", "todo-item-container");
todoElement.id = todoId;
todoItemsContainer.appendChild(todoElement);

let inputElement = document.createElement('input');
inputElement.classList.add("checkbox-input");
inputElement.type = "checkbox";
inputElement.id = checkboxId;
inputElement.onclick = function () {
onTodoStatusChange(checkboxId, labelId);
}
todoElement.appendChild(inputElement);

let labelContainer = document.createElement('div');
labelContainer.classList.add("d-flex", "flex-row", "label-container");
todoElement.appendChild(labelContainer);

let labelElement = document.createElement('label');
labelElement.setAttribute('for', checkboxId);
labelElement.classList.add("checkbox-label");
labelElement.id = labelId;

labelElement.textContent = todo.text;
labelContainer.appendChild(labelElement);

let deleteIconContainer = document.createElement('div');
deleteIconContainer.classList.add("delete-icon-container");
labelContainer.appendChild(deleteIconContainer);


let deleteIcon = document.createElement('li');
deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon")
deleteIcon.onclick = function () {
onDeleteIcon(todoId);
}
deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
createAndAppendTodo(todo);
}

function onAddTodo() {
let userInputText = userInput.value;
if (userInputText === "") {
alert("Please Enter Valid Text");
}
else {
todoCount += 1;

let newTodo = {
text: userInputText,
unqueNo: todoCount
}
todoList.push(newTodo);
createAndAppendTodo(newTodo);
}
userInput.value = "";
}

addButton.onclick = function () {
onAddTodo();
}
console.log(todoItemsContainer);