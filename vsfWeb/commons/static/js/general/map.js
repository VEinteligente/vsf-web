$( document ).ready(function() {
   $('.informationPanel').hide();
   
   //Step 1: initialize the array making it a global variable
    var myarr = [];
    var element=0;
    //Step 2: Search for all IDs and add them to the array
    $(function(){
    
        $("svg > g").each(function(){
            
            myarr[element] = $(this).attr('id');

            $('#mapSelector').append('<option value="'+ myarr[element] + '">' + myarr[element] + '</option>');
            
            element=myarr.length;


        });
    });     
   
 
    

    $('select').on('change', function (e) {
        var optionSelected = $("option:selected", this);
        var valueSelected = this.value;
        
        $("select option").each(function(){
        if ($(this).text() == valueSelected){
            $("#"+valueSelected).addClass("hover");
            $(this).attr("selected","selected");
            $('.informationPanel').html(valueSelected);
        }
        
        else{
            $("#"+$(this).text()).removeClass("hover");
            $(this).removeAttr("selected");
        }
        });

    });
    


   
    


   
        $.ajax({
                url: url_data,
                method: "GET",
                dataType: 'json',
                contentType: 'application/json'
                }).done( function( data ) {
                    
                    for(var i=0; i<data.length; i++)
                        temporal=temporal.concat(data[i])
                        
                        var dataJson=JSON.parse(temporal);
                        console.log(temporal)
                        console.log(data)                
                        console.log(dataJson)    
                        
                    $.each(dataJson , function(key , value){ // First Level 
                        $('.informationPanel').append();
                    }
                    

                });



});
 
 
 
 
 $('.map g').mouseover(function (e) {
    $('.informationPanel').show();
    var elementHover= $(this).attr('id');
    
    $('.informationPanel').html(elementHover);
    
    $("select option").each(function(){
        if ($(this).text() == elementHover){
            $("#"+elementHover).addClass("hover");
            $(this).attr("selected","selected");
            $("select").val(elementHover).change();
        }
        
        else{
            $("#"+$(this).text()).removeClass("hover");
            $(this).removeAttr("selected");
        }
    });
 
    
    })
    .mouseleave(function () {
        $('.info_panel').remove();
    })
    .mousemove(function(e) {
        var mouseX = e.pageX, //X coordinates of mouse
            mouseY = e.pageY; //Y coordinates of mouse

        $('.informationPanel').css({
            top: mouseY-50,
            left: mouseX - ($('.informationPanel').width()/2)
        });
    });
  
