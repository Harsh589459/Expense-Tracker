
const endpoint = 'http://localhost:3000';
const categoryItems = document.querySelectorAll(".dropdown-item");
const categoryInput = document.querySelector("#categoryInput");
const categoryBtn = document.querySelector("#categoryBtn");
const form = document.getElementById("form1");
const addExpenseBtn = document.getElementById("submitBtn");
const table = document.getElementById("tbodyId");
const buyPremiumBtn = document.getElementById("buyPremiumBtn");
const leaderboardLink = document.getElementById("leaderboardLink");
const logoutBtn = document.getElementById("logoutBtn");
const showReportBtn = document.getElementById('reportsLink')
const downloadBtn = document.getElementById('downloadReport');
const page = document.getElementById('page');





categoryItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      const selectedCategory = e.target.getAttribute("data-value");
      categoryBtn.textContent = e.target.textContent;
      categoryInput.value = selectedCategory;
    });
  });
async function addExpense() {
    // let amount = document.getElementById('amount').value;
    // let description = document.getElementById('description').value;
    // let category = document.getElementById('category').value;
    const category = document.getElementById("categoryBtn");
    const description = document.getElementById("descriptionValue");
    const amount = document.getElementById("amountValue");
    const categoryValue = category.textContent.trim();
    const descriptionValue = description.value.trim();
    const amountValue = amount.value.trim();
    if (categoryValue == "Select Category") {
        alert("Select the Category!");
        window.location.href("/homePage");
      }
      if (!descriptionValue) {
        alert("Add the Description!");
        window.location.href("/homePage");
      }
      if (!parseInt(amountValue)) {
        alert("Please enter the valid amount!");
        window.location.href("/homePage");
      }
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
  
      // add leading zeros to day and month if needed
      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedMonth = month < 10 ? `0${month}` : month;
  
      // create the date string in date-month-year format
      const dateStr = `${formattedDay}-${formattedMonth}-${year}`;
  


    const data = {
        date:dateStr,
        amount: amountValue,
        description: descriptionValue,
        category: categoryValue,
    }

    try {
        const token = localStorage.getItem('token');

        const response = await axios.post(`${endpoint}/expense`, data, { headers: { "Authorization": token } });
        getAllExpense();
    } catch (err) {
        console.log(err);
    }
}

async function getAllExpense() {
    const limit = document.getElementById("page").value;

    console.log("limit>>>>>>>>>>>",limit)
    try {
        const token = localStorage.getItem('token');
        const res = await axios.post(`${endpoint}/expense/getAllExpense/1`, {limit:limit}, { headers: { "Authorization": token } });
        table.innerHTML="";
        res.data.expense.forEach((expenses) => {
            const id = expenses.id;
            const date = expenses.date;
            const categoryValue = expenses.category;
            const descriptionValue = expenses.description;
            const amountValue = expenses.amount;

            let tr = document.createElement("tr");
            tr.className = "trStyle";

            table.appendChild(tr);

            let idValue = document.createElement("th");
            idValue.setAttribute("scope", "row");
            idValue.setAttribute("style", "display: none");

            let th = document.createElement("th");
            th.setAttribute("scope", "row");

            tr.appendChild(idValue);
            tr.appendChild(th);

            idValue.appendChild(document.createTextNode(id));
            th.appendChild(document.createTextNode(date));

            let td1 = document.createElement("td");
            td1.appendChild(document.createTextNode(categoryValue));

            let td2 = document.createElement("td");
            td2.appendChild(document.createTextNode(descriptionValue));

            let td3 = document.createElement("td");
            td3.appendChild(document.createTextNode(amountValue));

            let td4 = document.createElement("td");

            let deleteBtn = document.createElement("button");
            deleteBtn.className = "editDelete btn btn-danger delete";
            deleteBtn.appendChild(document.createTextNode("Delete"));

            let editBtn = document.createElement("button");
            editBtn.className = "editDelete btn btn-success edit";
            editBtn.appendChild(document.createTextNode("Edit"));

            td4.appendChild(deleteBtn);
            td4.appendChild(editBtn);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
        });

        // ---------------------------------------------------------------------//

        const ul = document.getElementById("paginationUL");
        ul.innerHTML="";
        for (let i = 1; i <= res.data.totalPages; i++) {
            const li = document.createElement("li");
            const a = document.createElement("a");
            li.setAttribute("class", "page-item");
            a.setAttribute("class", "page-link");
            a.setAttribute("href", "#");
            a.appendChild(document.createTextNode(i));
            li.appendChild(a);
            ul.appendChild(li);
            a.addEventListener("click", paginationBtn);
        }
    }
    catch (err) {
        console.log(err);
    }
}
async function deleteExpense(e) {
    console.log(e);
    try {
        const token = localStorage.getItem('token');
        if (e.target.classList.contains("delete")) {
            let tr = e.target.parentElement.parentElement;
            let id = tr.children[0].textContent;
        const response = await axios.get(`${endpoint}/expense/delete/${id}`, { headers: { "Authorization": token } });
        if (response) {
            getAllExpense();
        }
        }

        
    }
    catch (err) {
        console.log(err);
    }


}
document.getElementById('buyPremiumBtn').onclick = async function (e) {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${endpoint}/purchase/premiumMembership`, { headers: { "Authorization": token } })
    console.log(response.data);
    console.log(response.data.order.id);
    var options = {
        key: response.data.key_id,//Enter the key id generated from the dashboard
        order_id: response.data.order.id,//for one time payment
        ////this handler function will handle the success payment
        handler: async function (response) {
            await axios.post(`${endpoint}/purchase/updateTransactionStatus`, {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            }, { headers: { "Authorization": token } })
            alert("You are premium user now");
            isPremiumUser()
        }
    }
    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment.failed', function (response) {
        console.log(response)
        alert("Payment Failed")
    })
}

async function isPremiumUser() { 
    const token = localStorage.getItem('token');
    const res = await axios.get(`${endpoint}/isPremiumUser`, {
        headers: { Authorization: token },
    })
    const premium=document.getElementById('buyPremiumBtn')
    if (res.data.isPremiumUser) {
        // document.getElementById('rzp-button1').style.display='none';
        // document.getElementById('is-premium').innerHTML=`<div>You are a Premium User now</div>`
        // document.getElementById('is-premium').style.color='red';
        // document.getElementById('is-premium').innerHTML=`<button>Show Leader Boards</div>`


        // document.getElementById('premium-features').style.display = 'block';
        premium.style.display="block"
        premium.innerHTML="You are a premium User"


    }
    else {
    premium.style.display = 'block';
    }
}


function showReports() {
    console.log("first")
    window.location.href = '/premium/reports';
}

function download() {
    const token = localStorage.getItem('token');
    axios.get(`${endpoint}/user/download`, { headers: { Authorization: token } }).then((response) => {
        if (response.status === 200) {
            //the backend is essentially sending a download link
            //which if we open in browser ,file would download
            var a = document.createElement("a");
            a.href = response.data.fileUrl;
            console.log(response);
            a.download = 'myexpense.csv';
            a.click();
        } else {
            throw new Error(response.data.message);
        }
    }).catch((err) => {
        console.log(err);
    })
}
async function addReport(url) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: token,
        }
        console.log(url);
        const data = {
            url: url,
        }
        const response = await axios.post(`${endpoint}/reports/post-report`, { headers: { Authorization: token } }, { url: url })
        console.log(response);

    } catch (err) {
        console.log(err);

    }
}
async function paginationBtn(e) {
    try {
        const limit = document.getElementById("page").value;

        const pageNo = e.target.textContent;
        const token = localStorage.getItem("token");
        const res = await axios.post(
          `${endpoint}/expense/getAllExpense/${pageNo}`,{limit:limit},
          { headers: { Authorization: token } }
        );
    
        table.innerHTML = "";
    
        res.data.expense.forEach((expenses) => {
          const id = expenses.id;
          const date = expenses.date;
          const categoryValue = expenses.category;
          const descriptionValue = expenses.description;
          const amountValue = expenses.amount;
    
          let tr = document.createElement("tr");
          tr.className = "trStyle";
    
          table.appendChild(tr);
    
          let idValue = document.createElement("th");
          idValue.setAttribute("scope", "row");
          idValue.setAttribute("style", "display: none");
    
          let th = document.createElement("th");
          th.setAttribute("scope", "row");
    
          tr.appendChild(idValue);
          tr.appendChild(th);
    
          idValue.appendChild(document.createTextNode(id));
          th.appendChild(document.createTextNode(date));
    
          let td1 = document.createElement("td");
          td1.appendChild(document.createTextNode(categoryValue));
    
          let td2 = document.createElement("td");
          td2.appendChild(document.createTextNode(descriptionValue));
    
          let td3 = document.createElement("td");
          td3.appendChild(document.createTextNode(amountValue));
    
          let td4 = document.createElement("td");
    
          let deleteBtn = document.createElement("button");
          deleteBtn.className = "editDelete btn btn-danger delete";
          deleteBtn.appendChild(document.createTextNode("Delete"));
    
          let editBtn = document.createElement("button");
          editBtn.className = "editDelete btn btn-success edit";
          editBtn.appendChild(document.createTextNode("Edit"));
    
          td4.appendChild(deleteBtn);
          td4.appendChild(editBtn);
    
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);
        });
      } catch (error) {
        console.log(error);
      }

}

table.addEventListener("click", (e) => {
    deleteExpense(e);
  });

addExpenseBtn.addEventListener("click",addExpense);
document.addEventListener('DOMContentLoaded',getAllExpense,isPremiumUser)
showReportBtn.addEventListener('click',showReports)
downloadBtn.addEventListener('click',download)
page.addEventListener('change',getAllExpense)
// isPremiumUser();
// getAllExpense();