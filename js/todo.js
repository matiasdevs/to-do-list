/*Submiss]ao de tarefas*/
todoForm.onsubmit = function (event) {
  event.preventDefault()
  if(todoForm.name.value != ''){
    let data = {
      name: todoForm.name.value
    }
    dbRefUsers.child(firebase.auth().currentUser.uid).push(data).then(function(){
      console.log('Tarefa ' + data.name + ' adicionada')
    }).catch(function(error){
      showError('Falha ao adicionar tarefa', error)
    })
  } else {
    alert('O campo "Tarefa" não pode estar vazio')
  }
}

/*Exibe a lista de tarefas do usuário  */
function fillTodoList(dataSnapshot){
  let inputName = document.getElementById('name')
  ulTodoList.innerHTML = ''
  let num = dataSnapshot.numChildren()
  todoCount.innerHTML = num + (num > 1 ? ' Tarefas' : ' Tarefa') + ':'
  dataSnapshot.forEach(function(item){
    let value = item.val()
    let li = document.createElement('li')
    let spanLi = document.createElement('span')
    spanLi.appendChild(document.createTextNode(value.name))
    li.appendChild(spanLi)
    ulTodoList.appendChild(li)
    
  })
  inputName.value = ''
}