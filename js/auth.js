
/* Função que trata a submissão do Formulário com o Firebase */
authForm.onsubmit = function (event){
  showItem(loading)
  event.preventDefault()
  if (authForm.submitAuthForm.innerHTML == 'Acessar'){
    firebase.auth().signInWithEmailAndPassword(authForm.email.value, authForm.password.value).catch(function(error){
      console.log('Access Failed')
      console.log(error)
      hideItem(loading)
    })
  } else {
    firebase.auth().createUserWithEmailAndPassword(authForm.email.value, authForm.password.value).catch(function(error){
      console.log('Create Failed')
      console.log(error)
      hideItem(loading)
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
    console.log('Falha ao Sair')
    console.log(error)
  })
}

/* Validação do email já cadastrado*/
function sendEmailVerification(){
  showItem(loading)
  let user = firebase.auth().currentUser
  user.sendEmailVerification(actionCodeSettings).then(function (){
    alert(`E-mail de verificação enviado para ${user.email}`)
  }).catch(function (error){
    alert('Erro ao enviar e-mail de verificação')
    console.log(error)
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
      alert('Houve um erro ao enviar o e-mail de redefinição de senha')
      console.log(error)
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
    alert('Houve um erro ao autenticar usando o Google')
    console.log(error)
    hideItem(loading)
  })
}

