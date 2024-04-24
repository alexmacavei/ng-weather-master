// {
//     "cod": "200",
//     "message": 0,
//     "cnt": 5,
//     "list": [
//     {
//         "dt": 1713960000,
//         "main": {
//             "temp": 55.72,
//             "feels_like": 55.13,
//             "temp_min": 54.01,
//             "temp_max": 55.72,
//             "pressure": 1018,
//             "sea_level": 1018,
//             "grnd_level": 990,
//             "humidity": 88,
//             "temp_kf": 0.95
//         },
//         "weather": [
//             {
//                 "id": 500,
//                 "main": "Rain",
//                 "description": "light rain",
//                 "icon": "10d"
//             }
//         ],
//         "clouds": {
//             "all": 97
//         },
//         "wind": {
//             "speed": 3.06,
//             "deg": 277,
//             "gust": 6.24
//         },
//         "visibility": 10000,
//         "pop": 0.3,
//         "rain": {
//             "3h": 0.54
//         },
//         "sys": {
//             "pod": "d"
//         },
//         "dt_txt": "2024-04-24 12:00:00"
//     },
//     {
//         "dt": 1713970800,
//         "main": {
//             "temp": 61.07,
//             "feels_like": 60.4,
//             "temp_min": 61.07,
//             "temp_max": 63.3,
//             "pressure": 1019,
//             "sea_level": 1019,
//             "grnd_level": 992,
//             "humidity": 75,
//             "temp_kf": -1.24
//         },
//         "weather": [
//             {
//                 "id": 803,
//                 "main": "Clouds",
//                 "description": "broken clouds",
//                 "icon": "04d"
//             }
//         ],
//         "clouds": {
//             "all": 67
//         },
//         "wind": {
//             "speed": 7.09,
//             "deg": 358,
//             "gust": 9.86
//         },
//         "visibility": 10000,
//         "pop": 0,
//         "sys": {
//             "pod": "d"
//         },
//         "dt_txt": "2024-04-24 15:00:00"
//     },
//     {
//         "dt": 1713981600,
//         "main": {
//             "temp": 69.06,
//             "feels_like": 67.84,
//             "temp_min": 69.06,
//             "temp_max": 69.06,
//             "pressure": 1020,
//             "sea_level": 1020,
//             "grnd_level": 992,
//             "humidity": 46,
//             "temp_kf": 0
//         },
//         "weather": [
//             {
//                 "id": 802,
//                 "main": "Clouds",
//                 "description": "scattered clouds",
//                 "icon": "03d"
//             }
//         ],
//         "clouds": {
//             "all": 27
//         },
//         "wind": {
//             "speed": 7.92,
//             "deg": 328,
//             "gust": 11.1
//         },
//         "visibility": 10000,
//         "pop": 0,
//         "sys": {
//             "pod": "d"
//         },
//         "dt_txt": "2024-04-24 18:00:00"
//     },
//     {
//         "dt": 1713992400,
//         "main": {
//             "temp": 68.4,
//             "feels_like": 67.1,
//             "temp_min": 68.4,
//             "temp_max": 68.4,
//             "pressure": 1019,
//             "sea_level": 1019,
//             "grnd_level": 991,
//             "humidity": 46,
//             "temp_kf": 0
//         },
//         "weather": [
//             {
//                 "id": 803,
//                 "main": "Clouds",
//                 "description": "broken clouds",
//                 "icon": "04d"
//             }
//         ],
//         "clouds": {
//             "all": 63
//         },
//         "wind": {
//             "speed": 8.95,
//             "deg": 325,
//             "gust": 9.4
//         },
//         "visibility": 10000,
//         "pop": 0,
//         "sys": {
//             "pod": "d"
//         },
//         "dt_txt": "2024-04-24 21:00:00"
//     },
//     {
//         "dt": 1714003200,
//         "main": {
//             "temp": 58.68,
//             "feels_like": 57.58,
//             "temp_min": 58.68,
//             "temp_max": 58.68,
//             "pressure": 1021,
//             "sea_level": 1021,
//             "grnd_level": 992,
//             "humidity": 71,
//             "temp_kf": 0
//         },
//         "weather": [
//             {
//                 "id": 803,
//                 "main": "Clouds",
//                 "description": "broken clouds",
//                 "icon": "04d"
//             }
//         ],
//         "clouds": {
//             "all": 75
//         },
//         "wind": {
//             "speed": 6.24,
//             "deg": 358,
//             "gust": 13.06
//         },
//         "visibility": 10000,
//         "pop": 0,
//         "sys": {
//             "pod": "d"
//         },
//         "dt_txt": "2024-04-25 00:00:00"
//     }
// ],
//     "city": {
//     "id": 0,
//         "name": "Thompsons Station",
//         "coord": {
//         "lat": 35.809,
//             "lon": -86.8913
//     },
//     "country": "US",
//         "population": 0,
//         "timezone": -18000,
//         "sunrise": 1713956553,
//         "sunset": 1714004899
// }
// }


export interface Forecast {
    city:    City;
    cod:     string;
    message: number;
    cnt:     number;
    list:    List[];
}

export interface City {
    id:         number;
    name:       string;
    coord:      Coord;
    country:    string;
    population: number;
    timezone:   number;
}

export interface Coord {
    lon: number;
    lat: number;
}

export interface List {
    dt:         number;
    sunrise:    number;
    sunset:     number;
    temp:       Temp;
    feels_like: FeelsLike;
    pressure:   number;
    humidity:   number;
    weather:    Weather[];
    speed:      number;
    deg:        number;
    gust:       number;
    clouds:     number;
    pop:        number;
    rain?:      number;
}

export interface FeelsLike {
    day:   number;
    night: number;
    eve:   number;
    morn:  number;
}

export interface Temp {
    day:   number;
    min:   number;
    max:   number;
    night: number;
    eve:   number;
    morn:  number;
}

export interface Weather {
    id:          number;
    main:        string;
    description: string;
    icon:        string;
}
