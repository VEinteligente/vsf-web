from django.shortcuts import render

from django.views.generic import (TemplateView)
# Create your views here.

class Typography(TemplateView):
    template_name = "typography.html"