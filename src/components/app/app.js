import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errrorMessage'
import CharacterPage from '../characterPage/characterPage'
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import GotService from '../../services/GotService'


class App extends React.Component {

    gotService = new GotService();

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
                    <Row>
                        <Col md='6'>
                            <ItemList
                                onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllBooks}
                                renderItem={(item) => `${item.name} (${item.released})`}
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList
                                onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllHouses}
                                renderItem={(item) => `${item.name} (${item.words})`}
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};

export default App;