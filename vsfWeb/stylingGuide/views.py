from django.shortcuts import render
from django.conf import settings
from django.views.generic import (TemplateView)
from rest_framework.views import APIView
# Create your views here.

class Typography(TemplateView):
    template_name = "typography.html"
    
    
class Elements(TemplateView):
    template_name = "elements.html"
    
class List(TemplateView):
    template_name = "list.html"
    
        
class ListApi(APIView):

   def get(self, request, format=None):
       snippet = requests.get(settings.URL_VSF_WEB +'/styling-guide/list')
       return Response(snippet) 