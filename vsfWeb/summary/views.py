from django.shortcuts import render
from django.views.generic import (TemplateView)
from rest_framework.views import APIView
from rest_framework.response import Response


from django.conf import settings


import requests

from django.template.defaultfilters import title
# Create your views here.

class ListCases(TemplateView):
    template_name = "list-cases.html"

class SummaryTable(TemplateView):
    template_name = "summary-table.html"

class SummaryTableApi(APIView):
   
   def get(self, request, format=None):
       headers = {'Authorization': settings.SERVICES_TOKEN}
       snippet = requests.get('http://127.0.0.1:8001/cases/api/list/', headers=headers)
       return Response(snippet)
   
class SummaryCategoryTableApi(APIView):
   
   def get(self, request, format=None):
       headers = {'Authorization': settings.SERVICES_TOKEN}
       snippet = requests.get('http://127.0.0.1:8001/cases/api/list/category/' , headers = headers )
       return Response(snippet)

class SummaryIspTableApi(APIView):
   
   def get(self, request, format=None):
       headers = {'Authorization': settings.SERVICES_TOKEN}
       snippet = requests.get('http://127.0.0.1:8001/cases/api/list/isp/' , headers = headers )
       return Response(snippet)
   
class MeasurementsTable(TemplateView):
    template_name = "measurements-table.html" 

class MeasurementsTableApi(APIView):
   def get(self, request, format=None):
       headers = {'Authorization': settings.SERVICES_TOKEN}
       snippet = requests.get('http://127.0.0.1:8001/measurements/api/flags/', headers = headers)
       return Response(snippet)

