const endpoint = 'http://localhost:3000'


async function getReports() {
    try {
        const response = await axios.get(`${endpoint}/premium/reports`)
    }
    catch (err) {
        console.log(err);
    }

}

async function showDailyReport(e) {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token')
        const date = document.getElementById('date').value;
        console.log(date);
        const response = await axios.post(`${endpoint}/reports/getDailyReportList`,{date:date}, { headers: { Authorization: token } })
        const tbodyDaily = document.getElementById("tbodyDailyId");
        const tfootDaily = document.getElementById("tfootDailyId");
        tbodyDaily.innerHTML = '';
        tfootDaily.innerHTML = '';
        const results = response.data.results;
        results.forEach((result) => {
            const tr = document.createElement('tr');
            tr.setAttribute("class", "trStyle");
            console.log(result.createdAt);
            tbodyDaily.appendChild(tr);
            const th = document.createElement("th");
            th.appendChild(document.createTextNode(result.date));

            const td1 = document.createElement("td");
            td1.innerHTML = `<a href="${result.link}">Link</a>`
            tr.appendChild(th);
            tr.appendChild(td1);
        })

    }
    catch (err) {
        console.log(err);
    }
}
async function showMonthlyReport(e) {
    e.preventDefault();

    try {
        const token = localStorage.getItem('token');
        const month = document.getElementById('month').value;
        const response = await axios.post(`${endpoint}/reports/getMonthlyReportList`,{month:month}, { headers: { Authorization: token } })
        const tbodyMonthly = document.getElementById("tbodyMonthlyId");
        const tfootMontthly = document.getElementById("tfootMonthlyId");
        tbodyMonthly.innerHTML = '';
        tfootMontthly.innerHTML = '';
        const results = response.data.results;
        results.forEach((result) => {
            const tr = document.createElement('tr');
            tr.setAttribute("class", "trStyle");
            console.log(result.createdAt);
            tbodyMonthly.appendChild(tr);
            const th = document.createElement("th");
            th.appendChild(document.createTextNode(result.date));

            const td1 = document.createElement("td");
            td1.innerHTML = `<a href="${result.link}">Link</a>`
            tr.appendChild(th);
            tr.appendChild(td1);
        })

    }
    catch {

    }
}