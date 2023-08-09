const endpoint = 'http://localhost:3000'


async function getReports(){
    try{
    const response = await axios.get(`${endpoint}/premium/reports`)
    console.log(response)
    }
    catch(err){
        console.log(err);
    }

}