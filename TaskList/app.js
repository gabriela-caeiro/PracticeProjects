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
    //Clear input
    taskInput.value = "";

    e.preventDefault();
}