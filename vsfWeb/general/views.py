import json
import requests
import datetime
from django.shortcuts import render


# Create your views here.
from django.views.generic import (TemplateView)
# Create your views here.

class AboutUs(TemplateView):
    template_name = "about-us.html"

class BlockedSites(TemplateView):
    template_name = "blocked-sites.html"
    
    def get_context_data(self,**kwargs ):
    	r = requests.get('http://192.168.0.130:8000/events/api/blocked_domains/')
    	context= super(BlockedSites,self).get_context_data(**kwargs)
    	#context test not necessary
    	context['test'] = json.loads(r.text)
    	probando2 = json.loads(r.text)
    	context['sites'] = probando2["results"]

    	return context

class BlockedUrls(TemplateView):
    template_name = "blocked-urls.html"
    
    def get_context_data(self,**kwargs ):
    	r = requests.get('http://192.168.0.130:8000/events/api/blocked_domains/')
    	context= super(BlockedUrls,self).get_context_data(**kwargs)
    	#context test not necessary
    	context['test'] = json.loads(r.text)
    	probando2 = json.loads(r.text)
    	context['urls'] = probando2["results"]

    	return context




class Dashboard(TemplateView):
    template_name = "dashboard.html"

