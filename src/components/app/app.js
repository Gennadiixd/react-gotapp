import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';

import GotCharService from '../../services/GotService'


class App extends React.Component {
    state = { randomChar: 'null' }

    componentDidMount() {
        this.gotChar = new GotCharService();
        this.gotChar.getRandomCharacter()
            .then((data) => {
                this.setState(({ randomChar }) => {
                    return { randomChar: data }
                })
            })
    }

    render() {
        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{ size: 5, offset: 0 }}>
                            <RandomChar {...this.state.randomChar} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};

export default App;