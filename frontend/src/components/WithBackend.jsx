import React, { useEffect, useState } from 'react'

function WithBackend() {

    const [newProduct, setNewProduct] = useState({})
    const [products, setProducts] = useState([])

    const handleChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
    }

    const getDataFromBackend = async () => {
        try {

            let res = await fetch('http://localhost:1200/product')
            let data = await res.json();
            console.log(data)
            setProducts(data)

        } catch (error) {
            console.log(error)
        }
    }


    const deleteProduct = async (id) => {

        try {
            const options = {
                method: "DELETE"
            }
            const res = await fetch('http://localhost:1200/product/' + id, options)
            const data = await res.json();
            console.log(data)

            getDataFromBackend()
        } catch (error) {
            console.log(error)
        }

    }


    const addProduct = async () => {

        try {
            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            }

            const res = await fetch('http://localhost:1200/product', options)
            const data = await res.json();
            console.log(data)
            getDataFromBackend()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDataFromBackend()
    }, [])


    return (
        <div>

            <div className='p-4 d-flex flex-column w-25'>
                <h6>product form</h6>
                <input className='m-1' type="number" placeholder='id' name='id' onChange={handleChange} />
                <input className='m-1' type="text" placeholder='title' name='title' onChange={handleChange} />
                <input className='m-1' type="number" placeholder='price' name='price' onChange={handleChange} />
                <button className='btn btn-sm btn-outline-dark m-1' onClick={addProduct}>Add</button>
            </div>
            <div className='d-flex'>
                {products.map(e => (
                    <div className='border p-2'>
                        <pre>
                            {JSON.stringify(e, null, 4)}
                        </pre>
                        <button className='btn btn-sm btn-danger' onClick={() => deleteProduct(e.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WithBackend