--Instalación

    Vamos a comenzar intalando testing library, jest, fetch mock
        npm install --save-dev jest
        npm install --save-dev @testing-library/react


    --intalamos el package de jest fetch mock para mockear las peticiones a las APIs
        usamos el comando :
            npm install --save-dev jest-fetch-mock

--configuración
     podemos personalizar el comportamiento creando un archivo de config
    vamos a crear dicho archivo
    en la raiz del proyecto creamos un archivo llamado:
        jest.config.js

        creamos una configuración básica con module.exports = {verbose: true}
        esto hace que jest nos muestre más detalles en la consola al ejecutar pruebas

--pruebas
    dentro del folder de components vamos a crear el folder __tests__
    dentro de este folder irán tantos archivos como componentes tengamos trendráan la nomenclatura:
    Nombre.test.js

    me parece buen idea comenzar con el componete header, que es más sencillo
        dentro de tests creamos el archivo Header.test.js
            vamos a probar componentes de react, asi que importamos react
            abrimos un describe
            ahora vamos a utilizar una función de react testing libray llamada render
            render nos va a ayudar a renderizar el componente dentro de las pruebas

            vamos a almacenar el render en una variable para mayor practicidad
        
        importamos  screen para visualizar los datos de la pantalla desde testing library
            almacenamos el título del componente en la variable title
            hacemos un expect con la variable title como argumento y el método toBeInTheDocument
    corremos la prueba con el comando :
        npx jest

--debug
    nos dio error, parece que no está leyendo el jest config
    en la documentación de Jest nos aparece la config basica del jest.config.js
     copiamos la configuración desde la documentación y la pegamos en nuestro archivo
     creamos el archivo setupJest dentro de src
    
    parece que no esta leyendo la configuracion del setup jest porque no tenemos intalado jest-dom
    instalamos jest dom con el comando:
    npm install --save-dev @testing-library/jest-dom

    al comparar el package json de mi ministore con el de la leccion 1 de este modulo encuentro que me falta por instalar :
    @testing-library/dom
    @testing-library/user-event
    vamos a intalarlos con el comando 
    npm install --save-dev @testing-library/dom @testing-library/user-event

    aun me marca un error de sintaxis y dice que no se está leyendo un prop correctamente, parece que al tener instalado babel
    es necesario configurar babel para poder usar Jest
    segun copilot tenemos que crear un archivo de configuracion de babel, llamado babel.config.js a nivel raiz
        debe tener la config que le pasamo al archivo, es para  que se comunique con Jest

        además tenemos que tener instalado correctamente babel
         usamos el comando :
         npm install --save-dev @babel/preset-env @babel/preset-react babel-jest
    vamos a configura el jest.config.js para utilizar babel
        añadimos el codigo al archivo

    como aun no , en la consola nos manda unos links a la documentación, vamos a abrirlos y leerlos
le pedimos a chat gpt que nos diga que està fallando, y que tome la inforamcion de dichos sitios web

dice que intalemos babel core y demas:
    npm install --save-dev babel-jest @babel/core @babel/preset-env

configuramos babel:
    module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-react',
    ],
    };

dice que actualicemos jest,config.js
    transformIgnorePatterns: [
    '/node_modules/(?!axios)/',
  ],

verificar que nuestro archivo slice esté importando correctamente axios
    import axios from 'axios';

al final le pedi a blackbox que me ayudara, al parecer, si está bien lo de chat gpt, pero no habíamos instalado babel-jest, que era el traductor de JSX a JS

    
abrí una nueva ventana donde solo tengo el mini store para pedirle a blackbox que ma ayude a debugear pero aunque estaba la carpeta de __test__ 
ya no estaba la prueba al header que habíamos hecho, tendré que hacerlo de nuevo

al parecer, provar componentes en react con redux es un poco más dificil

dado que la app completa está envuelta en un provider, tambien tenemos que envolver el componente header en un provider para reenderizarlo

--Nota importantisima
    Si ejecutas el comando npm test con el escript por default de react, las pruebas fallan, pero si escribes npx jest pasan
    para evitar más confusines modificaremos el comando test del package json para que ejecute jest directamente


--Pruebas
    1. Pruebas del componente Header
        Archivo: tests/Header.test.js

        Objetivo: Verificar que el encabezado se renderiza correctamente. utilizamos el método render que tiene el componente envuelto en el provider

        Pruebas sugeridas:

        El título de la aplicación (Biblioteca Musical) se muestra correctamente. validamos que el título Mini-Store -- v 2.0 lo contenga el header con el método screen.getByText y hacemos el eexpect con 
        .toBeInTheDocument

        El svg del carrito se muestra correctamente, para ello utilizamos el método .toContain para verificar que svg está dentro del header
        además verificamos con una funcion mock que al hacer click en el svg, se llama la función toggleCart, para eso debemos simular el dispatch en la prueba, lo hacemos al principio
        ahora hacemos un beforeEach del render y el mockStore, para evitar repetir código


        No se muestra contenido adicional.