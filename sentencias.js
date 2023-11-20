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

    // Guardar el nombre del usuario actual en el Local Storage
    localStorage.setItem('nombreUsuario', nombre);
    localStorage.setItem('correo',correo);
    localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));

    window.location.href = './InicioSesion.html';
}

function iniciarSesion() {
    // Obtener el valor del campo de usuario (correo) y contraseña
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;

    // Validar campos vacíos
    if (!usuario || !contrasena) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Obtener usuarios registrados del localStorage
    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verificar si el usuario y la contraseña coinciden
    const usuarioValido = usuariosRegistrados.find(
        (usuarioRegistrado) =>
            usuarioRegistrado.correo === usuario && usuarioRegistrado.contra === contrasena
    );

    if (usuarioValido) {
        // El usuario y la contraseña son correctos, guarda el nombre del usuario en el localStorage
        localStorage.setItem('nombreUsuario', usuarioValido.nombre);

        // Redirige a la página de inicio de sesión iniciada
        window.location.href = './InicioSesionIniciada.html';
    } else {
        // El usuario o la contraseña son incorrectos, puedes mostrar un mensaje de error
        alert('Usuario o contraseña incorrectos');
    }
}

document.addEventListener('DOMContentLoaded', function () {

    // Obtener el nombre de la página actual
    const paginaActual = window.location.pathname;

    // Verificar si estamos en la página configU.html
    if (paginaActual.includes('configU.html')) {
        // Obtener el nombre de usuario del Local Storage
        const nombreUsuario = localStorage.getItem('nombreUsuario');
        const usuario = obtenerUsuarioPorNombre(nombreUsuario);

        // Asignar el nombre de usuario al label
        const labelNombreUsuario = document.getElementById('nombreUsuario');
        labelNombreUsuario.textContent = usuario.nombre;

        // Llenar los campos con la información del usuario
        asignarValor('nombre', usuario.nombre);
        asignarValor('apellido', usuario.apellido);
        asignarValor('correo', usuario.correo);
        asignarValor('telefono', usuario.telefono);
        asignarValor('direccion', usuario.direccion);
        asignarValor('contraseña', usuario.contra); // Mostrar contraseña actual es opcional
        asignarValor('NuevaContra', ''); // Mostrar nueva contraseña es opcional

        // Agregar evento al botón de "Actualizar"
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
            // Obtener el índice del usuario en el array del Local Storage
            const correoNuevo = document.getElementById('correo').value;
            const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
        
            // Verificar si hay otro usuario con el mismo correo
            const usuarioExistente = usuariosRegistrados.find(usuario => usuario.correo === correoNuevo);
            if (usuarioExistente && usuarioExistente.nombre !== nombreUsuario) {
            alert('Ya hay un usuario registrado con este correo electrónico.');
            return;
        }

        const indexUsuario = usuariosRegistrados.findIndex(usuario => usuario.nombre === nombreUsuario);

        // Verificar si se encontró el usuario
        if (indexUsuario !== -1) {
            // Actualizar la información del usuario con los nuevos valores de los campos
            usuariosRegistrados[indexUsuario].nombre = document.getElementById('nombre').value;
            usuariosRegistrados[indexUsuario].apellido = document.getElementById('apellido').value;
            usuariosRegistrados[indexUsuario].correo = correoNuevo;
            usuariosRegistrados[indexUsuario].telefono = document.getElementById('telefono').value;
            usuariosRegistrados[indexUsuario].direccion = document.getElementById('direccion').value;
            usuariosRegistrados[indexUsuario].contra = document.getElementById('NuevaContra').value;
            // Puedes manejar las contraseñas según tus necesidades

            // Actualizar la información en el localStorage
            localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));

            // Actualizar el nombre de usuario en el Local Storage
            localStorage.setItem('nombreUsuario', usuariosRegistrados[indexUsuario].nombre);

            // Redirigir a la página de inicio de sesión iniciada o hacer otras acciones necesarias
            window.location.href = './InicioSesionIniciada.html';
        } else {
            console.error('Usuario no encontrado');
        }
        }
    }

    
});