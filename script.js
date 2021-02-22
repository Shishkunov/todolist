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
    input.val('')

    const ul = $('#listToDo');
    ul.html('');
    todos.forEach((todo, index) => {
        const selector = ul.append(`<li class = "task-li" id=${todo.id}><div><input type="checkbox" ${todo.status ? 'checked' : ''}>${todo.text}<button class = "del-btn">delete</button></div></li>`);
        // const todoHtmlElem = selector[0].children[index];
        // const checkBox = todoHtmlElem.children[0].children[0];
        $(`#${todo.id} div input`).on('click', { todoId: todo.id }, todoCheckboxClicked);
        // debugger;
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
