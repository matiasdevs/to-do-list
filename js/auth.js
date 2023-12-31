
/* Função que trata a submissão do Formulário com o Firebase */
authForm.onsubmit = function (event){
  showItem(loading)
  event.preventDefault()
  if (authForm.submitAuthForm.innerHTML == 'Acessar'){
    firebase.auth().signInWithEmailAndPassword(authForm.email.value, authForm.password.value).catch(function(error){
      showError('Falha no acesso: ', error)
    })
  } else {
    firebase.auth().createUserWithEmailAndPassword(authForm.email.value, authForm.password.value).catch(function(error){
      showError('Falha no cadastro: ', error)
    })
  }
  
}

/* Função que trata a autenticação com o Firebase */
let isFirebaseAppDefined = false;
    setInterval(() => {
      if (!isFirebaseAppDefined) {
        if (firebase.app()) {
          firebase.auth().onAuthStateChanged(function (user){
            hideItem(loading)
            if (user) {
              showUserContent(user)
            } else {
              showAuth()
            }
          })
          isFirebaseAppDefined = true;
        }
      }
    }, 100);

function signOut(){
  firebase.auth().signOut().catch(function (error){
    showError('Falha ao sair da conta: ', error)
  })
}

/* Validação do email já cadastrado*/
function sendEmailVerification(){
  showItem(loading)
  let user = firebase.auth().currentUser
  user.sendEmailVerification(actionCodeSettings).then(function (){
    alert(`E-mail de verificação enviado para ${user.email}`)
  }).catch(function (error){
    showError('Falha ao enviar e-mail de verificação: ', error)
  }).finally(function (){
    hideItem(loading)
  })
}

/*Redefinição de Senha */
function sendPasswordResetEmail(){
  let email = prompt('Redefinir senha! Informe seu e-mail:', authForm.email.value)
  if(email) {
    showItem(loading)
    firebase.auth().sendPasswordResetEmail(email, actionCodeSettings).then(function (){
      alert('E-mail de redefinição de senha enviado para: ' + email )
    }).catch(function(error){
      showError('Falha ao enviar e-mail de redefinição de senha: ', error)
    }).finally(function(){
      hideItem(loading)
    })
  } else {
    alert('Preenchimento do campo de e-mail obrigatório!')
  }
}

/*Login com o Google*/
function signInWithGoogle() {
  showItem(loading)
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(function (error) {
    showError('Falha ao autenticar usando o Google: ', error)
    hideItem(loading)
  })
}

/*Login com o GitHub*/
function signInWithGitHub() {
  showItem(loading)
  firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider()).catch(function (error) {
    showError('Falha ao autenticar usando o GitHub: ', error)
    hideItem(loading)
  })
}

/*Login com o Facebook*/
function signInWithFacebook() {
  showItem(loading)
  firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider()).catch(function (error) {
    showError('Falha ao autenticar usando o Facebook: ', error)
    hideItem(loading)
  })
}

/*Atualiza nome de usuário */
function updateUserName() {
  let newUserName = prompt('Informe um novo nome de usuário.', userName.innerHTML)
  if (newUserName && newUserName != '') {
    userName.innerHTML = newUserName
    showItem(loading)
    firebase.auth().currentUser.updateProfile({
      displayName: newUserName
    }).catch(function (error) {
      showError('Falha ao autenticar o nome de usuário: ', error)
    }).finally(function () {
      hideItem(loading)
    })
  } else {
    alert('O nome de usuário não pode ser vazio')
  }
}

/*Remover conta do usuário */
function deleteUserAccount(){
let confirmation = confirm('Realmente deseja excluir a sua conta?')
  if (confirmation) {
    showItem(loading)
    firebase.auth().currentUser.delete().then(function () {
      alert('Conta removida com sucesso')
    }).catch(function (error) {
      showError('Falha ao remover a sua conta: ', error)
    }).finally(function () {
      hideItem(loading)
    })
  }
}