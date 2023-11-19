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
        carrito: []
        //AGREGAR ARRAY DE HISTORIAL historial: []
    };

    usuariosRegistrados.push(nuevoUsuario);

    // Guardar el nombre del usuario actual en el Local Storage
    localStorage.setItem('nombreUsuario', nombre);

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