const endpoint = 'http://localhost:3000';


async function forgetPassword(e){
    e.preventDefault();
    try{
    let email = document.getElementById('email').value;
    const response = await axios.post(`${endpoint}/password/forgotpassword`,{email});
    console.log(response);
    
    }
    catch(err){
        console.log(err);
    }
}