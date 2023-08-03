const endpoint= 'http://localhost:3000'

function login(event){
    event.preventDefault();
    let email = document.getElementById('login-email').value;
    let password= document.getElementById('login-password').value;

    if(!email && !password){
        alert('Please fill all the fields')
        return;
    }
    const data = {
        email:email,
        password:password
    }
    axios.post(`${endpoint}/user/login`,data).then(response=>{
        console.log(response.data);
        const userExist=document.getElementById('user-exists');
        if(response.data==="User logged in successfully"){
            userExist.innerHTML=''
            alert(response.data);
        }
        else{
           
            userExist.innerHTML=`<div style="color:red">${response.data}</div>`
        }
    }).catch(err=>console.log(err))
}