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
        const response = await axios.post(`${endpoint}/expense`, data);
        console.log(response.data);
        getAllExpense();
    } catch (err) {
        console.log(err);
    }
}

async function getAllExpense() {
    try {
        const response = await axios.get(`${endpoint}/expense/getAllExpense`);
        
        const expenseList = document.getElementById('expense-list');
        expenseList.innerHTML='';
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
async function deleteExpense(id){
    try{
    const response=await axios.post(`${endpoint}/expense/delete`,{id});
    console.log(response);
    if(response){
        getAllExpense();
    }
    }
    catch(err){
        console.log(err);
    }
    

}

getAllExpense();