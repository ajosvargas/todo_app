const form = document.getElementById('todo-form');
const todoContainer = document.querySelector('#todo-container');
let task = document.querySelector('.input');

todoContainer.addEventListener('click', (e) => {
    if(e.target.tagName === "INPUT") {
        e.target.nextElementSibling.classList.toggle('strike-through');
    } else if(e.target.tagName === "BUTTON"){
        e.target.parentElement.remove();
    }
})

form.addEventListener('submit',(e) => {
    e.preventDefault();
    let div = document.createElement('div');
    div.classList.add('task-container');
    todoContainer.append(div);
    let todoRow = createTask();
    for(let i = 0; i < todoRow.length; i++){
        todoRow[i].classList.add('new-task');
        div.append(todoRow[i]);
    }
    storeObject(todoRow);
    task.value = "";
})

function createTask() {
    let checkbox = document.createElement('input');
    let todo = document.createElement('p');
    let button = document.createElement('button');
    checkbox.setAttribute('type','checkbox');
    checkbox.classList.add('complete-remove');
    todo.innerText = `${task.value}`;
    todo.classList.add('task');
    button.innerText = "Remove";
    button.classList.add('complete-remove');
    return [checkbox, todo, button];
}

function storeObject(task){
    let obj = {checked: task[0].checked, text:task[1].innerText, button : task[2].innerText};

    if(localStorage.todos === undefined){
        let currentTodos = [];
        currentTodos.push(obj);
        localStorage.setItem('todos', JSON.stringify(currentTodos));
    } else {
        let storageTodos = localStorage.getItem('todos');
        currentTodos = JSON.parse(storageTodos);
        currentTodos.push(obj);
        localStorage.setItem('todos',JSON.stringify(currentTodos));
    }
}