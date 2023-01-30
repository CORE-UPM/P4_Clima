// Programa principal

const {
    load,
    max_temp,
    min_temp,
    max_temp_min,
    min_temp_max,
    average_temp,
    warmer_average_temp,
    max_north,
    max_south,
    gravity_center,
    closest_GC } = require ('./practica4.js');

const citiesFilename = './cities.json';

let main = async () => {

    try {
        const cities = await load(citiesFilename);

        console.log("Numero de ciudades =", cities.length);

        // si no hay ciudades, termino el programa.
        if (cities.length === 0) process.exit(0);

        console.log("Temperatura Maxima =", max_temp(cities));
        console.log("Temperatura Mínima =", min_temp(cities));
        console.log("Temperatura Media =", average_temp(cities));
        console.log("Más calientes que la temperatura Media =", warmer_average_temp(cities).join(", "));
        console.log("Temperatura Max Mímima =", min_temp_max(cities));
        console.log("Temperatura Min Máxima =", max_temp_min(cities));
        console.log("Ciudad más al norte =", max_north(cities));
        console.log("Ciudad más al sur =", max_south(cities));
        console.log("Centro de gravedad =", gravity_center(cities));
        console.log("Más cerca de Centro de Gravedad =", closest_GC(cities));
    } catch (error) {
        console.log(error);
    }
}

main();
