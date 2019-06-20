export default class GotService {
    constructor() {
        //первая часть запроса на персонажей
        this._apiBase = 'https://www.anapioficeandfire.com/api/'
    }

    getResource = async (url) => {
        //если url отсутствует то вернёт всех
        const res = await fetch(this._apiBase + url)
        // Обработка ошибок
        if (!res.ok) {
            throw new Error(`Could not fetch ${url} rcvd status ${res.status}`)
        }
        //Возвращаем уже сджсоненый объект
        return await res.json()
    }

    getAllCharacters = async () => {
        const url = 'characters/?page=1&pageSize=10'
        const res = await this.getResource(url);
        //по мапу запускаем трансформчар VIA, попадает только V
        return res.map(this._transformChar);
    }

    getCharacter = async (id) => {
        const res = await this.getResource('characters/' + id);
        return this._transformChar(res);
    }

    getAllBooks = async () => {
        const res = await this.getResource('books/');
        return res.map(this._transformBook);
    }

    getAllHouses = async () => {
        const res = await this.getResource('houses/');
        return res.map(this._transformHouse);
    }

    getRandomCharacter = async () => {
        const res = await this.getResource('characters/' + Math.floor(Math.random() * (583 + 1)));
        return this._transformChar(res);
    }
    //Потрошим объект char, достаём нужные свойства
    _transformChar = (char) => {
        return {
            name: char.name || 'N/A',
            gender: char.gender || 'N/A',
            born: char.born || 'N/A',
            died: char.died || 'N/A',
            culture: char.culture || 'N/A'
        }
    }
    _transformBook = (book) => {
        return {
            name: book.name || 'N/A',
            publisher: book.publisher || 'N/A',
            country: book.country || 'N/A',
            released: book.released || 'N/A',
            mediaType: book.mediaType || 'N/A'
        }
    }
    _transformHouse = (house) => {
        return {
            name: house.name || 'N/A',
            region: house.region || 'N/A',
            coatOfArms: house.coatOfArms || 'N/A',
            words: house.words || 'N/A',
            overlord: house.overlord || 'N/A'
        }
    }
}