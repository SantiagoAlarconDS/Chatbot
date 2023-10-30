const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2345']).addAnswer('Este mensaje envia tres botones', {
    buttons: [{ body: 'Boton 1' }, { body: 'Boton 2' }, { body: 'Boton 3' }],
})

const flowCatalogo = addKeyword(['2']).addAnswer(
    [
        '¿Qué catálogo desea ver? Escriba el número de la opción:',
        '1. Novedades 2023',
        '2. Novedades Brasil',
        '3. Vinil',
        '4. General',
        'Puede encontrar nuestros catálogos en el siguiente enlace:',
        'https://prosein.com.ve/catalogos-en-pdf/',
    ],
    null,
    null,
    [flowSecundario]
)

const flowMostrarSucursales = addKeyword(['1', '2']).addAnswer('ENRTO');

const sucursalesPorCiudad = {
    "ccs": [
        "1. Boleíta Norte: Calle Sanatorio del Ávila, C.C. Ciudad Center nivel 1, Boleíta Norte. Horario de lunes a viernes de 8:30am a 5:30pm y sábado de 9:30am a 5:00pm.",
        "2. La Castellana: Av. Principal de la Castellana, calle El Bosque con calle Chaguaramos, Edif. Prosein. Horario de lunes a viernes de 8:30am a 5:30pm y sábado de 9:30am a 5:00pm.",
        "3. El Bosque: Av. Principal El Bosque, entre Av. Libertador y C.C. Chacaito, Edif. Prosein. Horario de lunes a viernes de 8:30am a 5:30pm y sábado de 9:30am a 5:00pm.",
        "4. Las Mercedes: Calle París, entre New York y Caroní, Quinta Prosein. Horario de lunes a viernes de 8:30am a 5:30pm y sábado de 9:30am a 5:00pm.",
        "5. Los Naranjos: C.C. Casa Mall, local a1, cruce Av. Principal Los Naranjos con carretera El Cafetal. Horario de lunes a sábado de 10:00am a 6:00pm.",
        "6. Catia: Calle Panamericana, entre calle Chile y Bolivia, galpón n°30. Horario de lunes a viernes de 8:00am a 5:00pm y sábado de 9:00am a 2:00pm."
    ],
    "miranda": [
        "7. Los Teques | El Tambor: Av. Williams Torbay, local Nº 21 y 23, Bajada El Tambor, zona industrial El Tambor, Sector La Lomita. Horario de lunes a sábado 8:00am a 2:00pm.",
        "8. Los Teques | San Antonio: Av. Chaid Torbay, edificio Industrial Campestre, piso 1, local 1, sector ind. Las Minas. San Antonio de los Altos. Al lado de autolavado Twister. Horario de lunes a sábado 8:00am a 2:00pm."
    ],
    "laguaira": [
        "9. La Guaira: Av. La Armada, sector la lucha, local Prosein. Frente a Farmatodo, Catia La Mar. Horario de lunes a viernes 8:00am a 5:00pm y sábado 8:00am a 3:00pm."
    ],
    "aragua": [
        "10. Maracay | La Morita: Av. Intercomunal Turmero - Maracay, C.C.I Metropolitano, edificio Techomat. Horario de lunes a viernes 8:00am a 4:00pm y sábado 8:00am a 2:00pm.",
        "11. Maracay | Los Cedros: Av. Los Cedros N° 154, entre fuerzas aéreas y Bermúdez, Sector Santa Ana. Horario de lunes a viernes 8:00am a 4:00pm y sábado 8:00am a 2:00pm."
    ],
    "carabobo": [
        "12. Valencia: Av. Monseñor Adams, calle 161, Urbanización El Viñedo, casa 104-61. Horario de lunes a viernes 8:30am a 5:00pm y sábado de 8:30am a 2:00pm."
    ],
    "lara": [
        "13. Barquisimeto: Urb. Nueva Segovia, calle 6 con carrera 2 y 3. Horario de lunes a viernes de 8:30am a 5:30pm y sábado de 9:30am a 5:00pm."
    ],
    "portuguesa": [
        "14. Acarigua: Av. Circunvalación Sur, entre calles 3 y 4, Barrio San Antonio, Local Prosein, zona industrial. Horario de lunes a viernes de 8:00am a 5:00pm y sábado de 8:00am a 1:00pm."
    ],
    "barinas": [
        "15. Av. Libertad: Av. Libertad entre Av. Br. Elias Cordero y calle Aranjuez, sector San Jose local 16-58. Horario de lunes a viernes 8:00am a 5:00pm y sábado 8:00am a 1:00pm.",
        "16. Alto Barinas: Av. Tachira, entre Av. Venezuela y calle Suiza, Edif. ADT, piso PB, local N° 1, Urb. Alto Barinas Sur, 5201. Horario de lunes a viernes 8:00am a 5:00pm y sábado 8:00am a 1:00pm."
    ],
    "falcon": [
        "17. Punto Fijo: Av. Ollarvides entre Av. Táchira y Girardot, sector Parcelamiento El Jardín, local Prosein. Horario de lunes a viernes de 8:00am a 5:00pm."
    ],
    "zulia": [
        "18. Maracaibo | Calle 70: Calle 70 con Av. 12, C.C. P&P, locales 1 y 2. Horario de lunes a viernes 8:00am a 5:00pm y sábado 8:00am a 12:30pm.",
        "19. Maracaibo | Milagro Norte: Av. 22, C.C. Prosein, sector Milagro Norte, vía la Barraca, al lado de la Res. Aguamarina. Horario de lunes a viernes 8:00am a 5:00pm y sábado 8:00am a 12:30pm."
    ],
    "trujillo": [
        "20. Valera: Av. Bolívar, entre calle 26 y 27, Qta Yraidis, sector Las Acacias. Punto de referencia diagonal a Farmatodo. Horario de lunes a viernes 8:30am a 5:00pm y sábado 8:30am a 1:00pm."
    ],
    "merida": [
        "21. Ejido: Av. Bolívar, local Nro 219, Sector Montalbán, Ejido Mérida. Horario de lunes a viernes 8:00am a 4:00pm y sábado 9:00am a 12:00 pm.",
        "22. Av. Las Américas: Av. Las Américas, CC Terracota nivel PB Local 11B. Horario de lunes a sábado 8:30am a 06:30pm."
    ],
    "anzoategui": [
        "23. Lechería: Av. Intercomunal Jorge Rodríguez, Sector Las Garzas, C.C. Las Garzas, Local D. Horario de lunes a viernes 8:00am a 5:00pm y sábado 8:00am a 1:00pm."
    ],
    "nuevaesp": [
        "24. Porlamar: Av. Circunvalación José Asunción Rodríguez, a 100 mts del mercado de Conejeros. Horario de lunes a viernes 8:30am a 5:00pm y sábado de 8:30am a 2:00pm."
    ],
    "bolivar": [
        "25. Puerto Ordaz: Av. Las Américas, edif. Otto, mezzanina #06. Horario de lunes a viernes de 8:00am a 4:00pm."
    ]
};

const flowTiendas = addKeyword(['tiendas', 'sucursales']).addAnswer(
    [
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
    ]
).addAnswer('Estas son las categorías disponibles:',{capture:true},(ctx,{fallBack,flowDynamic}) =>{
        if (ctx.body == '1') {
            flowDynamic(sucursalesPorCiudad.ccs.map((item) => item).join('\n\n'));
        } else if (ctx.body == '2') {
            flowDynamic(sucursalesPorCiudad.miranda.map((item) => item).join('\n\n'));
        } else if (ctx.body == '3') {
            flowDynamic(sucursalesPorCiudad.laguaira.map((item) => item).join('\n\n'));
        } else if (ctx.body == '4') {
            flowDynamic(sucursalesPorCiudad.aragua.map((item) => item).join('\n\n'));
        } else if (ctx.body == '5') {
            flowDynamic(sucursalesPorCiudad.carabobo.map((item) => item).join('\n\n'));
        } else if (ctx.body == '6') {
            flowDynamic(sucursalesPorCiudad.lara.map((item) => item).join('\n\n'));
        } else if (ctx.body == '7') {
            flowDynamic(sucursalesPorCiudad.portuguesa.map((item) => item).join('\n\n'));
        } else if (ctx.body == '8') {
            flowDynamic(sucursalesPorCiudad.barinas.map((item) => item).join('\n\n'));
        } else if (ctx.body == '9') {
            flowDynamic(sucursalesPorCiudad.falcon.map((item) => item).join('\n\n'));
        } else if (ctx.body == '10') {
            flowDynamic(sucursalesPorCiudad.zulia.map((item) => item).join('\n\n'));
        } else if (ctx.body == '11') {
            flowDynamic(sucursalesPorCiudad.trujillo.map((item) => item).join('\n\n'));
        } else if (ctx.body == '12') {
            flowDynamic(sucursalesPorCiudad.merida.map((item) => item).join('\n\n'));
        } else if (ctx.body == '13') {
            flowDynamic(sucursalesPorCiudad.anzoategui.map((item) => item).join('\n\n'));
        } else if (ctx.body == '14') {
            flowDynamic(sucursalesPorCiudad.nuevaesp.map((item) => item).join('\n\n'));
        } else if (ctx.body == '15') {
            flowDynamic(sucursalesPorCiudad.bolivar.map((item) => item).join('\n\n'));
        } else {
            return fallBack();
        }
});












const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        'Muchas gracias por ponerte en contacto con Prosein. No olvides seguirnos en nuestras redes sociales y página web.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowReclamosSugerencias = addKeyword(['6']).addAnswer(
    ['¿En qué podemos ayudarte?'],
    null,
    null,
    [flowSecundario]
)
.addAnswer(
    'Estimado cliente, lamentamos su experiencia. Entendemos su frustración y nos disculpamos por cualquier inconveniente que haya tenido. Nos comprometemos a atender su caso de manera personalizada. Gracias por su paciencia y comprensión.',{delay:1500}
)

let nombre = ''
const flowPrincipal = addKeyword(['hola', 'ola', 'alo'])
.addAnswer('¡Gracias por contactar a *Prosein*! 🙌🏼. Indíquenos,  por favor sus siguientes datos: Nombre, apellido y correo electrónico.',{delay:1500})
    .addAnswer('Nombre',{capture:true},(ctx) =>{
    nombre = ctx.body;
    console.log(nombre);
    })
    .addAnswer(`Gracias ${nombre} `)
    .addAnswer('Apellido',{capture:true},(ctx) =>{
        const apellido = ctx.body
        })
    .addAnswer('Correo electrónico',{capture:true},(ctx,{fallBack}) =>{
        if(!ctx.body.includes('@')) {
            return fallBack()
        }else{
            var correo = ctx.body
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
        ],
        null,
        null,
        [flowTiendas, flowGracias, flowReclamosSugerencias,flowSecundario,flowCatalogo]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal,flowGracias,flowTiendas,flowReclamosSugerencias,flowSecundario,flowCatalogo])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
