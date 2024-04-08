'use client'

import axios from "axios";
import { useEffect, useState } from "react";

export default function () {
    const [userData, setUserData] = useState();

    useEffect(() => {
        axios.get('http://localhost:3000/api/user', {
            withCredentials: true
        })
        .then(res => {
            setUserData(res.data);
        })
    }, [])
    return (
        <div>
            Your Signed in email Id is {userData?.userData}
        </div>
    )
}