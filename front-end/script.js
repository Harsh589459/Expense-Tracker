function signUp(){
    let name = document.getElementById('signup-name').value
    let email = document.getElementById('signup-email').value
    let password = document.getElementById('signup-password').value
    console.log(name,email,password)
    if(!name && !email && !password){
        alert('Please fill all the fields')
    }
}