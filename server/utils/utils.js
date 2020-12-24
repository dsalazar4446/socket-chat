const crearMensaje = (nombre, mensaje) => ({ nombre, mensaje, fecha: new Date().getDate() })

module.exports = {
    crearMensaje
}