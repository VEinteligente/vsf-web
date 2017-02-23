
import csv
import datetime
import json
import pdfkit
import requests

from django.conf import settings
from django.http import HttpResponse
from django.views.generic import (TemplateView)
from rest_framework.response import Response
from rest_framework.views import (APIView)



class Case(TemplateView):
    """This view renders the HTML containing information about one element case
    """
    template_name = "case.html"


class CaseApi(APIView):
    """This view obtains the information of the one element case as json data
        from the API of the Pandora project

     Keyword arguments:
    pk -- Primary key of a case
    """

    def get(self, request, pk="1", format=None):

        headers = {'Authorization': settings.SERVICES_TOKEN}
        snippet = requests.get(
            settings.URL_VSF +
            '/cases/api/detail/' +
            pk,
            headers=headers)
        return Response(snippet)


class CaseUpdateApi(APIView):
    """This view obtains the information of the one element case updates as
        json data from the API of the Pandora project

     Keyword arguments:
    pk -- Primary key of a case
    """

    def get(self, request, pk="1", format=None):
        headers = {'Authorization': settings.SERVICES_TOKEN}
        snippet = requests.get(
            settings.URL_VSF +
            '/cases/api/detail_update/' +
            pk,
            headers=headers)
        return Response(snippet)


class GanttEvents(TemplateView):
    """This view renders the HTML containing information about the gantt graphic
    """
    template_name = "gantt.html"


class GanttEventsApi(APIView):
    """This view obtains the blocked sites json data from the API of the
     Pandora project
    """

    def get(self, request, pk="1", format=None):
        headers = {'Authorization': settings.SERVICES_TOKEN}
        snippet = requests.get(
            settings.URL_VSF +
            '/cases/api/gantt/' + pk,
            headers=headers)
        return Response(snippet)


class EventsMonth(APIView):
    """ This view obtains the number of events per monthfrom the API of the
        Pandora project
    """

    def get(self, request, pk="1", format=None):
        headers = {'Authorization': settings.SERVICES_TOKEN}
        snippet = requests.get(
            settings.URL_VSF +
            '/cases/api/events-month/' + pk,
            headers=headers)
        return Response(snippet)


def CaseCVS(request, pk):
    """This view takes list of filtered cases and exports it to a CVS file.
    """

    # Get the list of all the cases and load it as JSON
    headers = {'Authorization': settings.SERVICES_TOKEN}
    snippet = requests.get(
        settings.URL_VSF +
        '/cases/api/detail/' +
        pk,
        headers=headers)
    data = json.loads(snippet.text)

    # Load all the information of each result in a CVS row

    id = data['id']
    start_date = data['start_date']

    if data["end_date"] is None:
        end_date = "Continua"
    else:
        end_date = data['end_date']

    description = data['description']
    title = data['title']
    category = data['category']

    isps = data['isp']
    countIsp = 0
    ispList = ""
    for isp in isps:
        if countIsp > 0:
            ispList = ispList + "," + isp
        else:
            ispList = isp

        countIsp = countIsp + 1

    regions = data['region']
    countRegion = 0
    regionList = ""

    for region in regions:
        if countRegion > 0:
            regionList = regionList + "," + region
        else:
            regionList = region

        countRegion = countRegion + 1

    domains = data['domains']

    countDomain = 0
    domainList = ""
    for domain in domains:
        if countDomain > 0:
            domainList = domainList + "," + \
                domain["site"] + ": " + domain["url"]
        else:
            domainList = domain["site"] + ": " + domain["url"]

        countDomain = countDomain + 1

    download_date = datetime.datetime.now().date()

    # Get the list of all the events of the cases and load it as JSON
    headers = {'Authorization': settings.SERVICES_TOKEN}
    snippet = requests.get(
        settings.URL_VSF +
        '/cases/api/detail_event/' +
        pk,
        headers=headers)
    data_event = json.loads(snippet.text)

    events = data_event['events']
    countEvent = 0
    eventList = ""
    for event in events:

        if countEvent > 0:
            print "Hello"
            print event["isp"]
            isp = event["isp"]
            eventList = (eventList + "; Event: " + event["identification"] +
                         ", Fecha inicio: " + event["start_date"] +
                         ", Fecha fin: " + event["end_date"] + ", Target: " +
                         event["target"]["site"] + event["target"]["url"] +
                         ", ISP: " + ispList)
        else:
            if event["end_date"] is None:
                eventList = ("Event: " + event["identification"] +
                             ", Fecha inicio: " + event["start_date"] +
                             ", Fecha fin: " + "Continua" + ", Target: " +
                             event["target"]["site"] + event["target"]["url"] +
                             ", ISP: " + ispList)
            else:
                eventList = ("Event: " + event["identification"] +
                             ", Fecha inicio: " + event["start_date"] +
                             ", Fecha fin: " + event["end_date"] +
                             ", Target: " + event["target"]["site"] +
                             event["target"]["url"] + ", ISP: " +
                             ispList)

        countEvent = countEvent + 1

    # Get the list of all the events of the cases and load it as JSON
    headers = {'Authorization': settings.SERVICES_TOKEN}
    snippet = requests.get(
        settings.URL_VSF +
        '/cases/api/detail_update/' +
        pk,
        headers=headers)
    data_update = json.loads(snippet.text)

    updates = data_update['updates']
    countUpdate = 0
    updateList = ""
    for update in updates:
        if countUpdate > 0:
            updateList = (updateList + ";" + "Update: " + str(update["id"]) +
                          ", Fecha: " + update["date"] + ", Titulo: " +
                          update["title"] + ", Category: " +
                          update["category"])
        else:
            updateList = ("Update: " + str(update["id"]) + ", Fecha: " +
                          update["date"] + ", Titulo: " + update["title"] +
                          ", Category: " + update["category"])

        countUpdate = countUpdate + 1

    # Create the HttpResponse object with the appropriate CSV header.
    response = HttpResponse(content_type='text/csv')
    response[
        'Content-Disposition'] = 'attachment; filename=Case_ID=' + pk + '.csv'

    # CSV header
    writer = csv.writer(response)
    writer.writerow(['Fecha descarga',
                     'ID',
                     'Titulo',
                     "Fecha inicio",
                     "Fecha final",
                     'Descripcion',
                     'Categoria',
                     "ISP",
                     "Region",
                     "Dominios",
                     "Updates",
                     "Eventos"])
    writer.writerow([download_date,
                     pk,
                     title,
                     start_date,
                     end_date,
                     description,
                     category,
                     ispList,
                     regionList,
                     domainList,
                     updateList,
                     eventList])

    return response


def CasePdf(request, pk="1"):
    """This view makes the pdf file available with the download button in the case page"""
    
    # Get the list of all the cases and load it as JSON
    headers = {'Authorization': settings.SERVICES_TOKEN}
    snippet = requests.get(
        settings.URL_VSF +
        '/cases/api/detail/' +
        pk,
        headers=headers)
    data = json.loads(snippet.text)
    
    #case ID
    id = data['id']
    title = data['title']
    
    pdf = pdfkit.from_file(
        settings.BASE_DIR+'/commons/static/pdf/case-pdf.html',
        False,
        options={
            'javascript-delay': '3000',
            #'print-media-type':'',
            #'header-html':settings.BASE_DIR+'/commons/static/pdf/header.html',
            #'footer-html':settings.BASE_DIR+'/commons/static/pdf/footer.html',
            'margin-left':'5',
            'margin-right':'5',
            'viewport-size':'1400',

            })
    response = HttpResponse(pdf, content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="case_' + \
        pk + '.pdf'

    return response


class SpeedTestCase(TemplateView):
    """This view renders the HTML containing information about speed test
    """
    template_name = "speed-test-case.html"
