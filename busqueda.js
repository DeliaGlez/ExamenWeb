document.addEventListener('DOMContentLoaded', function () {
    // Obtener el nombre de usuario del Local Storage
    const nombreUsuario = localStorage.getItem('nombreUsuario');

    // Asignar el nombre de usuario al label
    const labelNombreUsuario = document.getElementById('nombreUsuario');
    labelNombreUsuario.textContent = nombreUsuario;

    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioActual =usuariosRegistrados.find(usuario => usuario.correo === localStorage.getItem('correo'));
    
    
    const producto = {

        crearProducto: function(urlImagen, nombre, precio) {
            return {
                urlImagen: urlImagen,
                nombre: nombre,
                precio: precio,
                cantidad: 1
            };
        },
    
        agregarAlCarrito: function(usuarioActual, nuevoProducto) {
            const productoEnCarrito = usuarioActual.carrito.find(producto => producto.nombre === nuevoProducto.nombre);
    
            if (productoEnCarrito) {
                productoEnCarrito.cantidad += 1;
            } else {
                usuarioActual.carrito.push(nuevoProducto);
            }
    
            // Obtener la lista de usuarios del localStorage
            const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
    
            // Encontrar y actualizar al usuario actual en la lista
            const index = usuariosRegistrados.findIndex(u => u.correo === usuarioActual.correo);
            if (index !== -1) {
                usuariosRegistrados[index] = usuarioActual;
            }

            // Guardar la lista actualizada en el localStorage
            localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));

            alert('Producto agregado al carrito');
        }
        
    };
    
    //FUNCIONALIDAD AGREGAR CARRITO
    const btnAgregarCarrito1 = document.getElementById('CASCOSNEGROS');
    btnAgregarCarrito1.addEventListener('click', function(){
        const urlImagen = "./img/audifonos/audSony.png";
        const nombreProducto = "Audífonos Inalámbricos Wh-ch720n Color Negro";
        const precio = 2293.00;
    
        //funcion crear producto
        const cascosNegros = producto.crearProducto(urlImagen,nombreProducto,precio);
        //funcion agregar al carrito
        
        producto.agregarAlCarrito(usuarioActual, cascosNegros);
    })

    const btnAgregarCarrito2 = document.getElementById('REDMI');
    btnAgregarCarrito2.addEventListener('click', function(){
        const urlImagen = "./img/audifonos/audXiaomi.png";
        const nombreProducto = "Xiaomi 36103 Audifonos Inalámbircos Redmi Buds 3 Lite";
        const precio = 260.00;
    
        //funcion crear producto
        const REDMI = producto.crearProducto(urlImagen,nombreProducto,precio);
        //funcion agregar al carrito
        
        
    
        producto.agregarAlCarrito(usuarioActual, REDMI);
    })

    const btnAgregarCarrito3 = document.getElementById('SKULLCANDY');
    btnAgregarCarrito3.addEventListener('click', function(){
        const urlImagen = "./img/audifonos/audSkull.png";
        const nombreProducto = "SKULLCANDY Audífonos Alámbricos Ink d+ Negro IN Ear";
        const precio = 249.50;
    
        //funcion crear producto
        const skullCandy = producto.crearProducto(urlImagen,nombreProducto,precio);
        //funcion agregar al carrito
       
      
    
        producto.agregarAlCarrito(usuarioActual, skullCandy);
    })
});