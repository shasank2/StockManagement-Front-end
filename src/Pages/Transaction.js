import React, { useState, useEffect } from 'react'
import { Table, Container } from 'react-bootstrap'

const Transaction = () => {

    const [Items, setItems] = useState([])

    const dataFetch = async () => {
        const response = await fetch('http://localhost:3001/Transaction')
        const data = await response.json()
        setItems(data)
    }

    useEffect(() => {
        dataFetch()
        console.log(Items)
    }, [Items])

    return (
        <>
            <br /><br />
            <h1 style={{ textAlign: "center" }}>Transactions</h1>
            <br />
            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Transaction Type</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Items.map((element) => {
                                return (
                                    <tr>
                                        <td>{element.StockName}</td>
                                        <td>{element.TransactionType}</td>
                                        <td>{element.Quantity}</td>
                                        <td>Rs.{element.Price}</td>
                                        <td>Rs.{element.Quantity * element.Price}</td>
                                        <td>{(element.Date).slice(0, 10)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default Transaction
