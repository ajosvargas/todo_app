const form = document.getElementById("todo-form");
const todoContainer = document.querySelector("#todo-container");
let task = document.querySelector(".input");
let counter = 0;

todoContainer.addEventListener("click", removeChecked);

function removeChecked(e) {
    let todos = localStorage.getItem("todos");
    let parsedTodos = JSON.parse(todos);
    if (e.target.tagName === "INPUT") {
        for(let i = 0; i < parsedTodos.length; i++){
            if(parsedTodos[i].button === e.target.nextElementSibling.nextElementSibling.getAttribute('data-task')){
                if(parsedTodos[i]['checked'] === false){
                    parsedTodos[i]['checked'] = true;
                } else {
                    parsedTodos[i]['checked'] = false;
                }
                break;
            }
        }
        e.target.nextElementSibling.classList.toggle("strike-through");
    }else if(e.target.tagName === "BUTTON") {
        for(let i = 0; i < parsedTodos.length; i++){
            if(parsedTodos[i].button === e.target.getAttribute('data-task')){
                parsedTodos.splice(i,1);
                break;
            }
        }
        e.target.parentElement.remove();
    }
    if(parsedTodos.length === 0){
        localStorage.removeItem('todos');
    } else {
        localStorage.setItem('todos', JSON.stringify(parsedTodos));
    }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let div = document.createElement("div");
  div.classList.add("task-container");
  todoContainer.append(div);
  let todoRow = createTask();
  for (let i = 0; i < todoRow.length; i++) {
    todoRow[i].classList.add("new-task");
    div.append(todoRow[i]);
  }
  storeObject(todoRow);
  localStorage.setItem('counter',`${counter}`)
  task.value = "";
  counter++;
});

function createTask() {
  let checkbox = document.createElement("input");
  let todo = document.createElement("p");
  let button = document.createElement("button");
  checkbox.setAttribute("type", "checkbox");
  checkbox.classList.add("complete-remove");
  todo.innerText = `${task.value}`;
  todo.classList.add("task");
  button.innerText = "Remove";
  button.classList.add("complete-remove");
  button.setAttribute('data-task',`task${counter}`)
  return [checkbox, todo, button];
}

function storeObject(task) {
  let obj = {
    checked: task[0].checked,
    text: task[1].innerText,
    button: task[2].getAttribute('data-task'),
  };

  if (localStorage.todos === undefined) {
    let currentTodos = [];
    currentTodos.push(obj);
    localStorage.setItem("todos", JSON.stringify(currentTodos));
  } else {
    let storageTodos = localStorage.getItem("todos");
    currentTodos = JSON.parse(storageTodos);
    currentTodos.push(obj);
    localStorage.setItem("todos", JSON.stringify(currentTodos));
  }
}
