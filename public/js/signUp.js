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
    const userExist = document.getElementById('user-exists');

    try {
        const response = await axios.post(`${endpoint}/user/sign-up`, data);
        console.log(response)
      
            await alert("Signup Successfully");
            userExist.innerHTML = '';
        
    } catch (err) {
        userExist.innerHTML = err.response.data;

        console.log('err',err.response.data);
    }
}
