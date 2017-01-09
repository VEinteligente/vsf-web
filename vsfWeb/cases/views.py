import requests
import datetime
import json
from django.views.generic import (TemplateView)
from rest_framework.views import APIView

# Create your views here.

class GanttEvents(TemplateView):
    template_name = "gantt.html"

# This view obtains the blocked sites json data from the API of the Pandora project
class GanttEventsApi(APIView):
   
   def get(self, request, format=None):
       snippet = requests.get('http://127.0.0.1:8001/events/api/list-event-group/')
       return Response(snippet)


class MultipleElementsCase(TemplateView):
    template_name = "multiple-elements-case.html"

class OneElementCaseApi(APIView):
   
   def get(self, request, format=None):
       snippet = requests.get('http://192.168.0.130:8000/cases/api/list/')
       return Response(snippet)

class OneElementCase(TemplateView):
    template_name = "one-element-case.html"

class SpeedTestCase(TemplateView):
    template_name = "speed-test-case.html"