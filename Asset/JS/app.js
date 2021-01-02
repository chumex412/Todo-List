'use strict';

let form = document.getElementById('todoForm');
let todoList = document.querySelector('.todo-list');
let todoInput = form.querySelector('.todo');
let clearButton = document.querySelector('.clear-todo');

getEvent();

function getEvent() {
  // Load Event Listener
  document.addEventListener('DOMContentLoaded', getTodo);
  // Add task event
  form.addEventListener('submit', createTodo);
  //Remove Items from list
  todoList.addEventListener('click', removeItem);
  // Remove task event
  clearButton.addEventListener('click', clearTodo);
}

// Get Todo from LS
function getTodo() {
  let tasks;
  if (localStorage.getItem('todo') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('todo'));
  }

  // Loop through task
  tasks.forEach(task => {
    // Create list item
    let todoItem = document.createElement('li');
    // Add class to List item
    todoItem.classList.add('todo-item');
    todoItem.appendChild(document.createTextNode(task));
    // Create New link
    let link = document.createElement('a');
    // Add class to link
    link.className = 'delete secondary-content';
    // set attribute
    link.href = '#';
    // Add content to link
    link.innerHTML = '<i class="fas fa-times"></i>';
    // Append link to item
    todoItem.appendChild(link);
    // Append List item to list
    todoList.appendChild(todoItem);
  });    
}

function createTodo(e) {
  
  if(todoInput.value !== '') {
    // Create list item
    let todoItem = document.createElement('li');
    // Add class to List item
    todoItem.classList.add('todo-item');
    todoItem.appendChild(document.createTextNode(todoInput.value));
    // Create New link
    let link = document.createElement('a');
    // Add class to link
    link.className = 'delete secondary-content';
    // set attribute
    link.href = '#';
    // Add content to link
    link.innerHTML = '<i class="fas fa-times"></i>';
    // Append link to item
    todoItem.appendChild(link);
    // Append List item to list
    todoList.appendChild(todoItem);
    // Store in Local storage
    storeTodoInLocalStorage(todoInput.value);
    // Clear input
    todoInput.value = '';
    e.preventDefault();
  } else
  return alert('Add todo');
}

// Local storage
function storeTodoInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('todo') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('todo'));
  }
  tasks.push(task);
  localStorage.setItem('todo', JSON.stringify(tasks))
}

// Remove item
function removeItem(e) {
  let del = e.target.parentElement.classList.contains('delete');
  let li = e.target.parentElement.parentElement;
  if(del) {
    if(confirm('Are you sure?')) {
      li.remove();

      // Remove from LS
      removeTodoFromLocalStorage(li);
    }
  }
}

// Remove from LS
function removeTodoFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('todo') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('todo'));
  }
  tasks.forEach((task, index) => {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  })
  localStorage.setItem('todo', JSON.stringify(tasks));
}

// Clear todo
function clearTodo() {
  // Remove list items
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }

  // Clear from LS
  clearTodoFromLocalStorage();
}

// Clear List from LS
function clearTodoFromLocalStorage() {
  localStorage.clear();
}