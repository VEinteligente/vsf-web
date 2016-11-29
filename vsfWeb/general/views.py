from django.shortcuts import render

# Create your views here.
from django.views.generic import (TemplateView)
# Create your views here.

class AboutUs(TemplateView):
    template_name = "about-us.html"
    
class Dashboard(TemplateView):
    template_name = "dashboard.html"
