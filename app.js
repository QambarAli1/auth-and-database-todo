var database = firebase.database().ref('todos/')
function addTodo() {
    var getInptodo = document.getElementById('inptTodo');
    var inputs = getInptodo.value;
    var key = database.push().key
    database.push({
        key: key,
        value: inputs,
    });
}



database.on('child_added', function (data) {
    var getInptodo = document.getElementById('inptTodo');
    var getUl = document.getElementById('todoList');

    var divForList = document.createElement('div');
    divForList.setAttribute('class', 'todos')
    var inpTodoValue = document.createTextNode(data.val().value);
    var para = document.createElement('p')
    para.setAttribute('class', 'textOfTodo')
    para.appendChild(inpTodoValue);
    divForList.appendChild(para);
    var todoItems = getUl.appendChild(divForList);
    var divForIcons = document.createElement('div');
    divForIcons.setAttribute('class', 'iconsofTodo')
    var createTrash = document.createElement('i');
    createTrash.setAttribute("id",data.val().key)
    createTrash.setAttribute("class", "fa fa-trash");
    createTrash.setAttribute("aria-hidden", "true");
    divForList.appendChild(createTrash);
    createTrash.setAttribute("onclick", "dlt(this)")
    var createEdit = document.createElement('i');
    createEdit.setAttribute('id',data.val().key)
    createEdit.setAttribute("class", "fa fa-pencil-square-o");
    createEdit.setAttribute("aria-hidden", "true");
    divForList.appendChild(createEdit);
    createEdit.setAttribute("onclick", "edit(this)")

    getInptodo.value = ""
})


function dltAll() {
    var getUl = document.getElementById('todoList');
    getUl.innerHTML = '';
    var getInptodo = document.getElementById('inptTodo');
    getInptodo.value = ''
    firebase.database().ref("todos").remove();

}
function dlt(e) {
    e.parentNode.remove();
    firebase.database().ref('todos/').child(e.id).remove()
    console.log(e.id)
}
function edit(e) {
    var chngetxt = prompt('Ëdit', e.parentNode.firstChild.textContent);
    e.parentNode.firstChild.textContent = chngetxt;
    console.log(e.id)
    var editTodo = {
        value: chngetxt,
        key: e.id,
    } 
    firebase.database().ref('todos/').child(e.id).set(editTodo)
}





function loginFb(){
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;
    window.location.href("todo.html")
    // console.log(result)

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // console.log(error)

    // ...
  });
}


