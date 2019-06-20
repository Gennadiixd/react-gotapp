import React, { Component } from 'react';
import GotService from '../../services/GotService'
import './charDetails.css';

const Field = ({ char, field, label }) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{char[field]}</span>
        </li>
    )
}

export { Field }
export default class CharDetails extends Component {

    state = {
        char: null,
    }
    charService = new GotService();

    componentDidMount() {
        this.updateChar()
    }
    //Если пришли новые пропсы запустит функцию updateChar
    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }

    updateChar = async () => {
        const { charId } = this.props;
        if (!charId) {
            return;
        }
        this.charService.getCharacter(charId)
            .then((char) => {
                this.setState(() => {
                    return { char }
                })
            })
    }

    render() {

        if (!this.state.char) {
            return <span className="select-error"> Please select a character</span>
        }

        const { char } = this.state;
        const { name } = char;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {React.Children.map(this.props.children, (child) => {
                        //клонирует всеx children и даёт им в пропс child и {char} <- по деструктуризации
                        return React.cloneElement(child, {char})
                    })}
                </ul>
            </div>
        );
    }
}