

function registerUser(name, email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
}
function handleRegistration(event) {
  event.preventDefault(); 


  const name = document.getElementById('inputName');
  const email = document.getElementById('inputEmailSign');
  const password = document.getElementById('inputPasswordSign');

 
  registerUser(name.value, email.value, password.value);
  alert('sign up successful!');
  name.value="";
  email.value="";
  password.value="";
}
function checkUser(Email,Password){
  var users = getLocal()
  var result=false;
  users.forEach(function(element){
    if(element.email===Email&&element.password===Password)
   {
   result=true;
   }
  });
return result;
}
function handleLogin(event) {
  event.preventDefault(); 
  
  const email = document.getElementById('inputEmailLog').value;
  const password = document.getElementById('inputPasswordLog').value;

 
  if (checkUser(email, password)) {
    alert('Login successful!');
    window.location.href="index.html"
 
  } else {
    alert('Incorrect email or password.');
  }
  document.getElementById('inputEmailLog').value="";
  document.getElementById('inputPasswordLog').value="";
}
document.getElementById("btnSignUp").addEventListener("click",function(event){
  handleRegistration(event)
});
document.getElementById("btnLogIn").addEventListener("click",function(event){
  handleLogin(event);
})
function getLocal()
{
  var users = JSON.parse(localStorage.getItem('users')) || [];
  return users;
}