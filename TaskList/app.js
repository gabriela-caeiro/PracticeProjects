//Define UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all events
loadEventListeners();

//Load all events function
function loadEventListeners(){
    //Add task event
    form.addEventListener("submit", addTask);
    //Remove task event
    taskList.addEventListener("click", removeTask);
    //Clear task event
    clearBtn.addEventListener("click", clearTasks);
    //Filter tasks
    filter.addEventListener("keyup", filterTasks);
    //DOM Load event
    document.addEventListener("DOMContentLoaded", getTasks);
}

//Get tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task){
    //Create li element
    const li = document.createElement("li");
    li.className = "collection-item";
    //Create texrt node and append to li
    li.appendChild(document.createTextNode(task));
    //Create link element
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    //Add icon 
    link.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    //Append link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
    });
    
}

//Add task
function addTask(e){
    if(taskInput.value === ""){
        alert("Add a Task");
    }
    
    //Create li element
    const li = document.createElement("li");
    li.className = "collection-item";
    //Create texrt node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create link element
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    //Add icon 
    link.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    //Append link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);

    //Store in LS
    storeTaskInLocalStorage(taskInput.value);
    //Clear input
    taskInput.value = "";

    e.preventDefault();
}

// Store Task in LS
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove Task - Clear input
function removeTask(e){
    if(e.target.parentElement.classList.contains("delete-item")) {
        if(confirm("Are You Sure?")){
            e.target.parentElement.parentElement.remove();

            //Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// Remove from LS

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1)
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));

}

//Clear all tasks
function clearTasks(){
    //taskList.innerHTML = "";

    //Faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    //Clear tasks from LS
    clearTasksFromLocalStorage();
}

//Clear from LS

function clearTasksFromLocalStorage(){
    localStorage.clear();
}

//Filter Tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
     //we can use forEach bc querySelectorAll returns a node list. If we use getElementsbyClass that will return an HTML collection which we'll have to turn into an array in order to use forEach
    document.querySelectorAll(".collection-item").forEach
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){    //if there's no match it'll equal -1
            task.style.display = "block";
        }else{
            task.style.display = "none";
        }
    })
}

