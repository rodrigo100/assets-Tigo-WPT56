var idInventario="";
var cantidadUpdate="";

NWF$(document).ready(function () 
{ 

          getLastItem();

           NWF$('.serial_input').on('keydown', function(e) {

                    if (e.which == 13) {              
                        e.preventDefault();
                       
                         NWF$('.rep_seriales_bodega_comercial').find('a').click(); 

                             NWF$('.rep_seriales_bodega_comercial .nf-repeater-row:last').each(function()
                                { /*get the row*/
                             var $row = NWF$(this); /*clear the field value*/
                             $row.find('.serial_input input').focus(); /*$row.find('.cPlan input').val(''); $row.find('.cPlandeDatos input').val('');*/       
                                })        
                    }
                });


            NWF.FormFiller.Events.RegisterAfterReady(function()
            {
                 $('.duplicates').each(function(){
                  let control=this.id;
                  UpdateControl(control);
                  control="";
            });
            });



          let newAdd ="";
          NWF$('.nf-serial').on('keydown', function (e) 
          {

            if (e.which == 13) 
            {
                  e.preventDefault();
                  let serialValue = this.value;
    
    
                    const resultado = dataKardex.find(serial => 
                    {
                      // comparar si el serial es la misma de la que se encuentra en Kardex
                    if (serial.Title === serialValue)
                      {
                          //almacenamos el valor en la variable
                      //  let newAdd=serialValue;
                        if(newAdd!=serialValue)
                        {
                          NWF$('.rep_seriales_transferir .nf-repeater-row:last').each(function () {
                            var $row = NWF$(this); //set the field value
                            $row.find('.serial_disponible input').val(serial.Title);

                            newAdd = serial.Title;
                            NWF$("#" + txtLeerSerial).val("");
                          });
                          NWF$('.rep_seriales_transferir').find('a').click(); 
                        }
                        else{
                          newAdd = serial.Title;
                          console.log(newAdd);
                          
                        }  
                      }  
                    });
      

            }
          });
          

});
//fin del ready

var codigoBodega="";
NWF$('#' + dropCodigodeBodegaOrigen).change(function()
    {

                 var SelectedId=NWF$("#"+dropCodigodeBodegaOrigen).val();     
                 
                 codigoBodega=SelectedId.split(";#")[1];
                 
                 let  idCodigoBodega=SelectedId.split(";#")[0];
                     console.log(idCodigoBodega);
                 
                  if(idCodigoBodega!=0)
                  {
                     getGetCiudadBodegaOrigen(idCodigoBodega); 
                    getParametrizacionBodega(idCodigoBodega);                 
                  }

                  setTimeout(function(){ 

                    $('.codigoProducto').each(function(){
                            let control=this.id;
                            UpdateidCodigoProducto(control);
                            control="";
                         });
                   }, 1000);                                       
  });

NWF$('#' + dropCodigodeBodegaDestino).change(function()
    {

                 var SelectedId=NWF$("#"+dropCodigodeBodegaDestino).val(); 
                   NWF$("#"+ txtCiudadBodegaDestino).val("");    
               let  idBodega=SelectedId.split(";#")[0];
                // getInventario(codigoProducto);
                if(idBodega!=0)
                {
                     getGetCiudadBodegaDestino(idBodega);
                }                                   
    });

var codigoProducto=""
NWF$('#' + CodigoProducto).change(function()
    {

                var SelectedId=NWF$("#"+CodigoProducto).val();     
                 codigoProducto=SelectedId.split(";#")[1];
               if(codigoProducto!=0)
               {
                // consultarReservasKardex(codigoBodega, codigoProducto);
                  getInventario(codigoBodega,codigoProducto);

               }
               else
               {
                // limpiarSeccionsRepiters();
               }
                                         
    });

NWF$('#' + dropCodBCCS).change(function()
    {

                var SelectedId=NWF$("#"+dropCodBCCS).val();     
               let  codBCCS=SelectedId.split(";#")[1];
               
               if(codBCCS!=0)
               {
                    gesListBCCSbyCodigo(codBCCS);
                             NWF$('.rep_seriales_bodega_comercial .nf-repeater-row:last').each(function()
                                { /*get the row*/
                             var $row = NWF$(this); /*clear the field value*/
                             $row.find('.serial_input input').focus(); /*$row.find('.cPlan input').val(''); $row.find('.cPlandeDatos input').val('');*/       
                                })
               }                                      
    });

function recivedLastId(results)
{
   let data= results[0];  
		   var increment = parseInt(data.Id)+1;
		   NWF$("#"+ ticketId).val("Nº."+increment);
		   NWF$("#"+ txtTitulo).val("Solicitud - "+increment); 
}
var cantidadReserva = "";
// function showReservados(results) {
//   // console.log(results);
//   cantidadReserva = results.length;
// }

var dataKardex=[];
function showInventario(data)
{  
     let datos= data[0];
     dataKardex = data;
     console.log(data);
     // let stockDisponible = parseInt(cantidad) - parseInt(cantidadReserva);  
  
       if(data.length>0){
           let cantidad = data.length;
           NWF$("#"+ txtCodigoEBS).val(datos.sCodigoEBS);
           NWF$("#"+ txtMarca).val(datos.sMarca);
           NWF$("#"+ txtModelo).val(datos.sModelo);
           NWF$("#" + txtCantidad).val(cantidad);
       }else{
         alert("Stock Insuficiente para la transaccion");
         NWF$("#" + txtCantidad).val("");
       }
}



function showCiudadOrigen(data)
{
	 let datos= data[0];
     NWF$("#"+ txtCiudadBodegaOrigen).val(datos.fkCiudad.Title);
     NWF$("#"+ txtResponsable).val(datos.sResponsable);
     
}
function showCiudadDestino(data)
{
	 let datos= data[0];
	   NWF$("#"+ txtCiudadBodegaDestino).val(datos.fkCiudad.Title);
	   NWF$("#"+ txtIdCiudadDestino).val(datos.fkCiudad.ID);

}

function showItemSelected(results)
{
  console.log(results);
  let datos=results[0];
     NWF$("#"+ txtCodigoEBSBodegaComercial).val(datos.sCodigoEBS);
     let marca= datos.sMarca;
     let modelo= datos.sModelo;
     let descripcion=marca+","+modelo;
     NWF$("#"+ txtDecripcion).val(descripcion);
}



function UpdateControl(control)
{
     var usednames={};
      $("select[id="+control+"]>option").each(function()
    {
        if(usednames[this.text])
          {
              $(this).remove();
          }
          else
          { 
              usednames[this.text]=this.value;
          }
    });
}

function UpdateidCodigoProducto(control)
{
    var usednames={};
      $("select[id="+control+"]>option").each(function()
    {
        if(usednames[this.text])
          {
              $(this).remove();
          }
          else
          { 
              usednames[this.text]=this.value;
          }
    });
}


function showDataBodegaSelected(data) {
  // console.log(data);
  let datos = data[0];

  // NWF$("#" + estadoSerializacion).val("");
  // NWF$("#" + txtTipoBodega).val(datos.fkTipoBodega.Title);
  // NWF$("#" + txtSucursalFisica).val(datos.fkSucursalFisica.Title);
  // NWF$("#" + txtSucursalBCCS).val(datos.nSucursalBCCS);


  if (datos.eSerializacion == "Si") {
    let estado = NWF$("#" + estadoSerializacion).val(1);
    estado.blur();
  }
  else {
    let estado = NWF$("#" + estadoSerializacion).val(0);
    estado.blur();
  }
}

// function cargarSerialesDisponibles(data)
// {
       
    
//       // let datos = data[0];
//       // NWF$("#"+ txtCantidad).val(data.length);
//      console.log(data.length);
    
// if (data.length > 0)
//      {
//       for (var i = 0; i <data.length; i++)
//         { 

//           NWF$('.rep_seriales_disponibles .nf-repeater-row:last').each(function()
//                 {
//                     var $row = NWF$(this); //set the field value
//                      $row.find('.serial_disponible input').val(data[i].Title);
//                 }); 

//            NWF$('.rep_seriales_disponibles').find('a').click();
//               // console.log(i+">"+data[i].Title);

//         }

//         NWF$('.rep_seriales_disponibles .nf-repeater-row:last').find('.nf-repeater-deleterow-image').click();
      


//     }

//    else
//    {
//      alert("Stock no disponible, del codigo de producto seleccionado ");
//    }
                  

// }

//  function showPorCantidad(data)
//  {
//     //  console.log(data);
//      for(let i=0; i<data.length;i++)
//      {
//        console.log("Serial:"+i+">"+data[i].Title);
       
//      }
//       // cargarSerialesDisponibles(data);

//  }

 function limpiarSeccionsRepiters()
{ 
    /*get the repeating section*/
    var rsdata = NWF$('.rep_seriales_disponibles'); /*count number of fields to give number of rows*/
    var labels = NWF$(rsdata).find('.serial_disponible'); /*iterate through rows*/
    NWF$.each(labels, function(index)
    { /*delete the last row*/
    NWF$('.rep_seriales_disponibles .nf-repeater-row:last').find('.nf-repeater-deleterow-image').click();
    });
     /*for last row as index 0 row cannot be deleted*/
    NWF$('.rep_seriales_disponibles .nf-repeater-row:last').each(function() { /*get the row*/
        var $row = NWF$(this); /*clear the field value*/
        $row.find('.serial_disponible input').val(''); /*$row.find('.cPlan input').val(''); $row.find('.cPlandeDatos input').val('');*/       
   })
  }

