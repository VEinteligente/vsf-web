// The commands inside the $(document).ready are all the commands that will be loaded 
// after the rest of the page is loaded. 

$( document ).ready(function() {
        
        // url_data is the URL corresponding to the AJAX code
        var url_data = null;
        // show_result is the different key element name of the JSON array depending on the action selected by the user 
        var show_result = null;
        
        // The default value of the summary table category/isp list is "category"
        select("category");

        var name = null;
        var number = null;
        var count = 0;
        var title = null;      
}); 

// Fnction select(option): Enables the option to use the same AJAX code for the summary table for category or isp. 
// The input "option" corresponds to the type of list that we are going to show. Ex. "Category" or "ISP"

function select(option){
        
        // When select function is invoked the list is emptied  
        $("#tablebody").empty();
        
        // Depending on selected option we need to load the corresponding title and variable key of the result we want to show
        if(option=="category"){
        
            // This variable loads the translated string of the title corresponding to the "site" option 
            var categories=$("#category").val();
            
            $("#tableheader").html("Category");
            url_data= "http://192.168.1.109:8000/cases/api/list/category/";
            
        }
        else {
            // This variable loads the translated string of the title corresponding to the "domain" option
            var isps=$("#isp").val();            
            $("#tableheader").html("ISP");
            url_data = "http://192.168.1.109:8000/cases/api/list/isp/";
            
        }
        
 
        // This AJAX call corresponds to the request of the JSON data from Pandora project API.
        $.ajax({
                url: url_data,
                method: "GET",
                dataType: 'json',
                contentType: 'application/json'
        })
        .done(function(data){

        if (option == "category"){
            count = 0;

            $("#title").empty();
            $("#title").append('<span class="tag tag-default tag-pill float-xs-left pill-size" id="count" style="font-size:100%; background-color:red"></span> &nbsp Casos Por Categoría');
           
            $.each(data.results,function(index,result){

                    name = result.category;
                    number = result.number_cases;
                    count = count + result.number_cases;
                    $("#count").html(count);
                    $("#tablebody").append('<tr data-toggle="collapse" data-target="#data'+name+'" class="clickable"><td style="text-transform:capitalize"><span class="tag tag-default tag-pill float-xs-left">'+number
                        +'</span> &nbsp '+name+'</td><tr><td style="padding:0"><div id="data'+name+'" class="collapse"></div></td><td style="padding:0"></td></tr>');

                    $.each(result.cases, function (key, value){

                        title = value.title;
                        $("#data"+name).append('<tr><td>'+title+'</td><td><div class="blocked_tag"><div class="left_cornerTag"></div><div class="contentTag" style="text-transform:capitalize">'+name+'</div><div class="right_cornerTag"></div></div></td><td><a href="http://192.168.1.109:8000/cases/api/detail/'+value.id+'" class="btn btn-link">Ver</a></td></tr><br>');

                    })    
            })
        }
        
        else{

            count = 0;
            $("#title").empty();
            $("#title").append('<span class="tag tag-default tag-pill float-xs-left pill-size" id="count" style="font-size:100%; background-color:red"></span> &nbsp Casos Por ISP');
           
            $.each(data.results,function(index,result){

                    name = result.isp;
                    number = result.number_cases;
                    count = count + result.number_cases;
                    $("#count").html(count);
                    $("#tablebody").append('<tr data-toggle="collapse" data-target="#data'+name+'" class="clickable"><td style="text-transform:capitalize"><span class="tag tag-default tag-pill float-xs-left">'+number
                        +'</span> &nbsp '+name+'</td><tr><td style="padding:0"><div id="data'+name+'" class="collapse"></div></td><td style="padding:0"></td></tr>');

                    $.each(result.cases, function (key, value){

                        title = value.title;
                        $("#data"+name).append('<tr><td>'+title+'</td><td><a href="http://192.168.1.109:8000/cases/api/detail/'+value.id+'" class="btn btn-link">Ver</a></td></tr></tr>');

                    })    
            })

        }

        });


}