document.addEventListener("DOMContentLoaded", () => {
  //we are goint select all the html elements that is going to be affected
  const todoTitle = document.getElementById("todoTitle");
  const todoDesc = document.getElementById("todoDesc");
  const addBtn = document.getElementById("addBtn");
  const todoList = document.getElementById("todoList");

  //We need load todos from local storage and save it into our localstorage
  //we need to get something from the local storage if there is something called todos it should provide us the todos, if there is no todos it should provide us an empty array[]
  //Also we need to convert the todos from json string to  javascript object by using JSON.parse() method
  //"todos" here is a placeholder
  const todos = JSON.parse(localStorage.getItem("todos")) || []; //if there is no todos in
  //  console.log(todos);
  //We gonna have separation of concerns so after loading the todos, we gonna fetch the todos and display it on the page
  //Also this function gonna render todos
  function renderTodos() {
    //This function gonna insert html with a dynamic data, here we gonna take todoList
    todoList.innerHTML = todos
      .map(
        (todo, index) => `<div class="card todo-item">
            <div class="todo-content">
              <h3>${todo.title}</h3>
              <p>${todo.description}</p>
              <span class="status status-pending">Pending</span>
            </div>
            <!-- Actions  -->
            <div class="todo-actions">
              <button onclick="editTodo(${index})" class="btn edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <button onclick="deleteTodo(${index})" class="btn delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>`
      )
      .join("");
  }
  //We are gonna call this function here as soon as it gets loaded
  renderTodos();
  //Now we are going to a function that will help us add new todo and save it into our localstorage
  //For the function, we gonna use normal function here
  function addTodo() {
    //the first step is that, we need to get whatever the user is providing from the input field
    //And this is how we are going to get it and when we say todoTitle.value means we need the value of whatever the user is typing from the frontend
    //when we say .trim() means we want to sanitized it
    const title = todoTitle.value.trim();
    const description = todoDesc.value.trim();
    //Now a user might not provide a data and also decide to click on the button, when it happens so what should the app tells the user?
    //Now we are going to use a function to handle that here
    if (title) {
      //if the user provide title the we gonna take new todos and push method to push the object into todos array
      todos.push({
        //Here we are providing our custom property as title and description, the value as title and description respectively
        // title:title,
        // description:description
        //Also in ES6 feature when the property and value of an object is the same we can choose to maintain one to simplify it
        title,
        description,
      });
      //After pushing, we want to empty the form and we can do so by doing
      todoTitle.value = "";
      todoDesc.value = "";
    }
    renderTodos();
    //Now it is time to save todos here into our localstorage
    // console.log(todos);
    //To save data into the localstorage we need to convert javascript object into json string by using json.stringify() and then we gonna pass in todos variable
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  //Delete todo function
  window.deleteTodo = (todoIndex) => {
    todos.splice(todoIndex, 1);
    //After deleting we must to update the UI and this is where renderTodos comes in
    renderTodos();
  };

  //Edit todo function
  window.editTodo = (todoIndex) => {
    //To be able to edit todos, we need to get the todos that we gonna edit
    const todoToEdit = todos[todoIndex];
    todoTitle.value = todoToEdit.title || "";
    todoDesc.value = todoToEdit.description || "";
    todos.splice(todoIndex, 1);
    renderTodos();
  };
  //Now when the user click on the button, we are going to call this function addTodo
  //And we will called the selected button and add event listener to it
  addBtn.addEventListener("click", addTodo);
});
