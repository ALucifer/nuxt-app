export default defineEventHandler((event) =>{
    return {
        libelle: Math.floor(Math.random() * 10)
    }
})