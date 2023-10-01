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