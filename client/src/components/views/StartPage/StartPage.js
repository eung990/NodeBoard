import React, { useEffect } from 'react'

import axios from 'axios';

function StartPage(){

    useEffect(() => {
        axios.get('http://localhost:3040/api/hello')
        .then(res => console.log(res.data));
    })
    return (
        <div style={{
            display:'flex', justifyContent:'center', alignItems:'center',
            width:'100%',height:"100vh"
        }}>
            <h2>StartPage</h2>
        </div>
    )
}

export default StartPage
