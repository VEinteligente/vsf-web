from django.shortcuts import render
from django.views.generic import (TemplateView)
# Create your views here.


# This view renders the HTML containing information about one element case
class loginTwitter(TemplateView):
    template_name = "components/trending-twitter.html"