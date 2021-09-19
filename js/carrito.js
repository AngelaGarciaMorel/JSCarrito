//abrir sidebar Carrito
$('.carrito-bar').on('click', function(){
  $('.contenido').toggleClass('abrir');
})
function mostrarProdEnCarrito() {

    $("#tablaCarrito").html("");
    let total = 0;
    $("#total").html(total);
    //recorre localstorage en busca de productos agregados
    for(var i = 0; i < localStorage.length; i++){
      let clave = localStorage.key(i);
      //declara el total
      
      let subtotal = 0;  
      //recorrer el json y cargar tabla de carrito
      const URLJSON = "../data/productos.json"
        $.getJSON(URLJSON, function (respuesta, estado) {
            if(estado === "success"){
                let productosEnStock = respuesta;
                for(const producto of productosEnStock){                
                    if(producto.id == clave){                            
                        let cantPedido = localStorage.getItem(clave);
                        //Calcula subtotal
                        subtotal = cantPedido * producto.precio;
                        $("#tablaCarrito").append(`
                                                <tr id="tabCar">
                                                    <td><img class="card-img-top img-Prods" src="${producto.imagen}" alt="Card image cap"></img></td>
                                                    <td>${producto.nombre}</td>
                                                    <td>${cantPedido}</td>
                                                    <td>$${producto.precio}</td>
                                                    <td>$${subtotal}</td>
                                                </tr>
                                                `);  

                            
                    }
                }
                total += subtotal;
                subtotal = 0;
                }
                $("#total").fadeOut("slow", function(){
                    //Cuando termina de ocultarse el elemento lo mostramos nuevamente
                    $("#total").fadeIn(1000);
                });
                $("#total").html(total);
        });
  }
}

  //vacia carrito
  $("#btnVaciar").on('click', function () {
    if (parseInt($("#total").text()) ==0){
        $("#result-compra").html("No hay productos en el carrito");
        $("#result-compra").css({"color": "red"});
        $("#result-compra").fadeIn("slow", function(){
          $("#result-compra").fadeOut(1000);
      });
    }
    else{
          localStorage.clear();   
          $("#tablaCarrito").html(""); 
          $("#total").html("0");
          $("#result-compra").html("Se carrito ha sido vaciado");
          $("#result-compra").css({"color": "green"});
          $("#result-compra").fadeIn("slow", function(){
            
            $("#result-compra").fadeOut(1000);
        });
      }   
  });

function recorreProdCarrito(){
  let infoCarrito = [];
  for(var i = 0; i < localStorage.length; i++){
    let clave = localStorage.key(i);
    //declara el total
    
    let subtotal = 0;  
    //recorrer el json y cargar tabla de carrito
    const URLJSON = "../data/productos.json"
    
    $.getJSON(URLJSON, function (respuesta, estado) {
        if(estado === "success"){
            let productosEnStock = respuesta;
            for(const producto of productosEnStock){                
                if(producto.id == clave){                            
                    let cantPedido = localStorage.getItem(clave);      
                    infoCarrito.push(producto);         
                }
            }

          }
    });
  }
  
  return infoCarrito;
}

  //finaliza compra
  $("#btnComprar").on('click', function () {
    if (parseInt($("#total").text()) ==0){
        $("#result-compra").html("No hay productos en el carrito");
        $("#result-compra").css({"color": "red"});
        $("#result-compra").fadeIn("slow", function(){
          $("#result-compra").fadeOut(1000);
        });
    }
    else{
      const URLGET   = "https://jsonplaceholder.typicode.com/posts";
      const infoPost = recorreProdCarrito();
      console.log(infoPost);
      $.post(URLGET, infoPost ,(respuesta, estado) => {
        if(estado === "success"){
            localStorage.clear(); 
            $("#tablaCarrito").html(""); 
            $("#total").html("0");
            $("#result-compra").html("Compra realizada con Éxito");
            $("#result-compra").css({"color": "green"});
            $("#result-compra").fadeIn("slow", function(){
              $("#result-compra").fadeOut(2000);
            });
        }  
      });


    }
  });
  
  //Carga los productos
  cargarProductos();
  // Muestra los productos del carrito
  mostrarProdEnCarrito();