import csv
import datetime
import json

from django.conf import settings
from django.http import HttpResponse
from django.views.generic import (TemplateView)
from rest_framework.response import Response
from rest_framework.views import APIView
import requests


# Create your views here.
class ListCases(TemplateView):
    """ This view renders the HTML of the simple search """
    template_name = "list-cases.html"


class SummaryTable(TemplateView):
    """ This view renders the html of the summary table of the cases """
    template_name = "summary-table.html"


class SummaryTableApi(APIView):
    """ This view renders the API request for the summary table """

    def get(self, request, format=None):
        headers = {'Authorization': settings.SERVICES_TOKEN}
        snippet = requests.get(
            settings.URL_VSF +
            '/cases/api/list/',
            headers=headers)
        return Response(snippet)


class SummaryCategoryTableApi(APIView):
    """ This view renders the API request for the summary table
    by category """

    def get(self, request, format=None):
        headers = {'Authorization': settings.SERVICES_TOKEN}
        snippet = requests.get(
            settings.URL_VSF +
            '/cases/api/list/category/',
            headers=headers)
        return Response(snippet)


class SummaryIspTableApi(APIView):
    """ This view renders the API request for the summary table
    by isp """

    def get(self, request, format=None):
        headers = {'Authorization': settings.SERVICES_TOKEN}
        snippet = requests.get(
            settings.URL_VSF +
            '/cases/api/list/isp/',
            headers=headers)
        return Response(snippet)


class MeasurementsTable(TemplateView):
    """ This view renders the html of the measurement table of a case  """
    template_name = "measurements-table.html"


class MeasurementsTableApi(APIView):
    """ This view renders the API request for the measurement table
    by category """

    def get(self, request, format=None):
        headers = {'Authorization': settings.SERVICES_TOKEN}
        snippet = requests.get(
            settings.URL_VSF +
            '/measurements/api/flags/',
            headers=headers)
        return Response(snippet)


def MeasurementsTableCVS(request):
    """ This view takes list of measurements and exports
    it to a CVS file. """
    # Get the list of all the cases and load it as JSON
    headers = {'Authorization': settings.SERVICES_TOKEN}
    snippet = requests.get(
        settings.URL_VSF +
        '/measurements/api/flags/',
        headers=headers)
    data = json.loads(snippet.text)

    # Create the HttpResponse object with the appropriate CSV header.
    response = HttpResponse(content_type='text/csv')
    response[
        'Content-Disposition'] = 'attachment; filename="MeasurementTable.csv"'

    # CSV header.
    writer = csv.writer(response)
    writer.writerow(['Fecha descarga',
                     'Sitios',
                     'URL',
                     'Fecha',
                     'Pais',
                     'Estado',
                     'Cuidad',
                     'ISP',
                     'Medicion',
                     'Tipo'])
    # count is the total of cases to be shown.
    # result is where the information is located in the JSON
    result = data['results']
    count = data["count"] - 1

    # Load all the information of each result in a CVS row
    while (count > -1):
        id = result[count]['id']
        date = result[count]['date']
        target = result[count]['target']
        url = target['url']
        site = target['site']
        probe = result[count]['probe']
        country = probe['country']
        region = probe['region']
        city = probe['city']
        isp = result[count]['isp']
        measurement = result[count]
        type = result[count]['type_med']

        download_date = datetime.datetime.now().date()

        writer.writerow([download_date,
                         site,
                         url,
                         date,
                         country,
                         region,
                         city,
                         isp,
                         measurement,
                         type])
        count = count - 1

    return response


def SummaryISPTableCVS(request):
    """ This view takes list of cases per ISP and exports
    it to a CVS file. """
    # Get the list of all the cases and load it as JSON
    headers = {'Authorization': settings.SERVICES_TOKEN}
    snippet = requests.get(
        settings.URL_VSF +
        '/cases/api/list/isp/',
        headers=headers)
    data = json.loads(snippet.text)

    # Create the HttpResponse object with the appropriate CSV header.
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="ISPTable.csv"'

    # CSV header.
    writer = csv.writer(response)
    writer.writerow(['Fecha descarga', 'ISP', 'Casos'])
    # count is the total of cases to be shown.
    # result is where the information is located in the JSON
    result = data['results']
    count = data["count"] - 1

    # Load all the information of each result in a CVS row
    while (count > -1):
        isp = result[count]['isp']

        cases = result[count]['cases']

        countCases = 0
        casesList = ""
        for case in cases:
            if countCases > 0:
                casesList = casesList + ";" + "ID:" + \
                    str(case["id"]) + ", Titulo: " + case["title"]
            else:
                casesList = "Casos= ID:" + \
                    str(case["id"]) + ", Titulo: " + case["title"]

        countCases = countCases + 1

        download_date = datetime.datetime.now().date()

        writer.writerow([download_date, isp, casesList])
        count = count - 1

    return response


def SummaryCategoryTableCVS(request):
    """ This view takes list of cases per category and exports
    it to a CVS file. """
    # Get the list of all the cases and load it as JSON
    headers = {'Authorization': settings.SERVICES_TOKEN}
    snippet = requests.get(
        settings.URL_VSF +
        '/cases/api/list/category/',
        headers=headers)
    data = json.loads(snippet.text)

    # Create the HttpResponse object with the appropriate CSV header.
    response = HttpResponse(content_type='text/csv')
    response[
        'Content-Disposition'] = 'attachment; filename="CategoryTable.csv"'

    # CSV header.
    writer = csv.writer(response)
    writer.writerow(['Fecha descarga', 'Category', 'Casos'])
    # count is the total of cases to be shown.
    # result is where the information is located in the JSON
    result = data['results']
    count = data["count"] - 1

    # Load all the information of each result in a CVS row
    while (count > -1):

        category = result[count]['category']
        cases = result[count]['cases']

        countCases = 0
        casesList = ""
        for case in cases:
            if countCases > 0:
                casesList = casesList + ";" + "ID:" + \
                    str(case["id"]) + ", Titulo: " + case["title"]
            else:
                casesList = "Casos= ID:" + \
                    str(case["id"]) + ", Titulo: " + case["title"]

        countCases = countCases + 1

        download_date = datetime.datetime.now().date()

        writer.writerow([download_date, category, casesList])
        count = count - 1

    return response
