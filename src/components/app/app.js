import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';

import GotCharService from '../../services/GotService'


class App extends React.Component {
    state = { randomChar: false }
    // gotChar = new GotCharService();

    // updateRandomCharacter() {
    //     this.gotChar.getRandomCharacter()
    //         .then((char) => {
    //             this.setState(({ randomChar }) => {
    //                 return { randomChar: char }
    //             })
    //         })
    // }

    // componentDidMount() {
    //     this.updateRandomCharacter()
    // }

    showRandomChar = async () => {
        await this.setState(({ randomChar }) => {
            return { randomChar: !randomChar }
        })
    }

    render() {
        const { randomChar } = this.state;
        const randomCharContent = randomChar ? <RandomChar {...this.state.randomChar} /> : null;

        return (
            <>
                <button onClick={this.showRandomChar} />
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{ size: 5, offset: 0 }}>
                            {/* <RandomChar {...this.state.randomChar} /> */}
                            {randomCharContent}
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