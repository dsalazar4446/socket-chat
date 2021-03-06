var socket = io();

var params = new URLSearchParams(window.location.search)

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html'
    throw new Error('El nombre es necesario')
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala'),
}

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios conectados', resp);
    })
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

socket.on('crearMensaje', function(mensaje) {
    console.log('crearMensaje:event', mensaje);
});

// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('enviarMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

// Escuchas cambios de usuarios
//  Cuando un udurio entra y sale del chas

socket.on('listaPersona', function(personas) {

    console.log('listaPersona:event:', personas);

});


// Mensajes privados

socket.on('mensajePrivado', function(mensaje) {



    console.log('mensaje privado', mensaje);
})