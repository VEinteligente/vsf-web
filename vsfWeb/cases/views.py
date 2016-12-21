import requests
import datetime
import json
from django.views.generic import (TemplateView)
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.



class CaseList(TemplateView):
	template_name = "case-list.html"
	def	get_context_data(self, **kwargs):
		r = requests.get('http://192.168.0.130:8000/cases/api/list/')
		context = super(CaseList, self).get_context_data(**kwargs)
		probando2 = json.loads(r.text)
		context['cases'] = probando2["results"]
		return context

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