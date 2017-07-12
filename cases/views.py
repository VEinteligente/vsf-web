
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

from django.views import generic
from .forms import SearchCaseForm


class ListCases(generic.FormView):
    headers = {'Authorization': settings.SERVICES_TOKEN}
    form_class = SearchCaseForm
    template_name = 'case-list.html'
    cases = []

    def get_regions(self):
        url = settings.URL_VSF + '/cases/api/region/'
        all_regions = False
        regions = []
        clean_regions = []

        while not all_regions:
            snippet = requests.get(
                url,
                headers=self.headers)
            snippet = snippet.json()
            regions = regions + snippet['results']

            if not snippet['next']:
                all_regions = True
            else:
                url = snippet['next']

        for region in regions:
            clean_regions.append((str(region['name']) + '-' + str(region['country']), region['name']))

        return clean_regions

    def get_isp(self):
        url = settings.URL_VSF + '/events/api/isp/'
        all_isp = False
        isp = []
        clean_isp = []

        while not all_isp:
            snippet = requests.get(
                url,
                headers=self.headers)
            snippet = snippet.json()
            isp = isp + snippet['results']

            if not snippet['next']:
                all_isp = True
            else:
                url = snippet['next']

        for isps in isp:
            clean_isp.append((isps['name'], isps['name']))

        return clean_isp

    def get_site(self):
        url = settings.URL_VSF + '/events/api/site/'
        all_site = False
        sites = []
        clean_sites = []

        while not all_site:
            snippet = requests.get(
                url,
                headers=self.headers)
            snippet = snippet.json()
            sites = sites + snippet['results']

            if not snippet['next']:
                all_site = True
            else:
                url = snippet['next']

        for site in sites:
            clean_sites.append((site['name'], site['name']))

        return clean_sites

    def get_categories(self):
        url = settings.URL_VSF + '/cases/api/list/category/'
        all_categories = False
        categories = []
        clean_categories = []

        while not all_categories:
            snippet = requests.get(
                url,
                headers=self.headers)
            snippet = snippet.json()
            categories = categories + snippet['results']

            if not snippet['next']:
                all_categories = True
            else:
                url = snippet['next']

        for category in categories:
            clean_categories.append((category['category']['name'], category['category']['name']))

        return clean_categories

    def get_form(self, form_class=None):
        """
        Returns an instance of the form to be used in this view.
        """
        selects_data = {
            'regions': self.get_regions(),
            'isp': self.get_isp(),
            'sites': self.get_site(),
            'categories': self.get_categories()
        }

        if form_class is None:
            form_class = self.get_form_class()

        return form_class(selects_data=selects_data, **self.get_form_kwargs())

    def form_valid(self, form):
        """
        If the form is valid, redirect to the supplied URL.
        """
        search_data = []

        if form.cleaned_data['start_date']:
            search_data.append('start_date=' + str(form.cleaned_data['start_date']))
        if form.cleaned_data['end_date']:
            search_data.append('end_date=' + str(form.cleaned_data['end_date']))

        if form.cleaned_data['isp']:
            isps = 'isp='
            for isp in form.cleaned_data['isp']:
                if isp not in isps:
                    isps += isp + ','
            search_data.append(isps[:-1])

        if form.cleaned_data['categories']:
            categories = 'category='
            for category in form.cleaned_data['categories']:
                if category not in categories:
                    categories += category + ','
            search_data.append(categories[:-1])

        if form.cleaned_data['regions']:
            states = 'region='
            countries = 'country='
            for region in form.cleaned_data['regions']:
                region = region.split('-')

                if region[0] not in states:
                    states += region[0] + ','

                if region[1] not in countries:
                    countries += region[1] + ','

            search_data.append(countries[:-1])
            search_data.append(states[:-1])

        if form.cleaned_data['sites']:
            sites = 'site='
            for site in form.cleaned_data['sites']:
                if site not in sites:
                    sites += site + ','
            search_data.append(sites[:-1])

        return self.render_to_response(self.get_context_data(search_data=search_data))

    def get_context_data(self, **kwargs):
        """
        Insert the form into the context dict.
        """
        all_cases = False
        cases = []
        url = settings.URL_VSF + '/cases/api/list-case-filter/'
        if 'search_data' in kwargs:
            url += '?'
            for value in kwargs['search_data']:
                url += value + '&'
            url = url[:-1]

        while not all_cases:
            snippet = requests.get(
                url,
                headers=self.headers)
            snippet = snippet.json()
            cases = cases + snippet['results']

            if not snippet['next']:
                all_cases = True
            else:
                url = snippet['next']

        kwargs['cases'] = cases

        if 'form' not in kwargs:
            kwargs['form'] = self.get_form()
        return super(ListCases, self).get_context_data(**kwargs)

# -------------------------------------------------


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


    
class SpeedTestCase(TemplateView):
    """This view renders the HTML containing information about speed test
    """
    template_name = "speed-test-case.html"
