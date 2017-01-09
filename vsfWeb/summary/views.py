from django.shortcuts import render
from django.views.generic import (TemplateView)
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.

class ListCases(TemplateView):
    template_name = "list-cases.html"

class SummaryTable(TemplateView):
	template_name = "summary-table.html"

class SummaryTableApi(APIView):
   def get(self, request, format=None):
       snippet = requests.get('http://192.168.0.130:8000/cases/api/list/')
       return Response(snippet)

class MeasurementsTable(TemplateView):
	template_name = "measurements-table.html" 
