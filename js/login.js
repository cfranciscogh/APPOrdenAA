// JavaScript Document
// JavaScript Document
$(document).ready(function(e) {
    	$("#ingresar").click(function(e) {
            e.preventDefault();
			$.mobile.loading('show');
			setTimeout(loginValidar, 500);
        });
});

var loginValidar = function(){
	
	  if ( $("#usuario").val() == "" && $("#clave").val() == "" )
   	{
		 $.mobile.loading('hide');
		  if ( navigator.notification == null ){
			  alert('Complete los campos');
					return;
				}
	   navigator.notification.alert(
            'Complete los campos',  // message
            alertDismissed,         // callback
            'Informaci\u00f3n',            // title
            'Aceptar'                  // buttonName
        	);
	   return;
   	} 
	 
	$.ajax({
        url : "http://www.meridian.com.pe/ServiciosMovil/AntaresAduanas/Autenticacion/Login.asmx/Login",
        type: "POST",
		crossDomain: true,
        dataType : "json",
        data : '{"usuario" : "' + $("#usuario").val() + '", "clave" : "' + $("#clave").val() + '"}',
        contentType: "application/json; charset=utf-8",
        success : function(data, textStatus, jqXHR) {
          resultado = $.parseJSON(data.d);
		  //console.log(resultado);
		  if ( resultado.code == 1){
			  location.href = "consulta.html?ruc=" + resultado.datos[0].codigo;
		  }
		  else{
			   $.mobile.loading('hide');
			   
			   if ( navigator.notification == null ){
					alert('Usuario y/o clave son incorrectos!');
					return;
				}
				else
			   navigator.notification.alert(
					'Usuario y/o clave son incorrectos!',  // message
					alertDismissed,         // callback
					'Informaci\u00f3n',            // title
					'Aceptar'                  // buttonName
				);
			   $("#usuario").val("");
			   $("#clave").val("");
			   $("#usuario").focus();
			   $(".loadLogin").fadeOut("fast");
		  }
        },

        error : function(jqxhr) 
        {
			$.mobile.loading('hide');
           navigator.notification.alert(
            'Error de conexi\u00f3n, contactese con sistemas!',  // message
            alertDismissed,         // callback
            'Informaci\u00f3n',            // title
            'Aceptar'                  // buttonName
        	);
        }

    });	
	

};

function alertDismissed(){
}
