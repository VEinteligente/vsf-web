import json
import requests
import datetime

from django.shortcuts import render

from django.views.generic import (TemplateView)

from rest_framework.views import APIView
from rest_framework.response import Response


# This view renders the HTML containing information about the company, social network, etc. 
class AboutUs(TemplateView):
    template_name = "about-us.html"


class BlockedSites(TemplateView):
    template_name = "blocked-sites.html"
    
    def get_context_data(self,**kwargs ):
    	r = requests.get('http://192.168.0.130:8000/events/api/blocked_domains/')
    	context= super(BlockedSites,self).get_context_data(**kwargs)
    	probando2 = json.loads(r.text)
    	context['sites'] = probando2["results"]

    	return context

class BlockedUrls(TemplateView):
    template_name = "blocked-urls.html"
    
    def get_context_data(self,**kwargs ):
    	r = requests.get('http://192.168.0.130:8000:8000/events/api/blocked_domains/')
    	context= super(BlockedUrls,self).get_context_data(**kwargs)
    	probando2 = json.loads(r.text)
    	context['urls'] = probando2["results"]

    	return context

# This view obtains the blocked sites json data from the API of the Pandora project
class BlockedSitesApi(APIView):
   
   def get(self, request, format=None):
      snippet= requests.get('http://192.168.0.130:8000:8000/events/api/blocked_sites/')
      return Response(snippet)

# This view obtains the blocked domains json data from the API of the Pandora project
class BlockedDomainsApi(APIView):
   
   def get(self, request, format=None):
       snippet = requests.get('http://192.168.0.130:8000:8000/events/api/blocked_domains/?format=json')
       
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
       snippet = requests.get('http://192.168.0.130:8000:8000/cases/api/list/region/')
       
       return Response(snippet)
    


class CaseList(TemplateView):
	template_name = "case-list.html"
	def get_context_data(self, **kwargs):
		r = requests.get('http://192.168.0.130:8000/cases/api/list/')
	    	context= super(CaseList,self).get_context_data(**kwargs)
	    	probando2 = json.loads(r.text)
	    	context['cases'] = probando2["results"]

	    	return context

class CaseListApi(APIView):
       
   def get(self, request, format=None):      
       snippet = requests.get('http://192.168.0.100:8000/cases/api/list/')
       
       return Response(snippet)
   
   def post(self, request, format=None):
       title = request.data["title"]
       region = request.data["region"]
       category = request.data["category"]
       start_date=  request.data["start_date"]
       end_date=  request.data["end_date"]
       print end_date
       
       snippet = requests.get('http://192.168.0.100:8000/cases/api/list-case-filter/?title=' + title +"&category="+category+'&start_date='+start_date+'&end_date='+end_date+'&region='+region)
       
       return Response(snippet)
   

class CaseDetail(TemplateView):
	template_name = "case-detail.html"
	def get_context_data(self, **kwargs):
		r = requests.get('http://192.168.0.130:8000/cases/api/list/')
	    	context= super(CaseDetail,self).get_context_data(**kwargs)
	    	probando2 = json.loads(r.text)
	    	context['cases'] = probando2["results"][0]
	    	aux = datetime.datetime.strptime(probando2["results"][0]["start_date"],'%Y-%m-%dT%H:%M:%SZ')
	    	context['date'] = aux


class Dashboard(TemplateView):
    template_name = "dashboard.html"

