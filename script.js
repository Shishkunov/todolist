const todos = [];
const input = $('#task_value');
let idGen = 0;
let strs = '';



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
        isShown: false
    };
    
    todos.push(todo);

    console.log(todos);
    input.val('')

    render();
}


function render() {
    const ul = $('#listToDo');
    todos.forEach(todo => {
        if (!todo.isShown) {
            const str = `<li class = "task-li" id=${todo.id}><div><input type="checkbox" ${todo.status ? 'checked' : ''}>${todo.text}<button class = "del-btn">delete</button></div></li>`;
            strs += str;
            todo.isShown = true;
        };
    });
    ul.html('');
    ul.html(strs);
}


$('#addButton').on('click', function() {
    addTodo();
});


function mark() {
    const ul = $('#listToDo');
    const finishedTodos = todos.filter(todo => Boolean(todo.status));

    ul.html('');
    ul.html(strs);
}

$('#addComplete').on('click', function() {
    mark();
});
