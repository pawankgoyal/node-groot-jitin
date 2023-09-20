import React, { useState } from 'react'

function WithBackend() {

    const [message, setMessage] = useState('')

    const getDataFromBackend = async () => {
        try {

            let res = await fetch('http://localhost:1300/suresh')
            let data = await res.json();
            setMessage(data.message)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <button className='btn btn-dark' onClick={getDataFromBackend}>Get data</button>

            <div className='p-5 shadow border container'>
                {message}
            </div>
        </div>
    )
}

export default WithBackend