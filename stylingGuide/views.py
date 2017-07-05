from django.conf import settings
from django.views.generic import (TemplateView)
from rest_framework.response import Response
from rest_framework.views import APIView
import requests


# Create your views here.
class Typography(TemplateView):
    """ This view renders the styling guide typography """
    template_name = "typography.html"


class Elements(TemplateView):
    """ This view renders the styling guide elements """
    template_name = "elements.html"


class List(TemplateView):
    """ This view renders the styling guide element from a row of a list """
    template_name = "list.html"


class ListApi(APIView):
    """ This view obtains the html element of a row from a list """

    def get(self, request, format=None):
        snippet = requests.get(settings.URL_VSF_WEB + '/styling-guide/list')
        return Response(snippet)
