const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2']).addAnswer('Este mensaje envia tres botones', {
    buttons: [{ body: 'Boton 1' }, { body: 'Boton 2' }, { body: 'Boton 3' }],
})

const flowListaCiudades = addKeyword(['1','3','4','5']).addAnswer(
    [
        '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
        'https://bot-whatsapp.netlify.app/',
    ],
    null,
    null,
    [flowSecundario]
)

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

let nombre = ''
const flowPrincipal = addKeyword(['hola', 'ola', 'alo'])
.addAnswer('🙌 Gracias por contactar a *Prosein*. Indicanos nombre, apellido y correo electrónico. ¿Cómo podemos ayudarte?',{delay:1500})
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
        [
            '👉 *1* Información: Horarios y Ubicaciones',
            '👉 *2* Catálogo',
            '👉 *3* Cotizar productos',
            '👉 *4* Promociones',
            '👉 *5* Disponibilidad de un Producto',
            '👉 *6* Reclamos y Sugerencias',
        ],
        null,
        null,
        [flowListaCiudades, flowGracias, flowReclamosSugerencias,flowSecundario]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal,flowGracias,flowListaCiudades,flowReclamosSugerencias,flowSecundario])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
