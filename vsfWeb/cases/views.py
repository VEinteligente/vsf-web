from django.shortcuts import render

from django.views.generic import (TemplateView)
# Create your views here.

class OneElementCase(TemplateView):
    template_name = "one-element-case.html"
    
class MultipleElementsCase(TemplateView):
    template_name = "multiple-elements-case.html"
    
class SpeedTestCase(TemplateView):
    template_name = "speed-test-case.html"