export default class ProviderDTO {
    constructor(private name: String) {
    }
    equalTo(name: String) {
        return this.name === name
    }
    static google() {
        return new ProviderDTO('google')
    }
}