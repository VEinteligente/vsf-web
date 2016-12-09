$( document ).ready(function() {


   $('.informationPanel').hide();
   $("#count").html("0");
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
            $('.informationPanel1').html(valueSelected);
            $(".informationPanel2").html("");
            var elementHoverSpace = valueSelected.replace(/([A-Z])/g, ' $1').trim();
            for(var i=0; i<arrayName.length;i++){
        
                if(arrayName[i]==elementHoverSpace){
                $(".informationPanel2").html(arrayTotal[i]);
            }
        
    }
   
    if($('.informationPanel2').is(':empty')){
        $(".informationPanel2").html("0");
    }

    $('.informationPanel').css({
            top: $(".map").offset().top,
            left: $(".map").clientWidth/2
        });

 
            $('.informationPanel').show();
        }
        
        else{
            $("#"+$(this).text()).removeClass("hover");
            $(this).removeAttr("selected");
        }
        });

    });
    
 var arrayClass  =null;
var arrayName = [];
var arrayTotal = [];  
var arrayList  = [];
var arrayCounter = [];
var counter = 1;
var counterCase = 1;

       $.ajax({
                url: url_data,
                method: "GET",
                dataType: 'json',
                contentType: 'application/json'
                }).done( function( data ) {
                  
                    var temporal = ""; 
                    // For each element in the JSON we need to collect their values
                    for(var i=0; i<data.length; i++)
                        temporal=temporal.concat(data[i]);
                        
                        var dataJson=JSON.parse(temporal);
                  
           
                    $.each(dataJson , function(key , value){ // First Level 
                    
                      
                        if(key=="results"){
                            
                            $.each(value, function(secondKey,secondValue){
                            
                                             
                                            
                                 
                                  
                                  
                                            
                                            $.each(secondValue, function(thirdKey,thirdValue){
                                  
                                            if(thirdKey=="name"){
                                                arrayName[arrayName.length]=thirdValue;
                                                arrayList[arrayList.length]=thirdValue.replace(/([A-Z])/g, ' $1').trim();
                                                arrayCounter[arrayCounter.length]=counter;
                                             //   $(".informationPanel2").html(thirdValue);
                                            }
                                            
                                            if(thirdKey=="number_cases"){
                                                arrayTotal[arrayTotal.length]=thirdValue; 
                                             //   $(".informationPanel2").html(thirdValue);
                                            }
                                              
                                            if(thirdKey=="cases"){
                                            
                                
                            
                                             
                                            
                                                $.each(thirdValue, function(fourthKey,fourthValue){
                                                    
                                                    
                                                     
                                                    
                                                    
                                                    $.ajax({
                                                                            
                                                    url: url_style_list,
                                                    context: document.body,
                                                    data: arrayList,
                                                    async: false,                                                         
                                                    }).done( function( result ) 
                                                    {
                                                        //  
                                                                                                            
                                                        $("#caseregionList").append(result);
                                                        
                                                    });
                                                     $.each(fourthValue, function(fithKey,fithValue){
                                                    
                                                    
                                                    
                                                   
                                                   
                                                    
                                                    if(fithKey=="title"){
                                                    
                                                        $('#value').html(fithValue);
                                                        console.log(counter);
                                                        
                                                        
                                                        
                                                        counterCase=counterCase+1;
                                                        $('#value').closest(".subtitleBar").hide();
                                                        oldLinkID = $('#value').closest(".subtitleBar");
                                             
                                                        oldLinkID.addClass("class"+counter);
                                                        oldLinkID =  document.getElementById("value");
                                                        oldLinkID.id = "iden"+counter+"iden"+counterCase;
                                                        
                                                        oldLinkID =  document.getElementById("list-html");
                                                        oldLinkID.id = "link"+counter+"link"+counterCase;
                                                        
                                                        $("#"+"link"+counter+"link"+counterCase).find("a").find("i").removeClass("fa-lock");
                                                        $("#"+"link"+counter+"link"+counterCase).find("a").find("i").addClass("fa-external-link");
                                                           
                                              
                                                    }
                                                    
                                                    
                                                    });
                                                    
                                                    
                                                        
                                                        
                                                });
                                                }
                                            });
                                                
                                  count=count +1;

                            });
                        }
                            
                                          
                        
        
                    
                    

                });


                });
   
     


 
 $('.map g').mouseover(function (e) {
    $("#count").html("0");

    $('.informationPanel').show();
    var elementHover= $(this).attr('id');
    
    var elementHoverSpace = elementHover.replace(/([A-Z])/g, ' $1').trim();
    
    $(".informationPanel2").html("");
    
    for(var i=0; i<arrayName.length;i++){
        
        if(arrayName[i]==elementHoverSpace){
            $(".informationPanel2").html(arrayTotal[i]);
            $(".class"+arrayCounter[i]).show();
            $("#count").html(arrayTotal[i]);

        }
        else{
            $(".class"+arrayCounter[i]).hide();
        }
        
    }
   
    if($('.informationPanel2').is(':empty')){
        $(".informationPanel2").html("0");
    }
    
    $('.informationPanel1').html(elementHover);
    
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
    .mousemove(function(e) {
        var mouseX = e.pageX, //X coordinates of mouse
            mouseY = e.pageY; //Y coordinates of mouse

        $('.informationPanel').css({
            top: mouseY-50,
            left: mouseX - ($('.informationPanel').width()/2)
        });
    });
  

});

 
 