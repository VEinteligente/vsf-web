import requests
import datetime
import json
from django.views.generic import (TemplateView)

# Create your views here.


class CaseList(TemplateView):
	template_name = "case-list.html"
	def	get_context_data(self, **kwargs):
		r = requests.get('http://192.168.0.130:8000/cases/api/list/')
		context = super(CaseList, self).get_context_data(**kwargs)
		# context test not necessary
		context['test'] = json.loads(r.text)
		probando2 = json.loads(r.text)
		context['cases'] = probando2["results"]
		return context

class MultipleElementsCase(TemplateView):
    template_name = "multiple-elements-case.html"


class OneElementCase(TemplateView):
	template_name = "one-element-case.html"
	def get_context_data(self, **kwargs):
		r = requests.get('http://192.168.0.130:8000/cases/api/list/')
	    	context= super(OneElementCase,self).get_context_data(**kwargs)
	    	
	    	data = json.loads(r.text)
	    	context['cases'] = data["results"][0]
	    	
	    	#aux gets the date in python date time format to use in html
	    	dateaux = datetime.datetime.strptime(data["results"][0]["start_date"],'%Y-%m-%dT%H:%M:%SZ')
	    	context['date_case'] = dateaux
	    	
	    	#variable for handling events
	    	aux1 = data["results"]
	    	aux2 = [d['events'] for d in aux1]
	    	
	    	event_list1 =[]
	    	for x in aux2:
	    		for y in x:
	    			event_list1.append(y)
	    	event_list = event_list1
	    	r2= requests.get('http://192.168.0.130:8000/events/api/list/')
	    	event_data = json.loads(r2.text) 
	    	event_data2= event_data["results"]
	    	
	    	#Test Variables
	    	context['prueba'] =event_list
	    	context['ver'] = event_data2
	    	
	    	events_as = []
	    	for i in event_list:
	    		for x in event_data2:
	    			if i == x["identification"]:
	    				events_as.append(x)
	    	context['events'] = events_as

	    	#handling events date format
	    	dateaux2=[]
	    	for x in events_as:
	    		y = datetime.datetime.strptime(x["start_date"],'%Y-%m-%dT%H:%M:%SZ')
	    		dateaux2.append(y)
	    	context['date_event'] = dateaux2


		return context

class SpeedTestCase(TemplateView):
    template_name = "speed-test-case.html"