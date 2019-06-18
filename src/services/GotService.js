export default class GotCharService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api/characters/'
    }

    async getResource(url) {
        const res = await fetch(this._apiBase + url)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url} rcvd status ${res.status}`)
        }        

        return await res.json()
    }

    getAllCharacters() {
        return this.getResource()
    }

    getCharacter(id) {
        return this.getResource(id)
    }

    getRandomCharacter() {
        return this.getResource(Math.floor(Math.random() * (583 - 1 + 1) + 1));
    }
}