const todos = [];
const input = $('#task_value');
let idGen = 0;



function addTodo() {
    let task = input.val();
    idGen += 1;
    if (!task) {
        return false;
    }

    let todo = {
        text: task,
        status: false,
        id: `todo_${idGen}`,
    };
    
    todos.push(todo);
    console.log(todos);
    input.val('')

    const ul = $('#listToDo');
    ul.html('');
    todos.forEach(todo => {
        ul.append(`<li class = "task-li" id=${todo.id}><div><input type="checkbox" ${todo.status ? 'checked' : ''}>${todo.text}<button class = "del-btn">delete</button></div></li>`);
    });
}


$('#addButton').on('click', function() {
    addTodo();
});


function mark() {
    const ul = $('#listToDo');
    const finishedTodos = todos.filter(todo => Boolean(todo.status));

    ul.html('');
}

$('#addComplete').on('click', function() {
    mark();
});
