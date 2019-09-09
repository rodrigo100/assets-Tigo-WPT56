NWF$(document).ready(function () 
{
		
		NWF$('.nf-mayusculas').change(function()
		    {
		          
		          this.value = this.value.toUpperCase();
		       let cadenaComprobante=NWF$("#"+ txtTipoComprobante).val()+"-"+ NWF$("#"+ txtSerieComprobante).val()+"-"+NWF$("#"+ txtNumeroComprobante).val();   
		 			 NWF$("#"+ txtComprobante).val(cadenaComprobante);            
        });



  NWF.FormFiller.Events.RegisterAfterReady(function () {
    $('.duplicates').each(function () {
      let control = this.id;
      UpdateControl(control);
      control = "";
    });
  });
        
});

function UpdateControl(control) {
  var usednames = {};
  $("select[id=" + control + "]>option").each(function () {
    if (usednames[this.text]) {
      $(this).remove();
    }
    else {
      usednames[this.text] = this.value;
    }
  });
}






NWF$('#' + dropCodigoBodega).change(function()
    {     
                 let SelectedId=NWF$("#"+dropCodigoBodega).val();     
                  SelectedId=SelectedId.split(";#")[0];
                  getParametrizacionBodega(SelectedId); 
    });
NWF$('#' + dropMarca).change(function () {
 
  setTimeout(function () {

    $('.modelo').each(function () {
      let control = this.id;
      updateModelo(control);
      control = "";
     
    });
  }, 500);
  


});

NWF$('#' + dropdownModelo).change(function()
    {  
       
       let idModelo =NWF$("#"+dropdownModelo).val();  
            idModelo = idModelo.split(";#")[0];
       let textoModeloSelected =NWF$("#"+dropdownModelo).val();  
            textoModeloSelected = textoModeloSelected.split(";#")[1];
          NWF$("#" + textoModelo).val(textoModeloSelected);
         consultarKardexPorModelo(idModelo);

  
     });

NWF$('#' + dropdownModeloControl).change(function()
    {
        let SelectedId = NWF$("#" + dropdownModeloControl).val();
        SelectedId=SelectedId.split(";#")[0];
      recibirAdjuntos(SelectedId);
      
      });



NWF$('#' + dropCanal).change(function()
    {
            let SelectedId = NWF$("#" + dropCanal).val();
                  SelectedId=SelectedId.split(";#")[0];
                 obenterDiasDisponiblesPorCanal(SelectedId);    
     });

function pintarAdjuntos(data)
{
     let file= data.d.results[0];
    
       document.getElementById("imageid").src = file.ServerRelativeUrl; 
}

function showDescripcionModelo(results)
{
    let data= results[0];
     console.log(data);
  
    NWF$("#"+ txtCodigoProducto).val(data.sCodigoBCCS);
      NWF$("#"+ txtCodigoEBS).val(data.sCodigoEBS);
  
      let cod_bodega = NWF$("#" + dropCodigoBodega).val();
          cod_bodega = cod_bodega.split(";#")[1];           
       let modelo = NWF$("#" + dropdownModelo).val();
          modelo = modelo.split(";#")[1];           
  let cod_bccs = NWF$("#" + txtCodigoProducto).val();
  
 // consultarReservasKardex(cod_bodega,cod_bccs);
  consultarStockModeloEnKardex(cod_bccs, cod_bodega);
}

var cantidadReseva="";
function showReservados(results)
{
   cantidadReserva= results.length;
   console.log(cantidadReseva);
   
}

function showCodigoBodega(results)
{
  let data=results[0];
   if(results.length>0)
   {
      NWF$("#"+ txtCodigoBodega).val(data.nCodigoBodega);
   }
   else
   {  
       NWF$("#"+ txtCodigoBodega).val("");

   }
}

function showStockDisponible(results)
{   
    let cantidad = results.length;
    //let stockDisponible = parseInt(cantidad)-parseInt(cantidadReserva); 

   if(results.length>0)
   {
     //NWF$("#" + txtStockProducto).val(stockDisponible);
    NWF$("#" + txtStockProducto).val(cantidad);
   }
   else
   {  
       NWF$("#"+ txtStockProducto).val("");
       alert("El modelo no se encuentra disponible en la  bodega");
   }
}

function showDataBodegaSelected(results)
{
        // console.log(results);
            let datos=results[0];
             NWF$("#"+ txtTipoBodega).val(datos.fkTipoBodega.Title);
             NWF$("#"+ txtDescripcionSucursalFisica).val(datos.Title);
             NWF$("#"+ txtSucursalFisica).val(datos.fkSucursalFisica.Title);
          NWF$("#" + txtSucursalBccs).val(datos.nSucursalBCCS);
             
}   

function showDiasCanal(results)
{
  let data=results[0];
  NWF$("#" + txtDiasCanal).val(data.nDias);

}
function updateModelo(control) {
  var usednames = {};
  $("select[id=" + control + "]>option").each(function () {
    if (usednames[this.text]) {
      $(this).remove();
    }
    else {
      usednames[this.text] = this.value;
    }
  });
}