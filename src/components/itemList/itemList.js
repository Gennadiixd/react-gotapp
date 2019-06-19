import React, { Component } from 'react';
import GotCharService from '../../services/GotService'
import Spinner from '../spinner'
import './itemList.css';

export default class ItemList extends Component {

    state = { charList: null }

    gotCharService = new GotCharService()

    componentDidMount() {
        this.gotCharService.getAllCharacters()
            .then((charList) => {
                this.setState({
                    charList
                })
            })
    }

    renderItems = (arr) => {
        return arr.map((el, i) => {
            return (
                <li
                    className="list-group-item"
                    key={i}
                    onClick={() => { this.props.onCharSelected(++i) }}>
                    {el.name}
                </li>
            )
        })
    }


    render() {

        const { charList } = this.state;
        //Если данные с сервера еще не подъехали
        if (!charList) {
            return <Spinner />
        }

        const items = this.renderItems(charList)

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}