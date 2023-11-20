function registrarUsuario() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const direccion = document.getElementById('direccion').value;
    const contra = document.getElementById('contra').value;
    const confirmar = document.getElementById('confirmar').value;

    if (contra !== confirmar) {
        alert('Las contraseñas no coinciden');
        return;
    }

    if (!nombre || !apellido || !correo || !telefono || !direccion || !contra || !confirmar) {
        alert('Por favor, complete todos los campos.');
        return;
    }
    
    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];

    const correoExistente = usuariosRegistrados.some(usuario => usuario.correo === correo);

    if (correoExistente) {
        alert('Ya existe un usuario con este correo electrónico. Por favor, utiliza otro.');
        return;
    }

    const nuevoUsuario = {
        nombre,
        apellido,
        correo,
        telefono,
        direccion,
        contra,
        carrito: [],
        historial: []
    };

    usuariosRegistrados.push(nuevoUsuario);

    localStorage.setItem('nombreUsuario', nombre);
    localStorage.setItem('correo',correo);
    localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));

    window.location.href = './InicioSesion.html';
}

function iniciarSesion() {
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;

    if (!usuario || !contrasena) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioValido = usuariosRegistrados.find(
        (usuarioRegistrado) =>
            usuarioRegistrado.correo === usuario && usuarioRegistrado.contra === contrasena
    );

    if (usuarioValido) {
        localStorage.setItem('nombreUsuario', usuarioValido.nombre);
        localStorage.setItem('correo',usuarioValido.correo);
        window.location.href = './InicioSesionIniciada.html';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

document.addEventListener('DOMContentLoaded', function () {

    const paginaActual = window.location.pathname;

    if (paginaActual.includes('configU.html')) {
        const nombreUsuario = localStorage.getItem('nombreUsuario');
        const usuario = obtenerUsuarioPorNombre(nombreUsuario);

        const labelNombreUsuario = document.getElementById('nombreUsuario');
        labelNombreUsuario.textContent = usuario.nombre;

        asignarValor('nombre', usuario.nombre);
        asignarValor('apellido', usuario.apellido);
        asignarValor('correo', usuario.correo);
        asignarValor('telefono', usuario.telefono);
        asignarValor('direccion', usuario.direccion);
        asignarValor('contraseña', usuario.contra); 
        asignarValor('NuevaContra', ''); 

        const botonActualizar = document.getElementById('botonActualizar');
        botonActualizar.addEventListener('click', actualizarInformacion);

        function obtenerUsuarioPorNombre(nombreUsuario) {
            const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
            return usuariosRegistrados.find(usuario => usuario && usuario.nombre === nombreUsuario);
       }

        function asignarValor(id, valor) {
            const elemento = document.getElementById(id);
            if (elemento) {
                elemento.value = valor;
            } else {
                console.error(`Elemento con ID '${id}' no encontrado.`);
            }
        }

        function actualizarInformacion() {
            const correoNuevo = document.getElementById('correo').value;
            const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
        
            const usuarioExistente = usuariosRegistrados.find(usuario => usuario.correo === correoNuevo);
            if (usuarioExistente && usuarioExistente.nombre !== nombreUsuario) {
            alert('Ya hay un usuario registrado con este correo electrónico.');
            return;
        }

        const indexUsuario = usuariosRegistrados.findIndex(usuario => usuario.nombre === nombreUsuario);

        if (indexUsuario !== -1) {
            usuariosRegistrados[indexUsuario].nombre = document.getElementById('nombre').value;
            usuariosRegistrados[indexUsuario].apellido = document.getElementById('apellido').value;
            usuariosRegistrados[indexUsuario].correo = correoNuevo;
            usuariosRegistrados[indexUsuario].telefono = document.getElementById('telefono').value;
            usuariosRegistrados[indexUsuario].direccion = document.getElementById('direccion').value;
            usuariosRegistrados[indexUsuario].contra = document.getElementById('NuevaContra').value;

            localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));

            localStorage.setItem('nombreUsuario', usuariosRegistrados[indexUsuario].nombre);
            
            window.location.href = './InicioSesionIniciada.html';
        } else {
            console.error('Usuario no encontrado');
        }
        }
    }    
});