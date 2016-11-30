from django.shortcuts import render
import json
import requests

# Create your views here.
from django.views.generic import (TemplateView)
# Create your views here.

class AboutUs(TemplateView):
    template_name = "about-us.html"
    
    def get_context_data(self,**kwargs ):
    	r = requests.get('http://192.168.0.130:8000/events/api/blocked_domains/')
    	context= super(AboutUs,self).get_context_data(**kwargs)
    	context['probando'] = json.loads(r.text)
    	probando2 = json.loads(r.text)
    	context['pruebas'] = probando2["results"]

    	return context

class Dashboard(TemplateView):
    template_name = "dashboard.html"
