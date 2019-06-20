import React, { Component } from 'react'
import ItemList from '../itemList';
import CharDetails, { Field } from '../charDetails';
import ErrorMessage from '../errrorMessage'
import GotService from '../../services/GotService'
import RowBlock from '../rowBlock'

export default class CharacterPage extends Component {

    gotService = new GotService()

    state = {
        selectedChar: 130,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true,
        })
        console.log('got it')
    }

    onItemSelected = async (id) => {
        await this.setState({ selectedChar: id })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage />
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllCharacters}
                renderItem={({ name, gender }) => `${name} (${gender})`}
            />)

        const charDetails = (
            <CharDetails charId={this.state.selectedChar} >
                <Field field='gender' label='Gender' />
                <Field field='born' label='Born' />
                <Field field='died' label='Died' />
                <Field field='culture' label='Culture' />
            </CharDetails>
        )

        return (
            <RowBlock left={itemList} right={charDetails} />
        )
    }
}
