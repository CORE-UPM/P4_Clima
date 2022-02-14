// Programa principal

const {
    load,
    maxTemp,
    minTemp,
    maxTempMin,
    minTempMax,
    averageTemp,
    warmerAverageTemp,
    maxNorth,
    maxSouth,
    gravityCenter,
    closestGC } = require ('./practica4.js');

const citiesFilename = './cities.json';

let main = async () => {

    try {
        const cities = await load(citiesFilename);

        console.log("Numero de ciudades =", cities.length);

        // si no hay ciudades, termino el programa.
        if (cities.length === 0) process.exit(0);

        console.log("Temperatura Maxima =", maxTemp(cities));
        console.log("Temperatura Mínima =", minTemp(cities));
        console.log("Temperatura Media =", averageTemp(cities));
        console.log("Más calientes que la temperatura Media =", warmerAverageTemp(cities).join(", "));
        console.log("Temperatura Max Mímima =", minTempMax(cities));
        console.log("Temperatura Min Máxima =", maxTempMin(cities));
        console.log("Ciudad más al norte =", maxNorth(cities));
        console.log("Ciudad más al sur =", maxSouth(cities));
        console.log("Centro de gravedad =", gravityCenter(cities));
        console.log("Más cerca de Centro de Gravedad =", closestGC(cities));
    } catch (error) {
        console.log(error);
    }    
}

main();