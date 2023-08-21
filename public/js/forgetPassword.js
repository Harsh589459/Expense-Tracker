
const endpoint = 'http://localhost:3000';
const submitBtn = document.getElementById('forget-mail')
const exists = document.getElementById('user-exists')


async function forgetPassword(){
    let email = document.getElementById('email').value;
    const userDetails={
        email:email,
    }

    try{
     response = await axios.post(`${endpoint}/password/forgotpassword`,userDetails)
     
        if(response){
            exists.innerHTML=response.message;
        }
     else{

            throw new Error("Something Went Wrong!!")
        }
   
    
    }
    catch(err){
exists.innerHTML=err.response.data.message;
        console.log(err);
    }
}
console.log(submitBtn)
submitBtn.addEventListener('click',forgetPassword)