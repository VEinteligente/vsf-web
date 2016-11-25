from django.shortcuts import render

from django.views.generic import (TemplateView)
# Create your views here.

class ListCases(TemplateView):
    template_name = "list-cases.html"
    