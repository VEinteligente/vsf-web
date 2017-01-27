
import csv
import datetime
import json
import urllib2

from django.conf import settings
from django.http import HttpResponse
from django.template.defaultfilters import title
from django.utils.http import urlquote
from django.views.generic import (TemplateView)
from rest_framework.response import Response
from rest_framework.views import APIView
import requests


class AboutUs(TemplateView):
    """ This view renders the HTML containing information about the company,
        social network, etc.
    """
    template_name = "about-us.html"


class ISPListApi(APIView):
    """This view obtains the list of isp json data from the API of the
        Pandora project
    """

    def get(self, request, format=None):
        headers = {'Authorization': settings.SERVICES_TOKEN}
        snippet = requests.get(
            settings.URL_VSF +
            '/cases/api/isp/',
            headers=headers)
        return Response(snippet)


class CategoryListApi(APIView):
    """This view obtains the list of isp json data from the API of the
        Pandora project
    """

    def get(self, request, format=None):
        headers = {'Authorization': settings.SERVICES_TOKEN}
        snippet = requests.get(
            settings.URL_VSF +
            '/cases/api/category/',
            headers=headers)
        return Response(snippet)


class SiteListApi(APIView):
    """This view obtains the list of isp json data from the API of the
        Pandora project
    """

    def get(self, request, format=None):
        headers = {'Authorization': settings.SERVICES_TOKEN}
        snippet = requests.get(
            settings.URL_VSF +
            '/events/api/site/',
            headers=headers)
        return Response(snippet)


class RegionListApi(APIView):
    """This view obtains the list of isp json data from the API of the
        Pandora project
    """

    def get(self, request, format=None):
        headers = {'Authorization': settings.SERVICES_TOKEN}
        snippet = requests.get(
            settings.URL_VSF +
            '/cases/api/region/',
            headers=headers)
        return Response(snippet)


class BlockedSitesApi(APIView):
    """This view obtains the blocked sites json data from the API of the
        Pandora project
    """

    def get(self, request, format=None):
        headers = {'Authorization': settings.SERVICES_TOKEN}
        snippet = requests.get(
            settings.URL_VSF +
            '/events/api/blocked_sites/',
            headers=headers)
        return Response(snippet)


class BlockedDomainsApi(APIView):
    """ This view obtains the blocked domains json data from the API of the
    Pandora project """

    def get(self, request, format=None):
        headers = {'Authorization': settings.SERVICES_TOKEN}
        snippet = requests.get(
            settings.URL_VSF +
            '/events/api/blocked_domains/',
            headers=headers)
        return Response(snippet)


def BlockedDomainsTableCVS(request):
    """ This view takes list of filtered cases and exports it to a CVS file."""
    # Get the list of all the cases and load it as JSON
    headers = {'Authorization': settings.SERVICES_TOKEN}
    snippet = requests.get(
        settings.URL_VSF +
        '/events/api/blocked_domains/',
        headers=headers)
    data = json.loads(snippet.text)

    # Create the HttpResponse object with the appropriate CSV header.
    response = HttpResponse(content_type='text/csv')
    response[
        'Content-Disposition'] = ('attachment;' +
                                  ' filename="BlockedDomainsTable.csv"')

    # CSV header.
    writer = csv.writer(response)
    writer.writerow(['Fecha descarga', 'Domains'])
    # count is the total of cases to be shown.
    # result is where the information is located in the JSON
    result = data['results']
    count = data["count"] - 1

    # Load all the information of each result in a CVS row
    while (count > -1):
        site = result[count]['site']
        url = result[count]['url']

        download_date = datetime.datetime.now().date()

        writer.writerow([download_date, site, url])
        count = count - 1

    return response


def BlockedSitesTableCVS(request):
    """ This view takes list of filtered cases
    and exports it to a CVS file. """
    # Get the list of all the cases and load it as JSON
    headers = {'Authorization': settings.SERVICES_TOKEN}
    snippet = requests.get(
        settings.URL_VSF +
        '/events/api/blocked_sites/',
        headers=headers)
    data = json.loads(snippet.text)

    # Create the HttpResponse object with the appropriate CSV header.
    response = HttpResponse(content_type='text/csv')
    response[
        'Content-Disposition'] = 'attachment; filename="BlockedSitesTable.csv"'

    # CSV header.
    writer = csv.writer(response)
    writer.writerow(['Fecha descarga', 'Site', 'Domains'])
    # count is the total of cases to be shown.
    # result is where the information is located in the JSON
    result = data['results']
    count = data["count"] - 1

    # Load all the information of each result in a CVS row
    while (count > -1):
        site = result[count]['name']

        domains = result[count]['domains']

        countDomains = 0
        domainsList = ""
        for domain in domains:
            if countDomains > 0:
                domainsList = domainsList + ";" + "ID:" + \
                    str(domain["id"]) + ", url: " + domain["url"]
            else:
                domainsList = "ID:" + \
                    str(domain["id"]) + ", url: " + domain["url"]

        countDomains = countDomains + 1

        download_date = datetime.datetime.now().date()

        writer.writerow([download_date, site, domainsList])
        count = count - 1

    return response


class BlockedUrlsSites(TemplateView):
    """ This view renders the HTML containing information about the blocked
    sites and domains."""
    template_name = "blocked-sites_domains.html"


class CaseList(TemplateView):
    """ This view renders the HTML containing information
    about list of cases """
    template_name = "list-cases.html"


class CaseListAdvanced(TemplateView):
    """ This view renders the HTML containing information
    about list of cases """
    template_name = "list-cases-advanced.html"


class CaseListApi(APIView):
    """ This view obtains the list of cases json data from the API
    of the Pandora project """

    def get(self, request, format=None):
        headers = {'Authorization': settings.SERVICES_TOKEN}
        snippet = requests.get(
            settings.URL_VSF +
            '/cases/api/list-case-filter/',
            headers=headers)
        return Response(snippet)

    def post(self, request, format=None):
        title = request.data["title"]
        region = request.data["region"]
        category = request.data["category"]
        start_date = request.data["start_date"]
        end_date = request.data["end_date"]
        isp = request.data["isp"]
        site = request.data["site"]

        headers = {'Authorization': settings.SERVICES_TOKEN}
        snippet = requests.get(
            settings.URL_VSF +
            '/cases/api/list-case-filter/?title=' +
            title +
            "&category=" +
            category +
            '&start_date=' +
            start_date +
            '&end_date=' +
            end_date +
            '&region=' +
            region +
            '&site=' +
            site +
            '&isp=' +
            isp,
            headers=headers)
        return Response(snippet)


class Dashboard(TemplateView):
    """ This view renders the HTML containing the dashboard """
    template_name = "dashboard.html"


class MapVenezuela(TemplateView):
    """ This view renders the HTML containing information
    about map with its cases per region."""
    template_name = "maps/venezuela.html"


class MapApi(APIView):
    """ This view obtains the maps json data from the API
    of the Pandora project """

    def get(self, request, format=None):
        headers = {'Authorization': settings.SERVICES_TOKEN}
        snippet = requests.get(
            settings.URL_VSF +
            '/cases/api/list/region/',
            headers=headers)
        return Response(snippet)


def MapTableCVS(request):
    """ This view takes list of the cases per region and its total per region
     and exports it to a CVS file."""
    # Get the list of all the cases and load it as JSON
    headers = {'Authorization': settings.SERVICES_TOKEN}
    snippet = requests.get(
        settings.URL_VSF +
        '/cases/api/list/region/',
        headers=headers)
    data = json.loads(snippet.text)

    # Create the HttpResponse object with the appropriate CSV header.
    response = HttpResponse(content_type='text/csv')
    response[
        'Content-Disposition'] = ('attachment;' +
                                  'filename="BlockedSitesPerRegion.csv"')

    # CSV header.
    writer = csv.writer(response)
    writer.writerow(['Fecha descarga', 'Region', 'Numero de casos', 'Casos'])
    # count is the total of cases to be shown.
    # result is where the information is located in the JSON
    result = data['results']
    count = data["count"] - 1

    # Load all the information of each result in a CVS row
    while (count > -1):
        region = result[count]['name']
        number_cases = result[count]['number_cases']

        cases = result[count]['cases']

        countCases = 0
        casesList = ""
        for case in cases:
            if countCases > 0:
                casesList = casesList + ";" + "ID:" + \
                    str(case["id"]) + ", Title: " + case["title"] + \
                    ", Category: " + case['category']
            else:
                casesList = "ID:" + \
                    str(case["id"]) + ", Title: " + case["title"] + \
                    ", Category: " + case['category']

        countCases = countCases + 1

        download_date = datetime.datetime.now().date()

        writer.writerow([download_date, region, number_cases, casesList])
        count = count - 1

    return response


def SearchResultCVS(request):
    """ This view takes list of all the cases and exports it to a CVS file. """
    # Get the list of all the cases and load it as JSON
    headers = {'Authorization': settings.SERVICES_TOKEN}
    snippet = requests.get(
        settings.URL_VSF +
        '/cases/api/list-case-filter',
        headers=headers)
    data = json.loads(snippet.text)
    print data
    # Create the HttpResponse object with the appropriate CSV header.
    response = HttpResponse(content_type='text/csv')
    response[
        'Content-Disposition'] = 'attachment; filename="SearchResults.csv"'

    # CSV header.
    writer = csv.writer(response)
    writer.writerow(['Fecha descarga',
                     'Fecha inicio',
                     'Fecha final',
                     'Titulo',
                     'Descripcion',
                     'Categoria',
                     'Eventos',
                     'ISP',
                     'Region',
                     'Dominios',
                     'Twitter Search Word'])

    # count is the total of cases to be shown.
    # result is where the information is located in the JSON
    result = data['results']
    count = data["count"] - 1

    # Load all the information of each result in a CVS row
    while (count > -1):

        start_date = result[count]['start_date']
        end_date = result[count]['end_date']
        description = result[count]['description']
        title = result[count]['title']
        category = result[count]['category']

        events = result[count]['events']
        countEvent = 0
        eventList = ""
        for event in events:
            if countEvent > 0:
                eventList = eventList + "," + event
            else:
                eventsList = event

            countEvent = countEvent + 1

        isps = result[count]['isp']
        countIsp = 0
        ispList = ""
        for isp in isps:
            if countIsp > 0:
                ispList = ispList + "," + isp
            else:
                ispList = isp

            countIsp = countIsp + 1

        regions = result[count]['region']
        countRegion = 0
        regionList = ""
        for region in regions:
            if countRegion > 0:
                regionList = regionList + "," + region
            else:
                regionList = region

            countRegion = countRegion + 1

        domains = result[count]['domains']
        countDomain = 0
        domainList = ""
        for domain in domains:
            if countDomain > 0:
                domainList = domainList + "," + \
                    domain["site"] + ": " + domain["url"]
            else:
                domainList = domain["site"] + ": " + domain["url"]

            countDomain = countDomain + 1

        twitter_search = result[count]['twitter_search']

        download_date = datetime.datetime.now().date()

        writer.writerow([download_date,
                         start_date,
                         end_date,
                         title,
                         description,
                         category,
                         eventsList,
                         ispList,
                         regionList,
                         domainList,
                         twitter_search])
        count = count - 1

    return response


def SearchResultFilterCVS(
        request, title, region, category, e_day, s_day, e_month,
        s_month, e_year, s_year):
    """ This view takes list of filtered cases
    and exports it to a CVS file. """
    # Loads the URL values for the filter
    if e_day != "":
        end_date = s_year + "-" + s_month + "-" + s_day
    else:
        end_date = ""
    if s_day != "":
        start_date = e_year + "-" + e_month + "-" + e_day
    else:
        start_date = ""

    # Get the list of all the cases and load it as JSON
    headers = {'Authorization': settings.SERVICES_TOKEN}
    snippet = requests.get(
        settings.URL_VSF +
        '/cases/api/list-case-filter/?title=' +
        title +
        "&category=" +
        category +
        '&start_date=' +
        start_date +
        '&end_date=' +
        end_date +
        '&region=' +
        region,
        headers=headers)
    data = json.loads(snippet.text)

    # Create the HttpResponse object with the appropriate CSV header.
    response = HttpResponse(content_type='text/csv')
    response[
        'Content-Disposition'] = 'attachment; filename="SearchResults.csv"'

    # CSV header
    writer = csv.writer(response)
    writer.writerow(['Fecha descarga',
                     'Fecha inicio',
                     'Fecha final',
                     'Titulo',
                     'Descripcion',
                     'Categoria',
                     "Eventos",
                     "ISP",
                     "Region",
                     "Dominios"])

    # count is the total of cases to be shown.
    # result is where the information is located in the JSON
    result = data['results']
    count = data["count"] - 1

    # Load all the information of each result in a CVS row
    while (count > -1):

        start_date = result[count]['start_date']
        end_date = result[count]['end_date']
        description = result[count]['description']
        title = result[count]['title']
        category = result[count]['category']

        events = result[count]['events']
        countEvent = 0
        eventList = ""
        for event in events:
            if countEvent > 0:
                eventList = eventList + "," + event
            else:
                eventsList = event

            countEvent = countEvent + 1

        isps = result[count]['isp']
        countIsp = 0
        ispList = ""
        for isp in isps:
            if countIsp > 0:
                ispList = ispList + "," + isp
            else:
                ispList = isp

            countIsp = countIsp + 1

        regions = result[count]['region']
        countRegion = 0
        regionList = ""
        for region in regions:
            if countRegion > 0:
                regionList = regionList + "," + region
            else:
                regionList = region

            countRegion = countRegion + 1

        domains = result[count]['domains']
        countDomain = 0
        domainList = ""
        for domain in domains:
            if countDomain > 0:
                domainList = domainList + "," + \
                    domain["site"] + ": " + domain["url"]
            else:
                domainList = domain["site"] + ": " + domain["url"]

            countDomain = countDomain + 1

        twitter_search = result[count]['twitter_search']
        download_date = datetime.datetime.now().date()

        writer.writerow([download_date,
                         start_date,
                         end_date,
                         title,
                         description,
                         category,
                         eventsList,
                         ispList,
                         regionList,
                         domainList,
                         twitter_search])
        count = count - 1

    return response


class searchTwitterApi(APIView):
    """ This view obtains the tweets from one case from a twitter search  """

    def get(self, request, twitterSearch="", format=None):
        # Use the Access Token to make an API request

        timeline_request = urllib2.Request(
            "https://api.twitter.com/1.1/search/tweets.json?q=" +
            urlquote(twitterSearch))
        timeline_request.add_header(
            "Authorization",
            "Bearer %s" %
            settings.ACCESS_TOKEN)

        timeline_response = urllib2.urlopen(timeline_request)
        timeline_contents = timeline_response.read()
        timeline_data = json.loads(timeline_contents)

        # print json.dumps(timeline_data, indent=2, sort_keys=True)
        return Response(timeline_data)
