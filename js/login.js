// JavaScript Document
// JavaScript Document
$(document).ready(function(e) {
	
		 
	
    	$("#ingresar").click(function(e) {
            e.preventDefault();
			$.mobile.loading('show');
			setTimeout(loginValidar, 100);
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
			  
			  var recordar = ( $('input#recordar').is(':checked') ? 1 : 0);
			    window.localStorage.setItem("user", $("#usuario").val());
				window.localStorage.setItem("pass",$("#clave").val());
				window.localStorage.setItem("recordar", recordar);
				window.localStorage.setItem("ruc", resultado.datos[0].ruc);
			  
			  if ( resultado.datos[0].tipo_acceso == 2 || resultado.datos[0].empresa == "ADUANA"){
				window.localStorage.setItem("page","admin.html");
			  	location.href = "admin.html";
			  }
			  else {
				window.localStorage.setItem("page","consulta.html");
			  	location.href = "consulta.html?ruc=" + resultado.datos[0].ruc;
			  }
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
