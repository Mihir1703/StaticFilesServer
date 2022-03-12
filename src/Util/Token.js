import axios from "axios";

const alreadyLoggedIn = async (callback,cookies) => {
    let req = await axios.post('/api/auth/verify', {}, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'authtoken': cookies.get('token')
        }
    });
    let json = await req.data;
    if (json.success !== undefined) {
        callback()
    }
}   

export default alreadyLoggedIn;