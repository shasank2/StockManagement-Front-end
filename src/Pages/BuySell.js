import React, {useState, useEffect} from 'react'
import { Container, Form, Button, Card, Row, Col, Badge } from 'react-bootstrap'

const BuySell = () => {
    const [Items, setItems] = useState([])
    const [Selected, setSelected] = useState(null)

    const [price, setprice] = useState(0)
    const [Total,setTotal] = useState(0)
    const [Quantity, setQuantity] = useState(0)

    const [Switch, setSwitch] = useState(true)     ///State for the BUY and SELL Switch  //True=Buy //False=Sell
    const [Readonly, setReadonly] = useState(true)   ///State for PRICE PER UNIT to make it READONLY

    const dataFetch = async () =>{
        const response = await fetch('http://localhost:3001/')
        const data = await response.json()
        setItems(data)
    }

    useEffect(() => {
        dataFetch()
    }, [])

    // The function to make the switch work for the whole page
    const switchFunction = ()=>{
        setSwitch(!Switch)
        setReadonly(!Readonly)
    }

    // This function handles the select company... the selected company data is set to a state
    const selectHandler = (e) =>{
        const Item = Items.filter((Item) =>{
            return Item._id === e.target.value
        }) 
        return setSelected(Item)
    }

    // This use effect is to validate if object was defined and pass the pirce in its state
    useEffect(() => {
        if (Selected) {
            setprice(Selected[0].StockName.Price)
            setTotal(0)
        } else {
            setprice(0)
        }
    }, [Selected])

    // Handle on chnage event of Quantity
    const quantityChange = (e)=>{
        setQuantity(e.target.value)
        let total = price * Quantity
        return setTotal(total)
    }

    // Handle on chnage event of Quantity
    const priceChange = (e)=>{
        setprice(e.target.value)
        let total = price * Quantity
        return setTotal(total)
    }

    // Fucntion for submitting the form
    const submitForm = async (e)=>{
        e.preventDefault()
        await fetch('http://localhost:3001/BuySell',{
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ Selected,Quantity,price,Switch })
        })
    }
    return (
        <>
        <br /><br />
            <Container>
                <h1 style={{ textAlign: "center" }}>Buy and sell stocks form here</h1>
                <br /><br />
                <Card style={{ backgroundColor:'#e9e9eb' }}>
                    <br />
                    <Card.Body style={{ paddingLeft:50 , paddingBottom:50}}>
                        <Form>
                            {/* DROPDOWN MENU FOR SELECTING STOCK */}
                            <Row className="align-items-center" >
                                <Col className="mb-5" md="8">
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label><b>Company Name</b></Form.Label>
                                        <Form.Select aria-label="Default select example" size="lg" 
                                        onChange={(e)=>selectHandler(e)}>
                                            <option value disabled>Select company</option>
                                            {
                                                Items.map((element)=>{
                                                    return(
                                                        <option value={element._id} key={element._id}>
                                                            {element.StockName.StockName}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                                {/* SWITCH FOR BUY AND SELL */}
                                <Col style={{ display: 'flex', justifyContent: 'center' }}>
                                    <h5>

                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        onChange={switchFunction}
                                    />
                                    </h5>
                                    <Form.Label><h5><Badge bg="info">{Switch? 'BUY':'SELL'}</Badge></h5></Form.Label>
                                </Col>
                            </Row>

                            {/* NEXT ROW */}
                            <Row>

                                {/* FOR QUANTITY */}
                                <Col md="auto">
                                    <Form.Group className="mb-5" controlId="quantity">
                                        <Form.Label><b>Quantity</b></Form.Label>
                                        <Form.Control type="number" onChange={e=>quantityChange(e)}/>
                                    </Form.Group>
                                </Col>

                                {/* FOR PRICE PER UNIT */}
                                {/* THIS IS READONLY WHEN BUYING */}
                                <Col md="auto" style={{ paddingLeft:"15%" }}>
                                    <Form.Group className="mb-5" controlId="pricePerUnit">
                                        <Form.Label><b>Price per unit</b></Form.Label>
                                        <Form.Control type="number" readOnly={Readonly} value={price} onChange={e=>priceChange(e)} /> 
                                    </Form.Group>
                                </Col>

                                {/* FOR TOTAL */}
                                {/* THIS IS READONLY */}
                                <Col md="auto" style={{ paddingLeft:"15%" }}>
                                    <Form.Group className="mb-5" controlId="total">
                                        <Form.Label><b>Total</b> </Form.Label>
                                        <Form.Control type="number"  readOnly value={Total} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button variant="primary" type="submit" onClick={e=>submitForm(e)}>
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default BuySell
