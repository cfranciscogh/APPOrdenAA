// JavaScript Document 20100030838
var ruc = "";
$(document).ready(function(e) {  
	//getProgramaciones();
	ruc = $.QueryString["ruc"];
	$("#actualizar").click(function(e) {
        getProgramaciones();
    });
	 $("form").keypress(function(e) {
        if (e.which == 13) {
            return false;
        }
    });
	
 	getProgramaciones();
	$("#irTracking").attr("href","index.html");
	 
	
});


function alertDismissed(){
}
//

function getProgramaciones(){
	
	$.mobile.loading('show');
 
	$("#listProgramacion").html("");  
	$("#listProgramacionDAD").html("");  
	$.ajax({
        url : "http://www.meridian.com.pe/ServiciosMovil/AntaresAduanas/Movil/WS_Movil.asmx/BuscarRUC",
        type: "POST",
		//crossDomain: true,
        dataType : "json",
        data : '{"nroRUC":"' + ruc + '"}',
        //contentType: "xml",
		contentType: "application/json; charset=utf-8",
        success : function(data, textStatus, jqXHR) {
		resultado = $.parseJSON(data.d);
		
			console.log(resultado);
			$.mobile.loading('hide');
			if ( resultado.length > 0 ){
				$("#contentProgramaciones").find("h3").remove();
				$("#contentProgramaciones #divTABS").fadeIn("fast");
				var count = 0;
				for (var i = 0; i<resultado.length;i++){
															 
					$("#listProgramacion").append('<li><a data-ajax="false" href="detalle.html?admin=0&orden='+ encodeURIComponent(resultado[i].orden) +'&cliente=' + encodeURIComponent(resultado[i].referencia_cliente) + '&ruc='+$.QueryString["ruc"]+'">'+ resultado[i].orden + '<br><span style=" font-weight:normal;">' + resultado[i].referencia_cliente +'</span></a></li> ');		
					 
				}
				
				$( "#listProgramacion" ).listview( "refresh" );
				//$( "#listProgramacionDAD" ).listview( "refresh" );
			 
			}
			else{
				$("#contentProgramaciones #divTABS").fadeOut("fast", function(){
					$("#contentProgramaciones").append("<h3>No se encontraron programaci&oacute;nes para el dia de hoy</h3>").hide().fadeIn("fast");
				});
				 
				
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
	if ( navigator.notification == null ){
		alert(mensaje);
		return;
	}
	 navigator.notification.alert(
            mensaje,  // message
            alertDismissed,         // callback
           'Informaci\u00f3n',            // title
            'Aceptar'                  // buttonName
        	);
	
}
