const endpoint = 'http://localhost:3000';


async function showLeaderBoards() {
    try{
    const token = localStorage.getItem('token');
    const res = await axios.get(`${endpoint}/premium/showLeaderBoard`, {
        headers: { Authorization: token }
    })
    const tbody = document.getElementById("tbody");
    const tfoot = document.getElementById("tfoot");
    tbody.innerHTML="";
    tfoot.innerHTML="";


    res.data.forEach((user,index) => {
        // leaderBoard.innerHTML += `<li>Name-${user.name} Total Expenses- ${user.totalExpenses || 0}`
        const tr = document.createElement('tr');
        tr.setAttribute("class","trStyle");
        tbody.appendChild(tr);
        const th = document.createElement("th");
        th.appendChild(document.createTextNode(index+1))

        const td1 = document.createElement("td");
        td1.innerHTML=user.name;
        const td2 = document.createElement("td");
        td2.innerHTML=user.totalExpenses || 0;
        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
    })}catch(err){
        console.log(err);
    }
}
showLeaderBoards();