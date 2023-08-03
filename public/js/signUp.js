const endpoint = 'http://localhost:3000';

async function signUp(event) {
    event.preventDefault
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

    try {
        const response = await axios.post(`${endpoint}/user/sign-up`, data);
        const userExist = document.getElementById('user-exists');

        if (response.data === 'User already exists') {
            userExist.innerHTML = '<div style="color:red">User already Exists</div>';
        } else {
            await alert("Signup Successfully");
            userExist.innerHTML = '';
        }
    } catch (err) {
        console.log(err);
    }
}
