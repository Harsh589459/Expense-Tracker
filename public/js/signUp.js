const endpoint = 'http://localhost:3000';
const signUpBtn = document.getElementById('signUpBtn')
const hs = document.getElementById('hs')
async function signUp() {
    let name = document.getElementById('signup-name').value;
    let email = document.getElementById('signup-email').value;
    let password = document.getElementById('signup-password').value;
    console.log(name, email, password);

    if (!name || !email || !password) {
        alert('Please fill all the fields');
        return;
    }

    const data = {
        name: name,
        email: email,
        password: password
    };
    const userExist = document.getElementById('user-exists');

    try {
        const response = await axios.post(`${endpoint}/user/sign-up`, data);
        console.log(response)
      
            await alert("Signup Successfully");
            userExist.innerHTML = '';
            window.location.href = "/login"; 

        
    } catch (err) {
        userExist.innerHTML = err.response.data;

        console.log('err',err.response.data);
    }
}
signUpBtn.addEventListener('click',signUp)
hs.addEventListener('click',function(){
    let password = document.getElementById('signup-password')
    if(password.type==="password"){
        hs.src='/views/show.svg';
        password.type='text';
    }
    else{
        hs.src='/views/hide.svg';
        password.type='password';
    }
})