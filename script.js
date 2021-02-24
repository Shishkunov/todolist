const todos = [];
const input = $('#task_value');
let idGen = 0;

function todoCheckboxClicked(event) {
    const todoId = event.data.todoId;
    const checked = event.target.checked;
    const todo = todos.find(todo => todo.id === todoId);
    const previousState = todo.status;
    todo.status = checked;
    if (previousState !== checked) {
        const finishedTodos = todos.filter(todo => todo.status === true);
        updateView(finishedTodos, $('#completedTodoList'));
    }
}

function removeTodo(event) {
    const todoId = event.data.todoId;
    const todoIndex = todos.findIndex(todo => todo.id === todoId);
    if (todoIndex === -1) {
        return;
    }
    todos.splice(todoIndex, 1);
    updateView(todos, $('#listToDo'));
    const finishedTodos = todos.filter(todo => todo.status === true);
    updateView(finishedTodos, $('#completedTodoList'));
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
        ul.append(`<li class="task-li" id=${todo.id}><div><input id="${todo.id}_checkbox" type="checkbox" ${todo.status ? 'checked' : ''}>${todo.text}<button class="del-btn" id="${todo.id}_del_btn">delete</button></div></li>`);
        $(`#${todo.id}_checkbox`).on('click', { todoId: todo.id }, todoCheckboxClicked);
        $(`#${todo.id}_del_btn`).on('click', { todoId: todo.id }, removeTodo);
    });
}


$('#addButton').on('click', function() {
    addTodo();
});


function markAllCompleted() {
    todos.forEach(function(todo) {
        todo.status = true;
    });
    updateView(todos, $('#listToDo'));
    updateView(todos, $('#completedTodoList'));
}

$('#markAllComplete').on('click', function() {
    markAllCompleted();
});
