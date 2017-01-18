
import datetime, json, requests 


from django.views.generic import (TemplateView)
from django.conf import settings
from rest_framework.views import (APIView)
import csv
from django.http import HttpResponse
from rest_framework.response import Response

# This view renders the HTML containing information about one element case
class OneElementCase(TemplateView):
    template_name = "one-element-case.html"
    
# This view obtains the information of the one element case as json data from the API of the Pandora project
class OneElementCaseApi(APIView):
   
   def get(self, request, pk ="1", format=None):
       headers = {'Authorization': settings.SERVICES_TOKEN}
       print pk
       snippet = requests.get('http://127.0.0.1:8001/cases/api/detail/'+ pk , headers = headers )
       return Response(snippet)

# This view obtains the information of the one element case as json data from the API of the Pandora project
class OneElementCaseUpdateApi(APIView):
   
   def get(self, request, pk ="1", format=None):
       headers = {'Authorization': settings.SERVICES_TOKEN}
       snippet = requests.get('http://127.0.0.1:8001/cases/api/detail_update/'+ pk , headers = headers )
       return Response(snippet)
   
   
# This view renders the HTML containing information about multiple elements case
class MultipleElementsCase(TemplateView):
    template_name = "multiple-elements-case.html"

# This view renders the HTML containing information about the gantt graphic
class GanttEvents(TemplateView):
    template_name = "gantt.html"

# This view obtains the blocked sites json data from the API of the Pandora project
class GanttEventsApi(APIView):
   
   def get(self, request, format=None):
       headers = {'Authorization': settings.SERVICES_TOKEN}
       snippet = requests.get('http://127.0.0.1:8001/events/api/list-event-group/' , headers = headers )
       return Response(snippet)



# This view takes list of filtered cases and exports it to a CVS file.
def CaseCVS( request, pk ):
    
    # Get the list of all the cases and load it as JSON
    headers = {'Authorization': settings.SERVICES_TOKEN}
    snippet = requests.get( 'http://127.0.0.1:8001/cases/api/detail/' + pk , headers = headers )
    data = json.loads( snippet.text )
    
    # Load all the information of each result in a CVS row

    id = data['id']
    start_date = data['start_date']
    
    
    if  data["end_date"] is None:
        end_date = "Continua"
    else:
        end_date = data['end_date']
            
            
    description = data['description']
    title = data['title']
    category = data['category']
        
    isps = data['isp']
    countIsp = 0
    ispList = ""
    for isp in isps:
        if countIsp>0:
            ispList = ispList + "," + isp
        else:
            ispList = isp
            
            
        countIsp = countIsp + 1 
            
    regions = data['region']
    countRegion = 0
    regionList = ""
    
    for region in regions:
        if countRegion>0:
            regionList = regionList + "," + region
        else:
            regionList = region
            
            
        countRegion = countRegion + 1 
            
    domains = data['domains']
    
    countDomain = 0
    domainList = ""
    for domain in domains:
        if countDomain>0:
            domainList = domainList + "," + domain["site"] + ": " + domain["url"] 
        else:
            domainList = domain["site"] + ": " + domain["url"]          
            
        countDomain = countDomain + 1 
    
    download_date = datetime.datetime.now().date()
    
    
    # Get the list of all the events of the cases and load it as JSON
    headers = {'Authorization': settings.SERVICES_TOKEN}
    snippet = requests.get( 'http://127.0.0.1:8001/cases/api/detail_event/' + pk , headers = headers )
    data_event = json.loads( snippet.text )
    
    events = data_event['events']
    countEvent = 0
    eventList = ""
    for event in events:
        if countEvent > 0:
            eventList = eventList + ";" + "Event: " + event["identification"] + ", Fecha inicio: " + event["start_date"] + ", Fecha fin: " + event["end_date"]  + ", Target: " + event["isp"] + ", isp: " + event["isp"]     
        else: 
            if  event["end_date"] is None:
                eventList = "Event: " + event["identification"] + ", Fecha inicio: " + event["start_date"] + ", Fecha fin: " + "Continua"  + ", Target: " + event["target"] + ", ISP: " + event["isp"]
            else:
                eventList = "Event: " + event["identification"] + ", Fecha inicio: " + event["start_date"] + ", Fecha fin: " + event["end_date"]  + ", Target: " + event["target"] + ", ISP: " + event["isp"]
                                
            
        countEvent = countEvent + 1 
    
    
    # Get the list of all the events of the cases and load it as JSON
    headers = {'Authorization': settings.SERVICES_TOKEN}
    snippet = requests.get( 'http://127.0.0.1:8001/cases/api/detail_update/' + pk , headers = headers )
    data_update = json.loads( snippet.text )
    
    updates = data_update['updates']
    countUpdate = 0
    updateList = ""
    for update in updates:
        if countUpdate > 0:
            updateList = updateList + ";" + "Update: " + str(update["id"]) + ", Fecha: " + update["date"] + ", Titulo: " + update["title"]  + ", Category: " + update["category"]     
        else:
            updateList = "Update: " + str(update["id"]) + ", Fecha: " + update["date"] + ", Titulo: " + update["title"]  + ", Category: " + update["category"]
                                
            
        countUpdate = countUpdate + 1 
    
    
    
    # Create the HttpResponse object with the appropriate CSV header.
    response = HttpResponse( content_type='text/csv' )
    response['Content-Disposition'] = 'attachment; filename=Case_ID=' + pk + '.csv'
    
    # CSV header
    writer = csv.writer(response)
    writer.writerow(['Fecha descarga', 'ID', 'Titulo',  "Fecha inicio", "Fecha final", 'Descripcion', 'Categoria', "ISP", "Region", "Dominios", "Updates", "Eventos"])
    writer.writerow([ download_date, pk, title, start_date, end_date,  description, category, ispList, regionList, domainList, updateList, eventList])

            
    
   
    return response    


# This view renders the HTML containing information about speed test
class SpeedTestCase(TemplateView):
    template_name = "speed-test-case.html"