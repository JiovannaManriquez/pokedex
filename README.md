# Pokedex

Test técnico - React Native

Aplicación móvil desarrollada con React Native _Ver. 0.66.4_ que consume la [Poké API](https://pokeapi.co/) para crear un "Pokedex" al estilo Pokémon.

### Tabla de contenidos

**[Diseño UX/UI](#diseno)**<br>
**[Acciones](#acciones-consumidas)**<br>
**[Ejecución](#ejecución)**<br>
**[Pruebas](#pruebas)**

## Diseño UX/UI

**Light Mode**

| | | |
|:-------------------------:|:-------------------------:|:-------------------------:|
|<img alt="Screen 1 Pokedex" src="https://github.com/JiovannaManriquez/pokedex/blob/main/screenshots/light-mode/screen1-home.png"> | <img alt="Screen 2 Pokedex" src="https://github.com/JiovannaManriquez/pokedex/blob/main/screenshots/light-mode/screen2-search-results.png"> | <img alt="Screen 3 Pokedex" src="https://github.com/JiovannaManriquez/pokedex/blob/main/screenshots/light-mode/screen3-pokemon-detail-about.png"> |
|<img alt="Screen 4 Pokedex" src="https://github.com/JiovannaManriquez/pokedex/blob/main/screenshots/light-mode/screen4-pokemon-detail-stats.png">  |  <img alt="Screen 5 Pokedex" src="https://github.com/JiovannaManriquez/pokedex/blob/main/screenshots/light-mode/screen5-pokemon-detail-evolve.png">|<img alt="Screen 6 Pokedex" src="https://github.com/JiovannaManriquez/pokedex/blob/main/screenshots/light-mode/screen6-pokemon-detail-moves.png">|

**Dark Mode**

| | | |
|:-------------------------:|:-------------------------:|:-------------------------:|
|<img alt="Screen 1 Pokedex" src="https://github.com/JiovannaManriquez/pokedex/blob/main/screenshots/dark-mode/screen1-home.png"> | <img alt="Screen 2 Pokedex" src="https://github.com/JiovannaManriquez/pokedex/blob/main/screenshots/dark-mode/screen2-search-results.png"> | <img alt="Screen 3 Pokedex" src="https://github.com/JiovannaManriquez/pokedex/blob/main/screenshots/dark-mode/screen3-pokemon-detail-about.png"> |
|<img alt="Screen 4 Pokedex" src="https://github.com/JiovannaManriquez/pokedex/blob/main/screenshots/dark-mode/screen4-pokemon-detail-stats.png">  |  <img alt="Screen 5 Pokedex" src="https://github.com/JiovannaManriquez/pokedex/blob/main/screenshots/dark-mode/screen5-pokemon-detail-evolve.png">|<img alt="Screen 6 Pokedex" src="https://github.com/JiovannaManriquez/pokedex/blob/main/screenshots/dark-mode/screen6-pokemon-detail-moves.png">|


## Acciones consumidas

-   Pokemon: *https://pokeapi.co/api/v2/pokemon/{id_or_name}/*.
-   Pokemon Species: *https://pokeapi.co/api/v2/pokemon-species/{id_or_name}/*.
-   Pokemon Location Areas: *https://pokeapi.co/api/v2/pokemon/{id_or_name}/encounters*.
-   Stats: *https://pokeapi.co/api/v2/stat/{id_or_name}/*.
-   Abilities: *https://pokeapi.co/api/v2/ability/{id_or_name}/*.
-   Evolution Chains: *https://pokeapi.co/api/v2/evolution-chain/{id}/*.
-   Moves: *https://pokeapi.co/api/v2/move/{id_or_name}/*.

## Ejecución

Con el fin de construir y correr la app en tu dispositivo, necesitarás ejecutar e instalar los entornos de desarrollo nativo para iOS y Android, XCode y Android Studio respectivamente.

Puedes consultar la configuración del entorno de desarrollo en https://reactnative.dev/docs/environment-setup.


Para ejecutar el código, construir e instalar la app, ingresa los siguientes comandos:

```
git clone https://github.com/JiovannaManriquez/pokedex.git
cd pokedex
yarn install
npx react-native run-android
npx react-native run-ios
```


## Pruebas

Utilizando Jest como ejecutor de pruebas por defecto para proyectos React Native, ejecuta `jest` desde la raíz del proyecto. 

**Pruebas unitarias**

- **getEvolutions**: Función para obtener todas las evoluciones de un Pokémon. Incluye 3 casos de prueba: <br>
    _Caso 1:_ Pokémon en la raíz del árbol genérico. <br>
    _Caso 2:_ Pokémon en medio del árbol genérico. <br>
    _Caso 3:_ Pokémon al final del árbol genérico (sin evoluciones).
- **getMovesCount**: Función que obtiene el número de movimiento de un Pokémon en una versión de grupo definida. Por ejemplo: "red-blue".

**Prueba de integración de UI**

-   App test: Prueba el renderizado del componente `<App/>`.
