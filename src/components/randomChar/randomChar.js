import React, { Component } from 'react';
import GotService from '../../services/GotService'
import Spinner from '../spinner'
import ErrorMessage from '../errrorMessage'
import './randomChar.css';

export default class RandomChar extends Component {
    constructor() {
        super();
        this.updateChar()
    }

    charService = new GotService();

    state = {
        char: {},
        loading: true,
        error: false
    }
    //Вынесли небольшой сервис по установке стэйта
    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
        })
    }

    onError = (error) => {
        this.setState({
            error: error.message,
            loading: false
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * 150 * 11);
        // const id = 13000000000
        this.charService.getCharacter(id)
            //по then запускаем ф-цию с параметрами пришедшими в ответе
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {        

        const { char, loading, error } = this.state

        const errorMessage = error ? <ErrorMessage error={error} /> : null;     
        const spinner = loading ? <Spinner /> : null;
        //проверка на загрузку и ошибку если ок выводим компонент
        const content = !(loading || error) ? <View char={char} /> : null;

        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

//Вынесли вёрстку, в пропсах принимаем char и деструктуризируем
const View = ({ char }) => {

    const { gender, born, died, culture, name } = char

    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}
