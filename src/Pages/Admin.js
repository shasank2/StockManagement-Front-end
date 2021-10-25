import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap';


const Admin = () => {
    const [StockName, setStockName] = useState("")
    const [Quantity, setQuantity] = useState("")
    const [Price, setPrice] = useState("")

    const submitFood = async (e) => {
        e.preventDefault()
        await fetch('http://localhost:3001/Admin', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({StockName,Quantity,Price})
        })
    }

    return (
        <>
        <br /><br />
            <Container>
                <h1 style={{ textAlign: "center" }}>Add new company stocks form here</h1>
                <br />
                <Form onSubmit={(e) => submitFood(e)} style={{ width: 600 , marginLeft: '22%'}}>
                    <Form.Group className="mb-3">
                        <Form.Label>Stock Name</Form.Label>
                        <Form.Control type="text" onChange={(e)=> setStockName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="number" onChange={(e) => setQuantity(e.target.value) } />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" onChange={(e) => setPrice(e.target.value) }/>
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Container>
        </>
    )
}

export default Admin
