$(document).ready(function(e) {
    
	$(".orden").html($.QueryString["orden"]);
	$(".referencia").html($.QueryString["cliente"]);
	 
 	//setPedido($.QueryString["orden"]); id="regresarPanel" data-ajax="false" href="consulta.html?ruc="
	 if ( $.QueryString["admin"] == 1 )
	 	$("#regresarPanel").attr("href","admin.html?ruc=" + $.QueryString["ruc"]);
	 else
	 	$("#regresarPanel").attr("href","consulta.html?ruc=" + $.QueryString["ruc"]);
		
	setIncidencia(decodeURIComponent($.QueryString["orden"]));
	 

});

  
function alertDismissed(){
}
//

function setIncidencia(orden){
	
	$.mobile.loading('show'); 
	$.ajax({
        url : "http://www.meridian.com.pe/ServiciosMovil/AntaresAduanas/Movil/WS_Movil.asmx/BuscarNRORDEN",
        type: "POST",
		//crossDomain: true,
        dataType : "json",
        data : '{"nroORDEN":"'+orden+'"}',
		contentType: "application/json; charset=utf-8",
        success : function(data, textStatus, jqXHR) {
		resultado = $.parseJSON(data.d);
		//console.log(resultado);
			$.mobile.loading('hide');
			if ( resultado.length > 0 ){
				
				for (var i = 0; i<resultado.length;i++){
					$("#listProgramacion").append('<li><a data-ajax="false">'+ resultado[i].incidenci + '<br><span style=" font-weight:normal;">Fecha: ' + resultado[i].fch_incid +' - Hora: ' + resultado[i].hra_incid +'</span>	</a></li> ');		
					 
				}
				
				$( "#listProgramacion" ).listview( "refresh" );
			}
			else{
				//$("#contentProgramaciones").html("");
//				$("#contentProgramaciones").html("<h3>No se encontraron programaci&oacute;nes para el dia de hoy</h3>");
//				//Mensaje
			}
        },

        error : function(jqxhr) 
        {
		   //console.log(jqxhr);	
          alerta('Error de conexi\u00f3n, contactese con sistemas!');
        }

    });		 
	
}



 

function alerta(mensaje){
	alert(mensaje);
	return;
	 navigator.notification.alert(
            mensaje,  // message
            alertDismissed,         // callback
           'Informaci\u00f3n',            // title
            'Aceptar'                  // buttonName
        	);
	
}


function alertDismissed(){
}
