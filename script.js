document.addEventListener('DOMContentLoaded', () => {
    const todoinput = document.getElementById("todo-input");
 const addtaskbutton = document.getElementById("add-task-btn");
const todolist = document.getElementById("todo-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach((tasks) => renderTask(tasks));

addtaskbutton.addEventListener('click' , () => {
    const tasktext = todoinput.value.trim();
    if( tasktext === "") return;

    const newtask = {
        id: Date.now(),
        text:tasktext,
        completed:false,
    }
    tasks.push(newtask);
    saveTasks();
    renderTask(newtask);
    todoinput.value= "";
    console.log(tasks)
});

function renderTask(task){
  const li = document.createElement('li')
  li.setAttribute("data-id", task.id)
  if(task.completed) li.classList.add("completed")
  li.innerHTML = `
  <span>${task.text}</span>
  <button>delete</button>
  `;
  li.addEventListener('click', (e) => {
    if(e.target.tagName === "BUTTON")  return;
    task.completed = !task.completed;
    li.classList.toggle('completed');
    saveTasks();
  });

  li.querySelector('button').addEventListener('click', (e) => {
    e.stopPropagation() //prevent toggle from firing
    tasks = tasks.filter((t) => t.id !== task.id)
    li.remove();
     saveTasks();
  });

  todolist.appendChild(li);
}

function saveTasks() {
localStorage.setItem('tasks', JSON.stringify(tasks));
}
})