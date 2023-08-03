const endpoint= 'http://localhost:3000'
function signUp(){
    let name = document.getElementById('signup-name').value
    let email = document.getElementById('signup-email').value
    let password = document.getElementById('signup-password').value
    console.log(name,email,password)
    if(!name && !email && !password){
        alert('Please fill all the fields')
        return;
    }
    const data ={
        name:name,
        email:email,
        password:password
    }
    
    axios.post(`${endpoint}/user/sign-up`,data).then(response=>{
        console.log(response.data)
        if(response.data==='User already exists'){
            const userExist=document.getElementById('user-exists');
            userExist.innerHTML='<div style="color:red">User already Exists</div>'
        }
    }).catch(err=>console.log(err))
    
}