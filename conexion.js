var lista= "bccs";
var listaParemetrizacionBodega= "Parametrizacion de Bodegas";
var listaTrasferencia= "Transferencia de Inventario";
var listaInventario="Ingreso de Inventario";
 var listaModelo="Modelos Control";
 var listaProducto="Productos";
 var listaSucursal="Sucursales Físicas";
 let listaKardex="kardex";
 let listaCanal="Canal";

 /**metodo para consultar listas fuera del proceso */
function getListSharePoint(param)
{
          var queryfields = "";
          for ( var i = 0; i < param.fieldQuery.length; i = i + 1 ) {
            queryfields = queryfields + param.fieldQuery[i];          
            if ( i < param.fieldQuery.length-1 ) queryfields = queryfields + ",";         
          }
            var requestHeaders = { "accept": "application/json;odata=verbose" };
           var URL=_spPageContextInfo.siteServerRelativeUrl+"/wpt0040";

             $.ajax({
            url: URL + "/_api/web/lists/GetByTitle('" + param.listName + "')/items?$select=" + queryfields +"&$top=" + param.limitResult + 
                    "&$expand=" + param.expand + "&$filter=" + param.filter+"&$orderby="+param.orderby,
            type: "GET",
            async:false,
            headers: requestHeaders,
            success: function(data){
              param.callback(data.d.results);                      
            },  
            error: function(error){
              alert("Error al realizar la búsqueda");
            }     
          });       
};
/**metodo para consultar listas dentro del proceso */
function getListSharePointWebSite(param)
{
          var queryfields = "";
          for ( var i = 0; i < param.fieldQuery.length; i = i + 1 ) {
            queryfields = queryfields + param.fieldQuery[i];          
            if ( i < param.fieldQuery.length-1 ) queryfields = queryfields + ",";         
          }
            var requestHeaders = { "accept": "application/json;odata=verbose" };
          URL=_spPageContextInfo.webServerRelativeUrl;
             $.ajax({
            url: URL + "/_api/web/lists/GetByTitle('" + param.listName + "')/items?$select=" + queryfields +"&$top=" + param.limitResult + 
                    "&$expand=" + param.expand + "&$filter=" + param.filter+"&$orderby="+param.orderby,
            type: "GET",
            async:false,
            headers: requestHeaders,
            success: function(data){
              param.callback(data.d.results);                      
            },  
            error: function(error){
              alert("Error al realizar la búsqueda");
            }     
          });       
};






function obtenerdescripcion(SelectedId)
{
    getListSharePointWebSite({
       listName: listaSucursal, 
       callback: showDescripcion, 
       fieldQuery: [
           "ID",
           "sDescripcion",
          ], 
       expand: "",
       orderby: "",
       filter: "ID eq " + SelectedId,
       limitResult:1
    });
}
 

 function obtenerCodigoBodega(SelectedId)
 {

    getListSharePointWebSite({
       listName: listaParemetrizacionBodega, 
       callback: showCodigoBodega, 
       fieldQuery: [
           "ID",
           "nCodigoBodega",
          ], 
       expand: "",
       orderby: "",
       filter: "Sucursal_x0020_Fisica_x003a_ID eq " + SelectedId,
       limitResult:1

    });

 }
/**CONSULTAR EN FORMULARIO TRANSFERENCIA DE INVENTARIO*/
function getLastItem() {

   getListSharePointWebSite({
      listName: listaTrasferencia,
      callback: recivedLastId,
      fieldQuery: [
         "ID",
         "Title"
      ],
      expand: "",
      orderby: "ID desc",
      top: "1",
      filter: "",
      limitResult: 1
   });
} 
function getGetCiudadBodegaOrigen(idBodega) {

   getListSharePointWebSite({
      listName: listaParemetrizacionBodega,
      callback: showCiudadOrigen,
      fieldQuery: [
         "ID",
         "fkCiudad/ID", "fkCiudad/Title",
         "sResponsable"
      ],
      expand: "fkCiudad",
      orderby: "",
      filter: "ID eq " + idBodega,
      limitResult: 10000
   });
} 
function getGetCiudadBodegaDestino(idBodega) {

   getListSharePointWebSite({
      listName: listaParemetrizacionBodega,
      callback: showCiudadDestino,
      fieldQuery: [
         "ID",
         "fkCiudad/ID", "fkCiudad/Title"
      ],
      expand: "fkCiudad",
      orderby: "",
      filter: "ID eq " + idBodega,
      limitResult: 10000
   });
} 
function getInventario(codigoBodega, codigoProducto) {
   let cantidad = 22;

   // URL=_spPageContextInfo.siteServerRelativeUrl+"/wpt0040";
   getListSharePointWebSite({
      listName: listaKardex,
      callback: showInventario,
      fieldQuery: [
         "ID",
         "Title",
         "sMarca",
         "sModelo",
         "sCodigoEBS",
         "sCodigoBCCS",
         "eEstado",
      ],
      expand: "",
      orderby: "",
      filter: "sCodigoBodega eq " + codigoBodega + "  and sCodigoBCCS eq " + codigoProducto + " and eEstado eq 'Disponible'",
      limitResult: 100000
   });
}


//fin de consultas*



/**CONSULTAR EN FORMULARIO INGRESO DE INVENTARIO*/

function gesListBCCSbyCodigo(txtIdSelec) {
   // URL=_spPageContextInfo.siteServerRelativeUrl+"/wpt0040";
  

   getListSharePoint({
      listName: lista,
      callback: showItemSelected,
      fieldQuery: [
         "ID",
         "sMarca",
         "sModelo",
         "sCodigoEBS",

      ],
      expand: "",
      orderby: "",
      filter: "ID eq " + txtIdSelec,
      limitResult: 1
   });
   
}
//fin de consultas*


/**CONSULTAR EN FORMULARIO SOLICITUD DE INVENTARIO*/

function getParametrizacionBodega(SelectedId) {

   getListSharePointWebSite({
      listName: listaParemetrizacionBodega,
      callback: showDataBodegaSelected,
      fieldQuery: [
         "ID",
         "Title",
         "eSerializacion",
         "fkTipoBodega/Title",
         "fkSucursalFisica/Title",
         "nSucursalBCCS",

      ],
      expand: "fkTipoBodega,fkSucursalFisica",
      orderby: "",
      filter: "ID eq " + SelectedId,
      limitResult: 10000
   });
} 
function recibirAdjuntos(id) {

   $.ajax({
      url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listaModelo + "')/items(" + id + ")/AttachmentFiles",
      type: 'GET',
      headers: {
         "Accept": "application/json;odata=verbose"
      },
      success: function (data) {
         // console.log(data.d.results);
         pintarAdjuntos(data);
      },
      error: function (error) {
         alert(JSON.stringify(error));
      }
   });

}
function consultarKardexPorModelo(idModelo) {

   getListSharePointWebSite({
      listName: listaKardex,
      callback: showDescripcionModelo,
      fieldQuery: [
         "ID",
         "Title",
         "sMarca",
         "sModelo",
         "sCodigoEBS",
         "sCodigoBCCS"
      ],
      expand: "",
      orderby: "",
      filter: "ID eq " + idModelo,
      limitResult: 1
   });
}
function obenterDiasDisponiblesPorCanal(SelectedId) {
   getListSharePointWebSite({
      listName: listaCanal,
      callback: showDiasCanal,
      fieldQuery: [
         "ID",
         "nDias",
      ],
      expand: "",
      orderby: "",
      filter: "ID eq " + SelectedId,
      limitResult: 1
   });
 }
// function consultarReservasKardex(cod_bodega, cod_bccs) {
//    // console.log(codigoBodega,codigoProducto);

//    getListSharePointWebSite({
//       listName: listaKardex,
//       callback: showReservados,
//       fieldQuery: [
//          "ID",
//          "Title",
//          "sCodigoBCCS",
//          "sCodigoEBS"
//       ],
//       expand: "",
//       orderby: "",
//       // filter: "fkCodigoProducto eq "+codigoProducto,
//       filter: "sCodigoBodega eq " + cod_bodega + "  and sCodigoBCCS eq " + cod_bccs + " and eReservado eq 'Si'",

//       // filter: "fkCodigoBodega eq " + codigoBodega+"  and fkCodigoProducto eq "+codigoProducto+ "and fkEstados/Title eq 'Disponible'",
//       // filter: "fkCodigoBodega/Title eq '"+codigoBodega+"' and sCodigoEBS eq '"+codigoEBS+"' and fkCodigoProducto ne '"+codigoProducto+"'",
//       // filter: "fkCodigoBodega eq  eq " + codigoBodega,
//       // filter: "fkCodigoBodega eq '"+ codigoBodega + "' and (eEstado eq 'En Desarrollo' or eEstado eq 'Activo') and bCambioEstado eq 'No' and bCambioPrioridad eq 'No'",
//       limitResult: 1000000000
//    });
// }

function consultarStockModeloEnKardex(cod_bccs, cod_bodega) {
   // console.log(codigoBodega,codigoProducto);
   
   //let model ="UNIVERSAL"; 
   getListSharePointWebSite({
      listName: listaKardex,
      callback: showStockDisponible,
      fieldQuery: [
         "ID",
         "Title",
         "sModelo",
         "sCodigoEBS",
         "sCodigoBCCS"
      ],
      expand: "",
      orderby: "",
      // filter: "fkCodigoProducto eq "+codigoProducto,
   //   filter: `sModelo eq ${mod}`,
      filter: "sCodigoBCCS eq " + cod_bccs + " and sCodigoBodega eq " + cod_bodega + " and eEstado eq 'Disponible'",
      // filter: "fkCodigoBodega eq " + codigoBodega+"  and fkCodigoProducto eq "+codigoProducto+ "and fkEstados/Title eq 'Disponible'",
      // filter: "fkCodigoBodega/Title eq '"+codigoBodega+"' and sCodigoEBS eq '"+codigoEBS+"' and fkCodigoProducto ne '"+codigoProducto+"'",
      // filter: "fkCodigoBodega eq  eq " + codigoBodega,
      // filter: "fkCodigoBodega eq '"+ codigoBodega + "' and (eEstado eq 'En Desarrollo' or eEstado eq 'Activo') and bCambioEstado eq 'No' and bCambioPrioridad eq 'No'",
      limitResult: 1000000000
   });
}
//fin de consultas*
