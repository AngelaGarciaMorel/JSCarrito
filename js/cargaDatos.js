//Carga los productos en las cards
function cargarProductos(){
    //obtiene la seccion de productos
    const URLJSON = "../data/productos.json"
      $.getJSON(URLJSON, function (respuesta, estado) {
          $("#dtitle").html(""); 
          $("#secProducts").html(""); 
          $("#dtitle").append('<h4>Productos disponibles</h4>')
          if(estado === "success"){
            let productosEnStock = respuesta;
            //recorre el json
            for (prod of productosEnStock) {
              //obtiene la seccion de productos y agrega las cards
              $("#secProducts").append(`
                                        <div class="card text-white bg-secondary mb-3">
                                          <img src="${prod.imagen}" class= "card-img-top" alt="">
                                          <div class="card-body">
                                            <h5 class="card-title">${prod.nombre}</h5>
                                            <p class="card-text">$ ${prod.precio}</p>
                                            <button class="btn btn-warning" id="btn${prod.id}" marcador="${prod.id}">Agregar al Carrito</button>
                                          </div>
                                        </div>
                                      `);              
                    //Asociamos el evento a botón creado.
                    $(`#btn${prod.id}`).on('click', function (e) {
                      let idProd = e.target.getAttribute('marcador');
                      if(localStorage.getItem(idProd) != undefined && localStorage.getItem(idProd) != null){
                        localStorage.setItem(idProd, parseInt(localStorage.getItem(idProd)) +1);
                      }
                      else{
                        localStorage.setItem(idProd, 1);
                    
                      }
                      
                      mostrarProdEnCarrito();
                    });

            } //fin recorre el json
          }
          });
}
cargarProductos();

