$('.subGraphDivHover').hide();

$('#subGraph1').mouseover(function(){
	$('#subGraph1 .subGraphDivHover').show();
}).mouseleave(function(){
	$('#subGraph1 .subGraphDivHover').hide();
});

$('#subGraph2').mouseover(function(){
	$('#subGraph2 .subGraphDivHover').show();
}).mouseleave(function(){
	$('#subGraph2 .subGraphDivHover').hide();
});

function modal_content(element_content){

	var response = $(element_content).clone(true);


	$('.global-modal').find('.modal-dialog').html(response);	
	$('.global-modal').modal("show");


}

function empty(){
	$('.global-modal').find('.modal-footer').html('');	
	$('.global-modal').find("#modalSearchTextTitle").html('');
}

$(document)
.ready(
		function() {

			// Global Variables
			var month_names = [ "Enero", "Febrero", "Marzo", "Abril",
			                    "Mayo", "Junio", "Julio", "Agosto", "Septiembre",
			                    "Octubre", "Noviembre", "Diciembre" ];



			var month_number = [ "01", "02", "03", "04", "05", "06",
			                     "07", "08", "09", 10, 11, 12 ];
			var count = 0;
			// url_data is where we fetch most of the case information
			// and pk is the id of the case

			var url_data_detail = url_one_case;

			// url_data is where we get the update data of the case and
			// pk is the id of the case
			var url_data_update = url_one_case_update;

			var url_share_facebook = "http://www.facebook.com/sharer.php?u=http://dev.web.pandora.saturno.space"
				+ url_case;
			var url_share_twitter = "http://twitter.com/share?url=http://dev.web.pandora.saturno.space"
				+ url_case;

			var url_share_reddit = "http://www.reddit.com/submit?url=http://dev.web.pandora.saturno.space"
				+ url_case;

			// list of isp to forbid the duplication of the names in front-end
			var isp_list = [];
			var isp_list_aux =[];

			$("#download").attr("href", url_one_case_excel + "id=" + pk);

			$('#downloadPdf').attr("href", url_one_case_pdf);
//			$('#SavePdf').attr("href", url_one_case_pdf);
			$("#shareFacebook").attr("href", url_share_facebook);

			$("#shareTwitter").attr("href", url_share_twitter);

			$("#shareReddit").attr("href", url_share_reddit);

			$("#measurementsLink").attr("href", url_data_measurements);

			$("#measurementsTitle").click(function(){
				window.location = url_data_measurements;
			})

			// This AJAX call corresponds to the request of the JSON data from Pandora
			// project API.
			$.ajax({
				url : url_one_case,
				method : "GET",

			}).done(
					function(dataJson) {


						$("#basicCaseInformation").append(dataJson);
						
						// Settings for the carrousel
						$("#owl-demo").owlCarousel({
							  

						      navigation : true, 
						      navText: [
						                       "<i class='fa fa-chevron-left'></i>",
						                       "<i class='fa fa-chevron-right'></i>"
						                    ],
						      slideSpeed : 300,
						      paginationSpeed : 400,
						      nav: true,
						      items : 1, 
						      itemsDesktop : false,
						      itemsDesktopSmall : false,
						      itemsTablet: false,
						      itemsMobile : false

						 
						 });
						
						 // Custom Navigation Events
						  function showNav(e){
							    if ($(".next").css("float") == "right") {
							      $(".next").fadeIn();
							      $(".prev").fadeIn();
							    }
							  }
							  function hideNav(e){
							    $(".next").fadeOut();
							    $(".prev").fadeOut();
							  }
							  $("#jm-Section-CARU").hover(showNav, hideNav);
							  $('.customNextBtn').click(function(e) {
							    e.preventDefault();
							    $(".owl-carousel").trigger('next.owl.carousel');
							  });
							  $('.customPrevBtn').click(function(e) {
							    e.preventDefault();
							    $(".owl-carousel").trigger('prev.owl.carousel');
							  });
						 
							
				
//						$('#footerCaseInfo').append(data);
//						$("#caseCategory").append('&nbsp <div class="'
//						+ (data.category).name
//						+ '"><div class="left_cornerTag"></div><div class="contentTag">'
//						+ (data.category).display_name
//						+ '</div><div class="right_cornerTag"></div></div>')

//						var site_array = [];

//						$.each(data.domains, function(index, result){
//						var site_name = result.site;


//						if ($.inArray(site_name,site_array)==-1){
//						site_array.push(site_name);

//						//It can happen that the site is null but the probe reported a blocked or failing url, in that case
//						//we only show the url which triggered the probe
//						if(site_name == null){
//						site_name = site_name.replace(" ","");
//						$("#domainTableBody").append('<tr><td id="nameDomain" style="width:100%">'+result.url+'<a href="'+result.url+'"><i class="fa fa-external-link" style="float:right" aria-hidden="true"></i></a></td></tr>');
//						}

//						//Site Name with a collapse div of the url that belongs to the site
//						else{

//						$("#domainTableBody").append('<tr class="focus clickable" data-toggle="collapse" data-target="#data'+site_name+'"><td id="nameDomain">'+site_name+'</td><tr><td id="focusDomain" class="prueba" style="padding:0;"><div class="collapse" id="data'+site_name+'"><div></td></tr>');




//						}

//						}




//						});

//						$.each(data.domains, function(index, result){
//						var site_name = result.site;

//						if(!(site_name == null)){
//						site_name = site_name.replace(" ","");
//						if(result.ip == null){
//						$("#data"+site_name).append('<tr class="rowDomain"><td id="siteDomain" style="width:100%">'+result.url+'</td><td><a href="'+result.url+'"><i class="fa fa-external-link" aria-hidden="true"></i></a></td></tr>');

//						}
//						else{
//						$("#data"+site_name).append('<tr class="rowDomain"><td id="siteDomain" style="width:100%">'+result.url+'</td><td>'+result.ip+'</td><td><a href="'+result.url+'"><i class="fa fa-external-link" aria-hidden="true"></i></a></td></tr>');

//						}

//						}
//						});
					});

			


		});

//Function for the Twitter Modal

$(document).on(
		"click",
		"#twmodalbutton",
		function() {
			//Here we gran the Json from de data-json field
			var raw_json = $(this).data('json');

			//Id from the measurement that goes in the title of the modal
			var mid = $(this).data('id');

			//Stringify for display the Json inside the modal
			data_modal = JSON.stringify(raw_json);

			//Sends the JSON file to the Modal
			$("#measurementData").jJsonViewer(raw_json, {
				expanded : true
			});

			//Sends the id to the title of the Modal
			$("#measurementTitle").html(
					'Measurement ID <span id="mModalID">'
					+ mid + '</span>');
		});