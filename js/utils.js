/*Controles do App*/
let authForm = document.getElementById('authForm');
let authFormTitle = document.getElementById('authFormTitle');

let register = document.getElementById('register');
let access = document.getElementById('access');

let loading = document.getElementById('loading');

let auth = document.getElementById('auth');
let userEmail = document.getElementById('userEmail')

let sendEmailVerificationDiv = document.getElementById('sendEmailVerificationDiv')

let emailVerified = document.getElementById('emailVerified')
let passwordReset = document.getElementById('passwordReset')

let userName = document.getElementById('userName')
let userImg = document.getElementById('userImg')

/*Alterar Tela de Cadastro*/
function toggleToRegister(){
  authForm.submitAuthForm.innerHTML = 'Cadastrar Conta';
  authFormTitle.innerHTML = 'Insira seus dados para cadastro';
  hideItem(register) // Esconder atalho para cadastrar conta
  hideItem(passwordReset) // Esconder a opção de redefinição de senha
  showItem(access) // Mostrar atalho para acessar conta
  
}

/*Alterar Tela de Acesso*/
function toggleToAccess(){
  authForm.submitAuthForm.innerHTML = 'Acessar';
  authFormTitle.innerHTML = 'Acesse sua conta para continuar';
  hideItem(access) // Esconder atalho para acessar conta
  hideItem(passwordReset) // Mostrar a opção de redefinição de senha
  showItem(register) // Mostrar atalho para cadastrar conta
}

function showItem(element){
element.style.display = 'block'
}
function hideItem(element){
element.style.display = 'none'
}

function showUserContent(user){
  console.log(user)
  if(user.emailVerified) {
    emailVerified.innerHTML = 'E-mail Verificado'
   hideItem(sendEmailVerificationDiv)
  } else {
    emailVerified.innerHTML = 'E-mail Não Verificado'
    showItem(sendEmailVerificationDiv)
  }

  userImg.src = user.photoURL ? user.photoURL : 'img/unknownUser.png'
  userName.innerHTML = user.displayName ? user.displayName : ''

  userEmail.innerHTML = user.email
  hideItem(auth)
  showItem(userContent)
}

/*Mostrar conteúdo para usuários não autenticados*/ 

function showAuth(){
  authForm.email.value = '';
  authForm.password.value = ''
  hideItem(userContent)
  showItem(auth)
}

let actionCodeSettings = {
  url: 'http://127.0.0.1:5500/'
}