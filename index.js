var todoArray = []; // global

function saveTodos() {
    var title = document.getElementById("title").value;
    todoArray.push(title);
    localStorage.setItem("todos", todoArray.toString());
    document.getElementById("title").value = "";
    fetchAllTodos()
}

function fetchAllTodos() {
    var str = localStorage.getItem("todos");
    todoArray = str.split(",");
    var htmlString = `
    <tr>
        <th> Sr. No. </th>
        <th> title </th>
        <th> Actions </th>
    </tr>
    `;
    var counter = 0;
    todoArray.forEach((ele) => {
        counter++;
        htmlString += `
            <tr>
                <td> ${counter} </td>
                <td> ${ ele } </td>
                <td>
                    <button class="btn btn-outline-warning" onclick="editTodo(${counter-1})"> 
                    Edit </button>
                    <button class="btn btn-outline-danger" onclick="deleteTodo(${counter-1})"> Delete </button>
                </td>
            </tr>
        `
    });

    document.getElementById("todo-table").innerHTML = htmlString;
}


function editTodo(index) {
    var newValue = prompt("Do you really want to change?", todoArray[index]);
    if(newValue != null && newValue != "") {
        todoArray[index] = newValue;
        localStorage.setItem("todos", todoArray.toString());
        fetchAllTodos();
    }
}

function deleteTodo(index) {
    if(confirm(`Do you want to delete ${todoArray[index]}?`)) {
        todoArray.splice(index, 1);
        localStorage.setItem("todos", todoArray.toString());
        fetchAllTodos();
    }
}