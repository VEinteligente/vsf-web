from django.shortcuts import render

from django.views.generic import (TemplateView)
from rest_framework.views import APIView
# Create your views here.

class Typography(TemplateView):
    template_name = "typography.html"
    
    
class Elements(TemplateView):
    template_name = "elements.html"
    
class List(TemplateView):
    template_name = "list.html"

class MapVenezuela(TemplateView):
    template_name = "maps/venezuela.html"
    
        
class ListApi(APIView):

       
   def get(self, request, format=None):
       thirdLevelValue= request.POST['thirdLevelValue']
       snippet = requests.get('localhost:8000/styling-guide/list')
       return Response(snippet) 