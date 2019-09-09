NWF$(document).ready(function () 
{
                  

            NWF$('.serial').on('keydown', function(e) {
                    if (e.which == 13) {              
                        e.preventDefault();
                       
                         NWF$('.rep_seriales').find('a').click(); 

                             NWF$('.rep_seriales .nf-repeater-row:last').each(function()
                                { /*get the row*/
                             var $row = NWF$(this); /*clear the field value*/
                             $row.find('.serial input').focus(); /*$row.find('.cPlan input').val(''); $row.find('.cPlandeDatos input').val('');*/       
                                })  
                    }
                });



});


function showDataBodegaSelected(data)
{
    // console.log(data);
       let datos=data[0];

             NWF$("#"+ estadoSerializacion).val("");
             NWF$("#"+ txtTipoBodega).val(datos.fkTipoBodega.Title);
             NWF$("#"+ txtSucursalFisica).val(datos.fkSucursalFisica.Title);
             NWF$("#"+ txtSucursalBCCS).val(datos.nSucursalBCCS);


            if(datos.eSerializacion =="Si")
            {                
                let estado=NWF$("#"+ estadoSerializacion).val(1);
                estado.blur();
            }
            else
            {
              let estado=NWF$("#"+ estadoSerializacion).val(0);
                estado.blur();
            }
}

function showItemSelected(data)
{
  // console.log(data);
    let datos= data[0];
    NWF$("#"+ txtCodigoEBS).val(datos.sCodigoEBS);
    NWF$("#"+ txtMarca).val(datos.sMarca);
    NWF$("#"+ txtModelo).val(datos.sModelo);
}


NWF$('#' + dropCodigoBodega).change(function()
    {
          
                 let SelectedId=NWF$("#"+dropCodigoBodega).val();     
                  SelectedId=SelectedId.split(";#")[0];
                  getParametrizacionBodega(SelectedId); 
    });


function limpiarSeccionsRepiters()
{ 
    /*get the repeating section*/
    var rsdata = NWF$('.rep_seriales'); /*count number of fields to give number of rows*/
    var labels = NWF$(rsdata).find('.serial'); /*iterate through rows*/
    NWF$.each(labels, function(index)
    { /*delete the last row*/
    NWF$('.rep_seriales .nf-repeater-row:last').find('.nf-repeater-deleterow-image').click();
    });
     /*for last row as index 0 row cannot be deleted*/
    NWF$('.rep_seriales .nf-repeater-row:last').each(function() { /*get the row*/
        var $row = NWF$(this); /*clear the field value*/
        $row.find('.serial input').val(''); /*$row.find('.cPlan input').val(''); $row.find('.cPlandeDatos input').val('');*/       
   })
  }