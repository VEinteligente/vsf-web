from django.shortcuts import render
import json
import requests

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
    	context['probando'] = json.loads(r.text)
    	probando2 = json.loads(r.text)
    	context['pruebas'] = probando2["results"]

    	return context

class BlockedUrls(TemplateView):
    template_name = "blocked-urls.html"
    
    def get_context_data(self,**kwargs ):
    	r = requests.get('http://192.168.0.130:8000/events/api/blocked_domains/')
    	context= super(BlockedUrls,self).get_context_data(**kwargs)
    	context['probando'] = json.loads(r.text)
    	probando2 = json.loads(r.text)
    	context['pruebas'] = probando2["results"]

    	return context

class CaseList(TemplateView):
	template_name = "case-list.html"
	def get_context_data(self, **kwargs):
		r = requests.get('http://192.168.0.130:8000/cases/api/detail')
	    	context= super(CaseList,self).get_context_data(**kwargs)
	    	context['probando'] = json.loads(r.text)
	    	probando2 = json.loads(r.text)
	    	context['pruebas'] = probando2["results"]

	    	return context

class Dashboard(TemplateView):
    template_name = "dashboard.html"

