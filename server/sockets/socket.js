const { io } = require('../server');

const { Usuarios } = require('../classes/usuarios')
const { crearMensaje } = require('../utils/utils')

const usuario = new Usuarios()

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre es necesario'
            })
        }

        client.join(data.sala)

        usuario.agregarPersona(client.id, data.nombre, data.sala)

        client.broadcast.to(data.sala).emit('listaPersona', usuario.getPersonasPorSala(data.sala))

        callback(usuario.getPersonasPorSala(data.sala))
    });

    client.on('crearMensaje', data => {
        // let persona = usuario.getPersona(client.id)
        let mensaje = crearMensaje(data.nombre, data.mensaje);
        client.broadcast.emit('crearMensaje', mensaje)
    })

    client.on('disconnect', () => {
        const personaBorrada = usuario.eliminarPersona(client.id)

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Adminictrador', `${personaBorrada.nombre} salio`))

        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuario.getPersonasPorSala(personaBorrada.sala))
    })

    //mensajes privados 
    client.on('mensajePrivado', data => {
        let persona = usuario.getPersona();
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombrem, data.mensaje));
    })

});