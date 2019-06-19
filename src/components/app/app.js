import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errrorMessage'
import CharacterPage from '../characterPage/characterPage'
import GotCharService from '../../services/GotService'


class App extends React.Component {
    state = {
        randomChar: false,
        error: false,
    }

    componentDidCatch() {
        console.log('got it app')
        this.setState({
            error: true,
        })
    }
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

        if (this.state.error) {
            return <ErrorMessage />
        }

        return (
            <>

                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{ size: 5, offset: 0 }}>
                            {/* <RandomChar {...this.state.randomChar} /> */}
                            {randomCharContent}
                            <button onClick={this.showRandomChar} > Toggle Random Char</button>
                        </Col>
                    </Row>
                    <CharacterPage />
                </Container>
            </>
        );
    }
};

export default App;