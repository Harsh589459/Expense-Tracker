const endpoint = 'http://localhost:3000'

async function login(event) {
    event.preventDefault();
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;

    if (!email && !password) {
        alert('Please fill all the fields')
        return;
    }
    const data = {
        email: email,
        password: password
    }
    const userExist = document.getElementById('user-exists');

    try {
        const response = await axios.post(`${endpoint}/user/login`, data)
        console.log(response.data);
        await alert(response.data.message);
        console.log(response.data.token);
        localStorage.setItem('token', response.data.token);
        window.location.href = '/expense'



    } catch (err) {
        console.log(err.response);
        userExist.innerHTML = err.response.data.message;
    }
}
function forgetPassword() {
    window.location.href = '/password/forget-password';

}

