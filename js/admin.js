// JavaScript Document
 
$(document).ready(function(e) {  

	if ($.QueryString["ruc"] != null){
		$("#ruc").val($.QueryString["ruc"])
		getProgramaciones($.QueryString["ruc"]);
	}
	
	
	
	$( ".autocomplete" ).on( "listviewbeforefilter", function ( e, data ) {        
		var $ul = $(this);                        // $ul refers to the shell unordered list under the input box
        var value = $( data.input ).val();        // this is value of what user entered in input box
		var dropdownContent = "" ;                // we use this value to collect the content of the dropdown
        $ul.html("") ;                            // clears value of set the html content of unordered list
        
        // on third character, trigger the drop-down
        if ( value && value.length > 3 ) {
			  $('.autocomplete').show();           
			  $ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading' ></span></div></li>" );
			  $ul.listview( "refresh" );
			 
			 $.ajax({
				url : "http://www.meridian.com.pe/ServiciosMovil/AntaresAduanas/Movil/WS_Movil.asmx/BuscarCLIENTE",
				type: "POST",
				//crossDomain: true,
				dataType : "json",
				data : '{"nroRUC":"' + value + '"}',
				//contentType: "xml",
				contentType: "application/json; charset=utf-8",
				success : function(data, textStatus, jqXHR) {
				resultado = $.parseJSON(data.d);
					 
					if ( resultado.length > 0 ){
						var count = 0;
						for (var i = 0; i<resultado.length;i++){
							dropdownContent += "<li id='" + resultado[i].cliente + "'>" + resultado[i].nombre + "</li>";
							$ul.html( dropdownContent );
							$ul.listview( "refresh" );
							$ul.trigger( "updatelayout"); 							 
						}
					} 
				},
		
				error : function(jqxhr) 
				{
				   //console.log(jqxhr);	
				   alerta('Error de conexi\u00f3n, contactese con sistemas!');
				}
		
			});		
			 /* $.each(response, function( index, val ) {
				dropdownContent += "<li>" + val + "</li>";
				$ul.html( dropdownContent );
				$ul.listview( "refresh" );
				$ul.trigger( "updatelayout");  
			  });*/
        }
      })

	//getProgramaciones();
	$("#actualizar").click(function(e) {
		
		if ( $("#ruc").val() == "" ){
			alerta("Ingresar nro de ruc");
			$("#ruc").focus();
		}
		else
			getProgramaciones($("#ruc").val());
    });
	 $("form").keypress(function(e) {
        if (e.which == 13) {
            return false;
        }
    });
	
 	//getProgramaciones();
	
 
	
	 	$("#irTracking").attr("href","index.html");
	
	 
	
});

 
 $( document).on( "click", ".autocomplete li", function() { 
	  $("#ruc").val($(this).attr("id"));     
      var selectedItem = $(this).html();
	 //alert($(this).attr("id"));
      $('.autocompletePanel .ui-filterable input').val(selectedItem);   
      $('.autocomplete').hide();     
    });

function alertDismissed(){
}
//

function getProgramaciones(ruc){
	
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
			
			$.mobile.loading('hide');
			$(".panelMensaje").hide();
			$(".panelOrden").fadeIn("fast");
			if ( resultado.length > 0 ){
				var count = 0;
				for (var i = 0; i<resultado.length;i++){
															 
					$("#listProgramacion").append('<li><a data-ajax="false" href="detalle.html?admin=1&orden='+ encodeURIComponent(resultado[i].orden) +'&cliente=' + encodeURIComponent(resultado[i].referencia_cliente) + '&ruc='+ruc+'">'+ resultado[i].orden + '<br><span style=" font-weight:normal;">' + resultado[i].referencia_cliente +'</span></a></li> ');		
					 
				}
				
				$( "#listProgramacion" ).listview( "refresh" );
			 
			}
			else{
				$(".panelOrden").hide();
				$(".panelMensaje").fadeIn("fast");
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
