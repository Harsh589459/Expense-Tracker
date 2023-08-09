const endpoint = 'http://localhost:3000';


async function forgetPassword(e){
    e.preventDefault();
    let email = document.getElementById('email').value;
    const userDetails={
        email:email,
    }

    try{
     response = await axios.post(`${endpoint}/password/forgotpassword`,userDetails)
     
        if(responses.status===202){
            document.body.innerHTML+='<div style="color:red">Mail Successfully Sent</div>'
        }
        else{
            throw new Error("Something Went Wrong!!")
        }
   
    
    }
    catch(err){
        console.log(err);
    }
}