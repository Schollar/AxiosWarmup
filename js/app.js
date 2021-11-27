function user_success(response) {

    for (var i = 0; i < response.data.length; i++) {
        var card_container = document.createElement('section');
        card_container.addEventListener('click', get_to_do);
        card_container.setAttribute('id', response.data[i].id);
        var user_name = document.createElement('h2');
        user_name.innerText = response.data[i].name;
        var user_email = document.createElement('p');
        user_email.innerText = response.data[i].email;
        card_container.appendChild(user_name);
        card_container.appendChild(user_email);
        user_section.appendChild(card_container);

    }


}

function user_failure(error) {
    var user_error = document.createElement('h1');
    user_error.innerText = "Sorry something went wrong!";
    user_section.appendChild(user_error);
}
// User
// To Do Container
// Success
// done to do stuff
// Failure
// Failed to do stuff
function todo_success(response) {
    var todo_container = document.createElement('section');
    var todo_status_success = document.createElement('section');
    var todo_status_fail = document.createElement('section');
    todo_status_success.innerText = "Completed Tasks";
    todo_status_fail.innerText = "Tasks To Do: ";

    for (var i = 0; i < response.data.length; i++) {
        get_parent = document.getElementById(response.data[i].userId);
        var todo_card = document.createElement('section');
        var todo_title = document.createElement('h1');
        todo_title.innerText = response.data[i].title;
        var todo_status = document.createElement('p');
        todo_status.innerText = response.data[i].completed;
        todo_card.appendChild(todo_title);
        todo_card.appendChild(todo_status);


        if (response.data[i].completed === true) {

            todo_status_success.appendChild(todo_card);
        } else {
            todo_status_fail.appendChild(todo_card);
        }

    }

    todo_container.appendChild(todo_status_success);
    todo_container.appendChild(todo_status_fail);
    get_parent.appendChild(todo_container);
}

function get_to_do() {

    axios.request({
        url: `https://jsonplaceholder.typicode.com/todos?userId=${this.id}`
    }).then(todo_success).catch(user_failure)

}


axios.request({
    url: "https://jsonplaceholder.typicode.com/users"
}).then(user_success).catch(user_failure);

var user_section = document.getElementById('user_container');
