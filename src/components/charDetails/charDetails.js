import React, { Component } from 'react';
import GotCharService from '../../services/GotService'
import './charDetails.css';
export default class CharDetails extends Component {

    state = {
        char: null,
    }
    charService = new GotCharService();

    componentDidMount() {
        this.updateChar()
        this.foo.bar = 0
    }
    //Если пришли новые пропсы запустит функцию updateChar
    componentDidUpdate(prevProps) {
        if(this.props.charId !== prevProps.charId){
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

        const { name, gender, born, died, culture } = this.state.char;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </li>
                </ul>
            </div>
        );
    }
}