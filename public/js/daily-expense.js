
const endpoint = 'http://localhost:3000';

async function addExpense(event) {
    event.preventDefault();
    let amount = document.getElementById('amount').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;

    const data = {
        amount: amount,
        description: description,
        category: category,
    }

    try {
        const token=localStorage.getItem('token');

        const response = await axios.post(`${endpoint}/expense`, data,{headers:{"Authorization":token}});
        getAllExpense();
    } catch (err) {
        console.log(err);
    }
}

async function getAllExpense() {
    try {
        const token=localStorage.getItem('token');
        const response = await axios.get(`${endpoint}/expense/getAllExpense`,{headers:{"Authorization":token}});
        const expenseList = document.getElementById('expense-list');
        expenseList.innerHTML = '';
        for (let i = 0; i < response.data.length; i++) {
            const expenses = document.createElement('li')
            expenses.innerHTML = `<li>${response.data[i].amount}  ${response.data[i].description}   ${response.data[i].category}   <button onclick=deleteExpense(${response.data[i].id})>Delete</button></li> `;
            expenseList.appendChild(expenses);
        }
    }
    catch (err) {
        console.log(err);
    }
}
async function deleteExpense(id) {
    try {
        const token=localStorage.getItem('token');

        const response = await axios.get(`${endpoint}/expense/delete/${id}`,{headers:{"Authorization":token}});

        if (response) {
            getAllExpense();
        }
    }
    catch (err) {
        console.log(err);
    }


}
document.getElementById('rzp-button1').onclick=async function(e){
    const token =  localStorage.getItem('token');
    const response = await axios.get(`${endpoint}/purchase/premiumMembership`,{headers:{"Authorization":token}})
    console.log(response.data);
    console.log(response.data.order.id);
    var options ={
        key:response.data.key_id,//Enter the key id generated from the dashboard
        order_id:response.data.order.id,//for one time payment
        ////this handler function will handle the success payment
        handler:async function(response){
            await axios.post(`${endpoint}/purchase/updateTransactionStatus`,{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id,
            },{headers:{"Authorization":token}})
            alert("You are premium user now")
        }
    }
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed',function(response){
        console.log(response)
        alert("Payment Failed")
    })
}

async function isPremiumUser(){
    const token = localStorage.getItem('token');
    const res =await axios.get(`${endpoint}/isPremiumUser`,{
        headers:{Authorization:token},
    })
    if(res.data.isPremiumUser){
        console.log("premium>>>>>>>>>>>>>>..")
        document.getElementById('rzp-button1').style.display='none';
        document.getElementById('is-premium').innerHTML=`<div>You are a Premium User now</div>`
        document.getElementById('is-premium').style.color='red';


    }
}
isPremiumUser();
getAllExpense();