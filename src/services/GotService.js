export default class GotCharService {
    constructor() {
        //первая часть запроса на персонажей
        this._apiBase = 'https://www.anapioficeandfire.com/api/characters/'
    }

    async getResource(url) {
        //если url отсутствует то вернёт всех
        const res = await fetch(this._apiBase + url)
        // Обработка ошибок
        if (!res.ok) {
            throw new Error(`Could not fetch ${url} rcvd status ${res.status}`)
        }
        //Возвращаем уже сджсоненый объект
        return await res.json()
    }

    async getAllCharacters() {
        const res = await this.getResource();
        //по мапу запускаем трансформчар VIA, попадает только V
        return res.map(this._transformChar);
    }

    async getCharacter(id) {
        const res = await this.getResource(id);
        return this._transformChar(res);
    }

    async getRandomCharacter() {
        const res = await this.getResource(Math.floor(Math.random() * (583 - 1 + 1) + 1));
        return this._transformChar(res);
    }
    //Потрошим объект char, достаём нужные свойства
    _transformChar(char) {
        return {
            name: char.name || 'N/A',
            gender: char.gender || 'N/A',
            born: char.born || 'N/A',
            died: char.died || 'N/A',
            culture: char.culture || 'N/A'
        }
    }
}