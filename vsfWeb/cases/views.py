
import datetime, json, requests 
from selenium import webdriver
from django.views.generic import (TemplateView)
from django.conf import settings
from rest_framework.views import (APIView)

from rest_framework.response import Response
# This view renders the HTML containing information about one element case
class OneElementCase(TemplateView):
    template_name = "one-element-case.html"
    
# This view obtains the information of the one element case as json data from the API of the Pandora project
class OneElementCaseApi(APIView):
   
   def get(self, request, pk ="1", format=None):
       headers = {'Authorization': settings.SERVICES_TOKEN}
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

# This view renders the HTML containing information about speed test
class SpeedTestCase(TemplateView):
    template_name = "speed-test-case.html"