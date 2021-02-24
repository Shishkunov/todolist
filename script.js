const todos = [];
const input = $('#task_value');
let idGen = 0;

function todoCheckboxClicked(event) {
    const todoId = event.data.todoId;
    const checked = event.target.checked;
    const todo = todos.find(todo => todo.id === todoId);
    todo.status = checked;
}

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
    input.val('');

    updateView(todos, $('#listToDo'));
}

function updateView(todosArg, ul) {
    ul.html('');
    todosArg.forEach(todo => {
        ul.append(`<li class = "task-li" id=${todo.id}><div><input type="checkbox" ${todo.status ? 'checked' : ''}>${todo.text}<button class = "del-btn">delete</button></div></li>`);
        $(`#${todo.id} div input`).on('click', { todoId: todo.id }, todoCheckboxClicked);
    });
}


$('#addButton').on('click', function() {
    addTodo();
});


function markCompleted() {
    const finishedTodos = todos
        .filter(function (todo) {
            return Boolean(todo.status);
        });
    updateView(finishedTodos, $('#completedTodoList'));
}

$('#markAllComplete').on('click', function() {
    markCompleted();
});
