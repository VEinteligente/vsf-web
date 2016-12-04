from django.shortcuts import render
import json
import requests
import datetime

# Create your views here.
from django.views.generic import (TemplateView)
# Create your views here.

class AboutUs(TemplateView):
    template_name = "about-us.html"

class BlockedSites(TemplateView):
    template_name = "blocked-sites.html"
    
    def get_context_data(self,**kwargs ):
    	r = requests.get('http://192.168.0.114:8000/events/api/blocked_domains/')
    	context= super(BlockedSites,self).get_context_data(**kwargs)
    	#context test not necessary
    	context['test'] = json.loads(r.text)
    	probando2 = json.loads(r.text)
    	context['sites'] = probando2["results"]

    	return context

class BlockedUrls(TemplateView):
    template_name = "blocked-urls.html"
    
    def get_context_data(self,**kwargs ):
    	r = requests.get('http://192.168.0.114:8000/events/api/blocked_domains/')
    	context= super(BlockedUrls,self).get_context_data(**kwargs)
    	#context test not necessary
    	context['test'] = json.loads(r.text)
    	probando2 = json.loads(r.text)
    	context['urls'] = probando2["results"]

    	return context

class CaseList(TemplateView):
	template_name = "case-list.html"
	def get_context_data(self, **kwargs):
		r = requests.get('http://192.168.0.114:8000/cases/api/list/')
	    	context= super(CaseList,self).get_context_data(**kwargs)
	    	#context test not necessary
	    	context['test'] = json.loads(r.text)
	    	probando2 = json.loads(r.text)
	    	context['cases'] = probando2["results"]

	    	return context

class CaseDetail(TemplateView):
	template_name = "case-detail.html"
	def get_context_data(self, **kwargs):
		r = requests.get('http://192.168.0.114:8000/cases/api/list/')
	    	context= super(CaseDetail,self).get_context_data(**kwargs)
	    	#context test not necessary
	    	context['test'] = json.loads(r.text)
	    	probando2 = json.loads(r.text)
	    	context['cases'] = probando2["results"][0]
	    	aux = datetime.datetime.strptime(probando2["results"][0]["start_date"],'%Y-%m-%dT%H:%M:%SZ')
	    	context['date'] = aux

	    	return context


class Dashboard(TemplateView):
    template_name = "dashboard.html"

