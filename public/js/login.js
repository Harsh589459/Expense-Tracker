const endpoint= 'http://localhost:3000'

async function login(event){
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
    const userExist=document.getElementById('user-exists');

    try{
    // const response = axios.post(`${endpoint}/user/login`,data).then(response=>{
    //     console.log(response.data);
    //     // if(response.data==="User logged in successfully"){
    //     //     userExist.innerHTML=''
    //     //     alert(response.data);
    //     //     window.location.href="/expense";
    //     // }
    //     // else{
           
    //     //     userExist.innerHTML=`<div style="color:red">${response.data}</div>`
    //     // }
    // }).catch(err=>console.log(err))
        const response = await axios.post(`${endpoint}/user/login`,data);
        await alert(response.data.message);

}catch(err){
    console.log(err.response);
    userExist.innerHTML=err.response.data.message;
}
}