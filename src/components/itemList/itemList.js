import React, { Component } from 'react';
import Spinner from '../spinner'
import './itemList.css';

export default class ItemList extends Component {

    state = { itemList: null }

    componentDidMount() {
        const { getData } = this.props;

        getData()
            .then((itemList) => {
                this.setState({
                    itemList
                })
            })
    }

    renderItems = (arr) => {
        return arr.map((el, i) => {
            const label = this.props.renderItem(el)
            return (
                <li
                    className="list-group-item"
                    key={i}
                    onClick={() => { this.props.onItemSelected(++i) }}>
                    {label}
                </li>
            )
        })
    }


    render() {

        const { itemList } = this.state;
        //Если данные с сервера еще не подъехали
        if (!itemList) {
            return <Spinner />
        }

        const items = this.renderItems(itemList)

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}