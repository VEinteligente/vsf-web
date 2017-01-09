from django.shortcuts import render
from django.views.generic import (TemplateView)
from rest_framework.views import APIView
from rest_framework.response import Response
import requests
# Create your views here.

class ListCases(TemplateView):
    template_name = "list-cases.html"

class SummaryTable(TemplateView):
    template_name = "summary-table.html"

class SummaryTableApi(APIView):
   
   def get(self, request, format=None):
       snippet = requests.get('http://127.0.0.1:8001/cases/api/list/')
       return Response(snippet)
   
class SummaryTableCategoryApi(APIView):
   
   def get(self, request, format=None):
       snippet = requests.get('http://127.0.0.1:8001/cases/api/list/category/')
       return Response(snippet)

class SummaryTableIspApi(APIView):
   
   def get(self, request, format=None):
       snippet = requests.get('http://127.0.0.1:8001/cases/api/list/isp/')
       return Response(snippet)
   
