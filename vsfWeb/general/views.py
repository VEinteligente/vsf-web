import json
import requests
import datetime

from django.shortcuts import render

from django.views.generic import (TemplateView)

from rest_framework.views import APIView
from rest_framework.response import Response
from django.template.defaultfilters import title


# This view renders the HTML containing information about the company, social network, etc. 
class AboutUs(TemplateView):
    template_name = "about-us.html"

# This view obtains the blocked sites json data from the API of the Pandora project
class BlockedSitesApi(APIView):
   
   def get(self, request, format=None):
       snippet = requests.get('http://127.0.1:8001/events/api/blocked_sites/')
       return Response(snippet)

# This view obtains the blocked domains json data from the API of the Pandora project
class BlockedDomainsApi(APIView):
   
   def get(self, request, format=None):
       snippet = requests.get('http://127.0.1:8001/events/api/blocked_domains/')
       
       return Response(snippet)

# This view renders the HTML containing information about the blocked sites and domains.
class BlockedUrlsSites(TemplateView):
    template_name = "blocked-sites_domains.html"

# This view renders the HTML containing information about map with its cases per region.
class MapVenezuela(TemplateView):
    template_name = "maps/venezuela.html"

# This view obtains the maps json data from the API of the Pandora project  
class MapApi(APIView):
       
   def get(self, request, format=None):
       snippet = requests.get('http://127.0.1:8001/cases/api/list/region/')
       
       return Response(snippet)
  
# This view renders the HTML containing information about list of cases
class CaseList(TemplateView):
    template_name = "list-cases.html"      
    
# This view obtains the list of cases json data from the API of the Pandora project  
class CaseListApi(APIView):
       
   def get(self, request, format=None):      
       snippet = requests.get('http://127.0.1:8001/cases/api/list/')
       
       return Response(snippet)
   
   def post(self, request, format=None):
       title = request.data["title"]
       region = request.data["region"]
       category = request.data["category"]
       start_date=  request.data["start_date"]
       end_date=  request.data["end_date"]
       print end_date
       
       snippet = requests.get('http://127.0.1:8001/cases/api/list-case-filter/?title=' + title +"&category="+category+'&start_date='+start_date+'&end_date='+end_date+'&region='+region)
       
       return Response(snippet)
   

class Dashboard(TemplateView):
    template_name = "dashboard.html"

