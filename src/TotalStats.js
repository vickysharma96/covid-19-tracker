import React from 'react'
import { CardDeck, Card, Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './TotalStats.css'


function TotalStats({totalCases, recoveredCases, activeCases, deaths, darkMode}){
    const display = darkMode ? "dark-mode" : "light-mode"
    return(
        <>
        <Row>
            <Col lg={12}>
            <CardDeck>
            <Card>
                <Card.Body className={display}>
                <Card.Title className='cardTitle'>Total Confirmed</Card.Title>
                <Card.Text className='cardText'>
                    {Number(totalCases).toLocaleString('en-US')}
                </Card.Text>
                </Card.Body> 
                <Card.Footer className="container1">
                </Card.Footer>
                </Card>

                <Card>
                <Card.Body className={display}>
                <Card.Title className='cardTitle'>Active Cases</Card.Title>
                <Card.Text className='cardText'>
                    {Number(activeCases).toLocaleString('en-US') + "   (" + (parseInt((Number(activeCases)/Number(totalCases))*100)) + "%)"}
                </Card.Text>
                </Card.Body>
                <Card.Footer className="container2">
                </Card.Footer>
                </Card>
            </CardDeck>
            </Col>
        </Row>
        <br/>
        <Row>
        <Col lg={12}>
            <CardDeck>
                <Card >
                <Card.Body className={display}>
                <Card.Title className='cardTitle'>Recovered Cases</Card.Title>
                <Card.Text className='cardText'>
                    {Number(recoveredCases).toLocaleString('en-US') + "   (" + (parseInt((Number(recoveredCases)/Number(totalCases))*100)) + "%)"}
                </Card.Text>
                </Card.Body>
                <Card.Footer className="container3">
                </Card.Footer>
                </Card>

                <Card>
                <Card.Body className={display}>
                <Card.Title className='cardTitle'>Deaths</Card.Title>
                <Card.Text className='cardText'>
                    {Number(deaths).toLocaleString('en-US') + "   (" + (parseInt((Number(deaths)/Number(totalCases))*100)) + "%)"}
                </Card.Text>
                </Card.Body>
                <Card.Footer className="container4">
                </Card.Footer>
                </Card>
            </CardDeck>
        </Col>
        </Row>
        </>
    );
}

export default TotalStats;