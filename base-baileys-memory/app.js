const { createBot, createProvider, createFlow, addKeyword, addChild } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const { EVENTS } = require('@bot-whatsapp/bot')


const flowSecundario = addKeyword(['2345']).addAnswer('Este mensaje envia tres botones', {
    buttons: [{ body: 'Boton 1' }, { body: 'Boton 2' }, { body: 'Boton 3' }],
})

const flowDespedida = addKeyword(['2'], { sensitive: true }).addAnswer(
    [
        'Gracias por contactarnos, desde Prosein siempre buscamos ofrecerle la mejor solución✨',
        'Recuerda que siempre estamos para ti.', 
        'Síguenos en nuestras rede sociales',
        'https://www.instagram.com/proseinvenezuela/?hl=es-la',
        'https://www.tiktok.com/@prosein_venezuela',
        'Y no olvides pasarte por nuestra web',
        'https://prosein.com.ve/',
    ]
)


var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
 
console.log(dateTime)



const flowCaracas = addKeyword(['1'],{ sensitive: true }).addAnswer(
    ["1. Boleíta Norte",
    "2. La Castellana",
    "3. El Bosque",
    "4. Las Mercedes",
    "5. Los Naranjos",
    "6. Catia"
    ],
    {capture:true},
    (ctx,{fallBack,flowDynamic}) =>
    {
        if (ctx.body == '1') {
        flowDynamic("Boleíta Norte: Calle Sanatorio del Ávila, C.C. Ciudad Center nivel 1, Boleíta Norte. Horario de lunes a viernes de 8:30am a 5:30pm y sábado de 9:30am a 5:00pm.");
        } else if (ctx.body == '2'){
        flowDynamic("La Castellana: Av. Principal de la Castellana, calle El Bosque con calle Chaguaramos, Edif. Prosein. Horario de lunes a viernes de 8:30am a 5:30pm y sábado de 9:30am a 5:00pm.")
        } else if (ctx.body == '3'){
        flowDynamic("El Bosque: Av. Principal El Bosque, entre Av. Libertador y C.C. Chacaito, Edif. Prosein. Horario de lunes a viernes de 8:30am a 5:30pm y sábado de 9:30am a 5:00pm.")
        } else if (ctx.body == '4'){
        flowDynamic("Las Mercedes: Calle París, entre New York y Caroní, Quinta Prosein. Horario de lunes a viernes de 8:30am a 5:30pm y sábado de 9:30am a 5:00pm.")
        }else if (ctx.body == '5'){
        flowDynamic("Los Naranjos: C.C. Casa Mall, local a1, cruce Av. Principal Los Naranjos con carretera El Cafetal. Horario de lunes a sábado de 10:00am a 6:00pm.")
        } else if (ctx.body == '6'){
        flowDynamic("Catia: Calle Panamericana, entre calle Chile y Bolivia, galpón n°30. Horario de lunes a viernes de 8:00am a 5:00pm y sábado de 9:00am a 2:00pm.")
        } else {
            return fallBack();
        }
})

const flowMiranda = addKeyword(['2'],{ sensitive: true }).addAnswer(
    [ 
        "1. Los Teques | El Tambor: Av. Williams Torbay, local Nº 21 y 23, Bajada El Tambor, zona industrial El Tambor, Sector La Lomita. Horario de lunes a sábado 8:00am a 2:00pm.",
        "2. Los Teques | San Antonio: Av. Chaid Torbay, edificio Industrial Campestre, piso 1, local 1, sector ind. Las Minas. San Antonio de los Altos. Al lado de autolavado Twister. Horario de lunes a sábado 8:00am a 2:00pm."
    ],
    {capture:true},
    (ctx,{fallBack,flowDynamic}) =>
    {
        if (ctx.body == '1') {
            flowDynamic("Los Teques | El Tambor: Av. Williams Torbay, local Nº 21 y 23, Bajada El Tambor, zona industrial El Tambor, Sector La Lomita. Horario de lunes a sábado 8:00am a 2:00pm.");
        } else if (ctx.body == '2'){
        flowDynamic("Los Teques | San Antonio: Av. Chaid Torbay, edificio Industrial Campestre, piso 1, local 1, sector ind. Las Minas. San Antonio de los Altos. Al lado de autolavado Twister. Horario de lunes a sábado 8:00am a 2:00pm.")
        } else {
            return fallBack();
        }
})

const flowLaguaira = addKeyword(['3'],{ sensitive: true }).addAnswer(
    [ 
        "1. La Guaira: Av. La Armada, sector la lucha, local Prosein. Frente a Farmatodo, Catia La Mar. Horario de lunes a viernes 8:00am a 5:00pm y sábado 8:00am a 3:00pm.",
    ],
    {capture:true},
    (ctx,{fallBack,flowDynamic}) =>
    {
        if (ctx.body == '1') {
            flowDynamic("La Guaira: Av. La Armada, sector la lucha, local Prosein. Frente a Farmatodo, Catia La Mar. Horario de lunes a viernes 8:00am a 5:00pm y sábado 8:00am a 3:00pm.");
        } else {
            return fallBack();
        }
})

const flowAragua = addKeyword(['4'], { sensitive: true }).addAnswer(
    [
        "1. Maracay | La Morita",
        "2. Maracay | Los Cedros"
    ],
    { capture: true },
    (ctx, {fallBack,flowDynamic}) => {
        if (ctx.body === '1') {
            flowDynamic("Maracay | La Morita: Av. Intercomunal Turmero - Maracay, C.C.I Metropolitano, edificio Techomat. Horario de lunes a viernes 8:00am a 4:00pm y sábado 8:00am a 2:00pm.");
        } else if (ctx.body === '2') {
            flowDynamic("Maracay | Los Cedros: Av. Los Cedros N° 154, entre fuerzas aéreas y Bermúdez, Sector Santa Ana. Horario de lunes a viernes 8:00am a 4:00pm y sábado 8:00am a 2:00pm.");
        } else {
            return fallBack();
        }
    }
);


const flowCarabobo = addKeyword(['5'], { sensitive: true }).addAnswer(
    [
        "1. Valencia"
    ],
    { capture: true },
    (ctx, {fallBack,flowDynamic}) => {
        if (ctx.body === '1') {
            flowDynamic("Valencia: Av. Monseñor Adams, calle 161, Urbanización El Viñedo, casa 104-61. Horario de lunes a viernes 8:30am a 5:00pm y sábado de 8:30am a 2:00pm.");
        } else {
            return fallBack();
        }
    }
);


const flowLara = addKeyword(['6'], { sensitive: true }).addAnswer(
    [
        "1. Barquisimeto"
    ],
    { capture: true },
    (ctx, {fallBack,flowDynamic}) => {
        if (ctx.body === '1') {
            flowDynamic("Barquisimeto: Urb. Nueva Segovia, calle 6 con carrera 2 y 3. Horario de lunes a viernes de 8:30am a 5:30pm y sábado de 9:30am a 5:00pm.");
        } else {
            return fallBack();
        }
    }
);


const flowPortuguesa = addKeyword(['7'], { sensitive: true }).addAnswer(
    [
        "14. Acarigua: Av. Circunvalación Sur, entre calles 3 y 4, Barrio San Antonio, Local Prosein, zona industrial. Horario de lunes a viernes de 8:00am a 5:00pm y sábado de 8:00am a 1:00pm."
    ],
    { capture: true },
    (ctx, {fallBack,flowDynamic}) => {
        if (ctx.body === '14') {
            flowDynamic("Acarigua: Av. Circunvalación Sur, entre calles 3 y 4, Barrio San Antonio, Local Prosein, zona industrial. Horario de lunes a viernes de 8:00am a 5:00pm y sábado de 8:00am a 1:00pm.");
        } else {
            return fallBack();
        }
    }
);


const flowBarinas = addKeyword(['8'], { sensitive: true }).addAnswer(
    [
        "1. Av. Libertad",
        "2. Alto Barinas"
    ],
    { capture: true },
    (ctx, {fallBack,flowDynamic}) => {
        if (ctx.body === '1') {
            flowDynamic("Av. Libertad: Av. Libertad entre Av. Br. Elias Cordero y calle Aranjuez, sector San Jose local 16-58. Horario de lunes a viernes 8:00am a 5:00pm y sábado 8:00am a 1:00pm.");
        } else if (ctx.body === '2') {
            flowDynamic("Alto Barinas: Av. Tachira, entre Av. Venezuela y calle Suiza, Edif. ADT, piso PB, local N° 1, Urb. Alto Barinas Sur, 5201. Horario de lunes a viernes 8:00am a 5:00pm y sábado 8:00am a 1:00pm.");
        } else {
            return fallBack();
        }
    }
);

const flowFalcon = addKeyword(['9'], { sensitive: true }).addAnswer(
    [
        "1. Punto Fijo"
    ],
    { capture: true },
    (ctx, {fallBack,flowDynamic}) => {
        if (ctx.body === '1') {
            flowDynamic("Punto Fijo: Av. Ollarvides entre Av. Táchira y Girardot, sector Parcelamiento El Jardín, local Prosein. Horario de lunes a viernes de 8:00am a 5:00pm.");
        } else {
            return fallBack();
        }
    }
);

const flowZulia = addKeyword(['10'], { sensitive: true }).addAnswer(
    [
        "1. Maracaibo | Calle 70 ",
        "2. Maracaibo | Milagro Norte"
    ],
    { capture: true },
    (ctx, {fallBack,flowDynamic}) => {
        if (ctx.body === '1') {
            flowDynamic("Maracaibo | Calle 70: Calle 70 con Av. 12, C.C. P&P, locales 1 y 2. Horario de lunes a viernes 8:00am a 5:00pm y sábado 8:00am a 12:30pm.");
        } else if (ctx.body === '2') {
            flowDynamic("Maracaibo | Milagro Norte: Av. 22, C.C. Prosein, sector Milagro Norte, vía la Barraca, al lado de la Res. Aguamarina. Horario de lunes a viernes 8:00am a 5:00pm y sábado 8:00am a 12:30pm.");
        } else {
            return fallBack();
        }
    }
);

const flowTrujillo = addKeyword(['11'], { sensitive: true }).addAnswer(
    [
        "1. Valera"
    ],
    { capture: true },
    (ctx, {fallBack,flowDynamic}) => {
        if (ctx.body === '1') {
            flowDynamic("Valera: Av. Bolívar, entre calle 26 y 27, Qta Yraidis, sector Las Acacias. Punto de referencia diagonal a Farmatodo. Horario de lunes a viernes 8:30am a 5:00pm y sábado 8:30am a 1:00pm.");
        } else {
            return fallBack();
        }
    }
);

const flowMerida = addKeyword(['12'], { sensitive: true }).addAnswer(
    [
        "1. Ejido",
        "2. Av. Las Américas"
    ],
    { capture: true },
    (ctx, {fallBack,flowDynamic}) => {
        if (ctx.body === '1') {
            flowDynamic("Ejido: Av. Bolívar, local Nro 219, Sector Montalbán, Ejido Mérida. Horario de lunes a viernes 8:00am a 4:00pm y sábado 9:00am a 12:00 pm.");
        } else if (ctx.body === '2') {
            flowDynamic("Av. Las Américas: Av. Las Américas, CC Terracota nivel PB Local 11B. Horario de lunes a sábado 8:30am a 06:30pm.");
        } else {
            return fallBack();
        }
    }
);

const flowAnzoategui = addKeyword(['13'], { sensitive: true }).addAnswer(
    [
        "1. Lechería"
    ],
    { capture: true },
    (ctx, {fallBack,flowDynamic}) => {
        if (ctx.body === '1') {
            flowDynamic("Lechería: Av. Intercomunal Jorge Rodríguez, Sector Las Garzas, C.C. Las Garzas, Local D. Horario de lunes a viernes 8:00am a 5:00pm y sábado 8:00am a 1:00pm.");
        } else {
            return fallBack();
        }
    }
);

const flowNuevaEsparta = addKeyword(['14'], { sensitive: true }).addAnswer(
    [
        "1. Porlamar"
    ],
    { capture: true },
    (ctx, {fallBack,flowDynamic}) => {
        if (ctx.body === '1') {
            flowDynamic("Porlamar: Av. Circunvalación José Asunción Rodríguez, a 100 mts del mercado de Conejeros. Horario de lunes a viernes 8:30am a 5:00pm y sábado de 8:30am a 2:00pm.");
        } else {
            return fallBack();
        }
    }
);

const flowBolivar = addKeyword(['15'], { sensitive: true }).addAnswer(
    [
        "1. Puerto Ordaz"
    ], 
    {capture: true}, (ctx, {fallBack,flowDynamic}) => 
    {
        if (ctx.body === '1') {
            flowDynamic("Puerto Ordaz: Av. Las Américas, edif. Otto, mezzanina #06. Horario de lunes a viernes de 8:00am a 4:00pm.");
        } else {
            return fallBack();
        }
    }
);

const flowTiendas = addKeyword(['1','tiendas', 'sucursales'], { sensitive: true }).addAnswer(
    [
        'Por favor indique el número de la ciudad de interes para obtener información de las sucursales disponibles:',
        '🏪 Lista de tiendas por ciudad:',
        '1. Caracas',
        '2. Miranda',
        '3. La Guaira',
        '4. Aragua',
        '5. Carabobo',
        '6. Lara',
        '7. Portuguesa',
        '8. Barinas',
        '9. Falcón',
        '10. Zulia',
        '11. Trujillo',
        '12. Mérida',
        '13. Anzoátegui',
        '14. Nueva Esparta',
        '15. Bolívar',
    ],
    null,
    null,
    [flowCaracas,flowMiranda,flowLaguaira,flowAragua,flowCarabobo,
    flowLara,flowPortuguesa,flowBarinas,flowFalcon,flowZulia,flowTrujillo,
    flowMerida,flowAnzoategui,flowNuevaEsparta,flowBolivar]
);

const flowCatalogo = addKeyword(['2','ped']).addAnswer(
    [
        '¿Qué catálogo desea ver? Escriba el número de la opción:',
        '1. Novedades 2023',
        '2. Novedades Brasil',
        '3. Vinil',
        '4. General',
        'Puede encontrar nuestros catálogos en el siguiente enlace:',
        'https://prosein.com.ve/catalogos-en-pdf/',
    ],
    {capture:true},
    (ctx,{fallBack,flowDynamic}) => {
        if (ctx.body == '1') {
            flowDynamic(" Novedades 2023\n\n https://prosein.com.ve/wp-content/uploads/2023/06/Catálogo-NOVEDADES-2023.pdf ");
        } else if (ctx.body == '2') {
            flowDynamic(" Novedades Brasil\n\n https://prosein.com.ve/wp-content/uploads/2023/05/CATÁLOGO-BRASIL_Novedades-2023.pdf ");
        } else if (ctx.body == '3') {
            flowDynamic(" Vinil\n\n https://prosein.com.ve/wp-content/uploads/2023/01/5.VINIL-LVT_NOVEDADES_2020.pdf ");
        } else if (ctx.body == '4') {
            flowDynamic(" General \n\n https://prosein.com.ve/wp-content/uploads/2021/06/PARTE-1-SERIES_2021-1.pdf ");
            return fallBack();
        }

    }
).addAnswer(
    [   '¿Deseas cotizar algún producto?',
        '👉 *1* Si',
        '👉 *2* No',
    ],
    null,
    null,
    [flowTiendas,flowDespedida]
)



const flowGracias = addKeyword(['gracias', 'grac'], { sensitive: true }).addAnswer(
    [
        'Muchas gracias por ponerte en contacto con Prosein. No olvides seguirnos en nuestras redes sociales y página web.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowReclamosSugerencias = addKeyword(['6']).addAnswer(
    ['¿En qué podemos ayudarte?'],{capture:true},
    (ctx,{fallBack,endFlow}) => {
        const horaActual = new Date().getHours();
        console.log(horaActual)
        if (horaActual >= 7 && horaActual < 17) {
            return endFlow({body:"Estimado cliente, lamentamos su experiencia.\n\n Entendemos su frustración y nos disculpamos por cualquier inconveniente que haya tenido.\n\n En minutos será atendido."});
        } else if (horaActual >= 17) {
            return endFlow({body:"Estimado cliente, lamentamos su experiencia.\n\n Entendemos su frustración y nos disculpamos por cualquier inconveniente que haya tenido.\n\n Actualmente nos encontramos cerrados. Próximamente recibirá atención personalizada."});
        }else {
            return fallBack();
        }
});

let nombre = ''
const flowPrincipal = addKeyword(['hola', 'ola', 'alo'])
.addAnswer('¡Gracias por contactar a *Prosein*! 🙌🏼.',{delay:1500})
    .addAnswer('Indíquenos,  por favor sus siguientes datos: Nombre, apellido y correo electrónico.',{capture:true},(ctx,{fallBack}) =>{
        if(!ctx.body.includes('@')) {
            var correo = ctx.body
            console.log(correo)
        }else{
            var correo = ctx.body
            console.log(correo)
        }
    })
    .addAnswer(
        [   'Cuéntanos, ¿cómo podemos ayudarte? Escriba el número de la opción que desee:',
            '👉 *1* Información: Horarios y Ubicaciones',
            '👉 *2* Catálogo',
            '👉 *3* Cotizar productos',
            '👉 *4* Promociones',
            '👉 *5* Disponibilidad de un Producto',
            '👉 *6* Reclamos y Sugerencias',
        ],null,
        null,
        [flowTiendas,flowGracias,flowReclamosSugerencias,flowSecundario,flowCatalogo]
)

// const flowBienvenida = addKeyword(EVENTS.WELCOME)
// .addAnswer('¡Gracias por contactar a *Prosein*! 🙌🏼.',{delay:1500})
//     .addAnswer('Indíquenos,  por favor sus siguientes datos: Nombre, apellido y correo electrónico.',{capture:true},(ctx,{fallBack}) =>{
//         if(!ctx.body.includes('@')) {
//             var correo = ctx.body
//             console.log(correo)
//         }else{
//             var correo = ctx.body
//             console.log(correo)
//         }
//     })
//     .addAnswer(
//         [   'Cuéntanos, ¿cómo podemos ayudarte? Escriba el número de la opción que desee:',
//             '👉 *1* Información: Horarios y Ubicaciones',
//             '👉 *2* Catálogo',
//             '👉 *3* Cotizar productos',
//             '👉 *4* Promociones',
//             '👉 *5* Disponibilidad de un Producto',
//             '👉 *6* Reclamos y Sugerencias',
//         ],
//         null,
//         null,
//         [flowTiendas, flowGracias, flowReclamosSugerencias,flowSecundario,flowCatalogo]
// )


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
