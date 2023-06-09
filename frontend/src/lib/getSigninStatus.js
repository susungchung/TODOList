async function getSigninStatus(){
    // query signin status in case it changed
    const fetchURL= process.env.REACT_APP_SERVER_URL+'auth/signin/status';
    const fetchOption = {
        method:"get",
        credentials: 'include'
    }
    try{
        const res = await fetch(fetchURL,fetchOption);
        const data = await res.json();
        return data;
    }
    catch(err){
        if (err) throw err;
    }
}

export default getSigninStatus;