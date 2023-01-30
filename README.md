<img  align="left" width="150" style="float: left;" src="https://www.upm.es/sfs/Rectorado/Gabinete%20del%20Rector/Logos/UPM/CEI/LOGOTIPO%20leyenda%20color%20JPG%20p.png">
<img  align="right" width="60" style="float: right;" src="http://www.dit.upm.es/figures/logos/ditupm-big.gif">

<br/><br/><br/>

# Práctica 4 - Clima

Versión: 25 de Enero de 2023

## Objetivos

- Crear un módulo de Node.js y exportar funciones.
- Leer ficheros de forma asíncrona.
- Practicar con arrays y objetos y métodos para procesar arrays (`map`, `reduce`, `filter`, `forEach`, etc.) 


## Descripción de la práctica

En esta práctica, partiremos de un fichero json (`cities.json`) con información metereológica de varias provincias españolas en un día cualquiera sobre el que se van a realizar distintas consultas. La información ha sido extraída de https://openweathermap.org y un ejemplo de respuesta es el siguiente:

```
[
    {
        "coord": {
            "lon": -8.396,
            "lat": 43.3713
        },
        "weather": [
            {
                "id": 803,
                "main": "Clouds",
                "description": "muy nuboso",
                "icon": "04d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 13.45,
            "feels_like": 13.15,
            "temp_min": 12.66,
            "temp_max": 14.71,
            "pressure": 1024,
            "humidity": 88
        },
        "visibility": 10000,
        "wind": {
            "speed": 0.45,
            "deg": 290,
            "gust": 3.13
        },
        "clouds": {
            "all": 75
        },
        "dt": 1641828987,
        "sys": {
            "type": 2,
            "id": 2002597,
            "country": "ES",
            "sunrise": 1641801906,
            "sunset": 1641834995
        },
        "timezone": 3600,
        "id": 3119841,
        "name": "A Coruna",
        "cod": 200
    },
	{...},
	{...},
]
```
Los campos de interés para la práctica son:
- `coord`:
  - `coord.lon`: City geo location, longitude
  - `coord.lat`: City geo location, latitude
- `weather`: Información del tiempo
	- `weather.id` Weather condition id
	- `weather.main` Group of weather parameters (Rain, Snow, Extreme etc.)
	- `weather.description` Weather condition within the group
	- `weather.icon` Weather icon id.
- `base`: Internal parameter of the API
- `visibility`: Internal parameter of the API
- `main`:
  - `main.temp:` Temperature. Unit: Celsius.
  - `main.feels_like:` Temperature. This temperature parameter accounts for the human perception of weather. Unit: Celsius.
  - `main.temp_min:` Minimum temperature observed. Unit: Celsius.
  - `main.temp_max:` Maximum temperature observed. Unit: Celsius.
  - `main.pressure:` Atmospheric pressure. Unit: hPa.
  - `main.humidity:` Humidity, %
- `wind`:
  - `wind.speed:` Wind speed. Unit: meter/sec.
  - `wind.deg:` Wind direction, degrees.
  - `wind.gust:` Wind gust. Unit: meter/sec.
- `clouds`:
  - `clouds.all:` Cloudiness, %
- `dt`: Time of data calculation. UTC
- `sys`:
  - `sys.type`: Internal parameter of the API
  - `sys.id`: Internal parameter of the API
  - `sys.message`: Internal parameter of the API
  - `sys.country`: Country code (GB, JP etc.)
  - `sys.sunrise`: Sunrise time. UTC
  - `sys.sunset`: Sunset time. UTC
- `timezone`: Shift in seconds from UTC
- `id`: City ID
- `name`: City name
- `cod`: Internal parameter of the API



## Descargar el código del proyecto

Instrucciones [aquí](https://github.com/CORE-UPM/Instrucciones_Practicas/blob/main/README.md#descargar-el-c%C3%B3digo-del-proyecto).


## Tareas

Todas las tareas en esta práctica consistirán en escribir una serie de funciones en un módulo de Node.js llamado `practica4.js` que se ubicará en el directorio raíz del proyecto. Este módulo exportará las funciones definidas de la siguiente manera:

```
exports.nombreFuncion = (parametros) => {
    [...]
    return valor;
}
```

Para superar la entrega el alumno debe realizar las siguientes funciones:

### 1. Leer un fichero de forma asíncrona.

- `load(citiesFilename)`. Lee de forma asíncrona el JSON contenido en un fichero.
  - Parámetro `citiesFilename` con el nombre del fichero de ciudades.
  - Devuelve el array de ciudades. [Pista: Utilizar la función `JSON.parse`]

### 2. Obtener información sobre temperaturas.

- `max_temp(cities)`. Obtiene la temperatura (temp) de todas las ciudades y devuelve la temperatura más alta.
  - Parámetro `cities` con el array de ciudades.
  - Devuelve un número.

- `min_temp(cities)`. Obtiene la temperatura (temp) de todas las ciudades y devuelve la temperatura más baja.
  - Parámetro `cities` con el array de ciudades.
  - Devuelve un número.

- `max_temp_min(cities)`. Obtiene la temperatura de todas las ciudades y devuelve la temperatura de la temperatura mínima más alta.
  - Parámetro `cities` con el array de ciudades.
  - Devuelve un número.

- `min_temp_max(cities)`. Obtiene la temperatura de todas las ciudades y devuelve la temperatura de la temperatura máxima más baja.
  - Parámetro `cities` con el array de ciudades.
  - Devuelve un número.

- `average_temp(cities)`. Obtiene la temperatura (temp) de todas las ciudades y devuelve la temperatura media.
  - Parámetro `cities` con el array de ciudades.
  - Devuelve un número.

- `warmer_average_temp(cities)`. Devuelve un array con el nombre de las ciudades cuya temperatura supera la temperatura media.
  - Parámetro `cities` con el array de ciudades.
  - Devuelve un array.

### 3. Filtrar por posición geográfica.

- `max_north(cities)`. Devuelve el nombre de la ciudad situada más al norte.
  - Parámetro `cities` con el array de ciudades.
  - Devuelve un string.

- `max_south(cities)`. Devuelve el nombre de la ciudad situada más al sur.
  - Parámetro `cities` con el array de ciudades.
  - Devuelve un string.

- `gravity_center(cities)`. Calcula el centro de gravedad de todas las ciudades usando como posición la latitud y longitud. El centro de gravedad se calcula como la media aritmética de las latitudes y longitudes.
  - Parámetro `cities` con el array de ciudades.
  - Devuelve un objeto con dos propiedades, lat y lon, que contienen las coordenadas del centro de gravedad.
  
- `closest_GC(cities)`. Devuelve el nombre de la ciudad más cercana al centro de gravedad. [Pista: Calcular las distancias entre cada una de las ciudades y el centro de gravedad]
  - Parámetro `cities` con el array de ciudades.
  - Devuelve un string.

## Comprobar las soluciones

Para poder comprobar el resultado de las funciones desarrolladas antes de pasar el autocorector, se proporciona al alumno el fichero `main.js`:

```
node main.js
```

Este programa utiliza las funciones desarrolladas por el alumno en el fichero `practica4.js` y proporciona el resultado de ejecutarlas para los datos del fichero `cities.json`. A continuación puede verse un ejemplo de la salida de ejecutar dicho programa con las funciones implementadas correctamente:

```
Numero de ciudades = 52
Temperatura Maxima = 21.84
Temperatura Mínima = 8.01
Temperatura Media = 13.67923076923077
Más calientes que la temperatura Media = Alicante, Almeria, Badajoz, Caceres, Cadiz, Castellon, Ceuta, Ciudad Real, Province of Huelva, Huesca, Las Palmas, Lleida, Madrid, Málaga, Melilla, Murcia, Ourense, Pontevedra, Seville, Santa Cruz de Tenerife, Toledo, Valencia, Zamora, Zaragoza
Temperatura Max Mímima = 9.02
Temperatura Min Máxima = 20.4
Ciudad más al norte = A Coruña
Ciudad más al sur = Las Palmas
Centro de gravedad = { lon: -3.8182807692307694, lat: 39.93043653846154 }
Más cerca de Centro de Gravedad = Toledo
```

Es importante tener en cuenta que para que el programa `main.js` funcione es necesario que las funciones estén al menos definidas en `practica4.js`. Por lo tanto se recomienda crear el esqueleto del fichero solución con la definición de las funciones y a continuación proceder a su implementación paulatinamente. 

## Consideraciones adicionales y recomendaciones

IMPORTANTE:  Todas las funciones deben tener el nombre que se ha pedido en el enunciado, si a la función de gravity_center por ejemplo la llamamos "gravity_enter" el autocorector no la encontrará y no nos dará los puntos. Ponga exactamente lo que se pide respetando mayúsculas y acentos.

De cara al examen piense en qué ha aprendido y qué cosas podría modificar y controlar de la práctica. Por ejemplo, crear una nueva función con un segundo parámetro que devuelva las ciudades que tienen una temperatura máxima más alta que el parámetro, una función que devuelva la ciudad con la mayor diferencia entre
la temperatura(main.temp) y la temperatura percibida(main.feels_like)...


## Pruebas con el autocorector

Instrucciones [aquí](https://github.com/CORE-UPM/Instrucciones_Practicas/blob/main/README.md#pruebas-con-el-autocorector).

## Pruebas manuales y capturas de pantalla

Instrucciones [aquí](https://github.com/CORE-UPM/Instrucciones_Practicas/blob/main/README.md#pruebas-manuales-y-capturas-de-pantalla).

Capturas a entregar con esta práctica: 

- Captura 1: Captura de pantalla de la ejecución del programa

<kbd>
<img src="https://user-images.githubusercontent.com/52309/211211260-38d440ff-df4e-4fd7-854b-cdc850d79e7a.png" alt="drawing" width="500"/>
</kbd>

- Captura 2: Captura de pantalla del código del fichero practica4.js (o que se vea al menos una parte de él).

## Instrucciones para la Entrega y Evaluación.

Instrucciones [aquí](https://github.com/CORE-UPM/Instrucciones_Practicas/blob/main/README.md#instrucciones-para-la-entrega-y-evaluaci%C3%B3n
).

## Rúbrica

Se puntuará el ejercicio a corregir sumando el % indicado a la nota total si la parte indicada es correcta:

- **10%:** Función `load`
- **5%:** Función `max_temp`
- **5%:** Función `min_temp`
- **5%:** Función `max_temp_min`
- **5%:** Función `min_temp_max`
- **10%:** Función `average_temp`
- **10%:** Función `warmer_average_temp`
- **5%:** Función `max_north`
- **5%:** Función `max_south`
- **20%:** Función `gravity_center`
- **20%:** Función `closest_GC`


Si pasa todos los tests se dará la máxima puntuación.
