from django.shortcuts import render

from django.views.generic import (TemplateView)
# Create your views here.

class CANTV(TemplateView):
    template_name = "cantv.html"
    
class Digitel(TemplateView):
    template_name = "digitel.html"
        
class Inter(TemplateView):
    template_name = "inter.html"
        
class Movistar(TemplateView):
    template_name = "movistar.html"

class Supercable(TemplateView):
    template_name = "supercable.html"