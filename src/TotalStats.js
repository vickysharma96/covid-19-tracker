import React from 'react'
import { CardDeck, Card} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import './TotalStats.css'


function TotalStats({totalCases, recoveredCases, activeCases, deaths}){
    return(
        <CardDeck>
        <Card bg='warning'>
            <Card.Body>
            <Card.Title className='cardTitle'>Total Confirmed</Card.Title>
            <Card.Text className='cardText'>
                {Number(totalCases).toLocaleString('en-IN')}
            </Card.Text>
            </Card.Body>
        </Card>
        <Card bg='info'>
            <Card.Body>
            <Card.Title className='cardTitle'>Active Cases</Card.Title>
            <Card.Text className='cardText'>
                {Number(activeCases).toLocaleString('en-IN')}
            </Card.Text>
            </Card.Body>
            </Card>
        <Card bg = 'success'>
            <Card.Body>
            <Card.Title className='cardTitle'>Recovered Cases</Card.Title>
            <Card.Text className='cardText'>
                {Number(recoveredCases).toLocaleString('en-IN')}
            </Card.Text>
            </Card.Body>
        </Card>
        <Card bg='danger'>
            <Card.Body>
            <Card.Title className='cardTitle'>Deaths</Card.Title>
            <Card.Text className='cardText'>
                {Number(deaths).toLocaleString('en-IN')}
            </Card.Text>
            </Card.Body>
        </Card>
        </CardDeck>
    );
}

export default TotalStats;