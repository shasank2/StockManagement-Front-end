import React, { useEffect, useState } from 'react'
import { Container, Card, Row, Col } from 'react-bootstrap'

const Dashboard = () => {
    const [Items, setItems] = useState([])
   
    const getDashboard = async () => {
        const response = await fetch('http://localhost:3001/')
        const data = await response.json()    // setItems(await response.json()) // this works as well
        setItems(data)
    }

    useEffect(() => {
        getDashboard()
    }, [])


    return (
        <>
            <br /><br />
            <Container>
                <h1 style={{ textAlign: "center" }}>Dashboard</h1>
                <br /><br />
                {/* Display of all the stocks available on the web site */}
                <div>
                    {
                        Items.map((element) => {
                            return (
                                <div key={element._id}>
                                    <Card>
                                        <Card.Header>
                                            <Row style={{ padding: 15 }} className="justify-content-between">
                                                <Col md="auto">
                                                    <h4>{element.StockName.StockName}</h4>
                                                </Col>
                                                <Col md="auto">
                                                    <h6>Overall Profit: Rs.{element.SoldAmount - element.TotalInvestment}</h6>
                                                </Col>
                                            </Row>
                                        </Card.Header>
                                        <Card.Body>
                                            <Container>
                                                <Row>
                                                    <Col style={{ padding: 10 }}>
                                                        <Card.Text>
                                                            <b>Owned units: </b>{element.TotalUnits}
                                                        </Card.Text>
                                                    </Col>
                                                    <Col style={{ padding: 10 }}>
                                                        <Card.Text>
                                                            <b>Your investment: </b>Rs.{element.TotalInvestment}
                                                        </Card.Text>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col style={{ padding: 10 }}>
                                                        <Card.Text>
                                                            <b>Sold Amount: </b>Rs.{element.SoldAmount}
                                                        </Card.Text>
                                                    </Col>
                                                    <Col style={{ padding: 10 }}>
                                                        <Card.Text>
                                                            <b>Current Value: </b>Rs.{element.CurrentAmount}
                                                        </Card.Text>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Card.Body>
                                    </Card>
                                    <br />
                                </div>
                            )
                        })
                    }
                    <br />

                </div>
            </Container>
        </>
    )
}

export default Dashboard
