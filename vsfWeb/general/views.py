import json
import requests
import datetime

from django.shortcuts import render

from django.views.generic import (TemplateView)

from rest_framework.views import APIView
from rest_framework.response import Response
from django.template.defaultfilters import title

import csv
from django.http import HttpResponse

from django.conf import settings




# This view renders the HTML containing information about the company, social network, etc. 
class AboutUs( TemplateView ):
    template_name = "about-us.html"

# This view obtains the blocked sites json data from the API of the Pandora project
class BlockedSitesApi( APIView ):
   
   def get( self, request, format = None ):
       headers = {'Authorization': settings.SERVICES_TOKEN}
       snippet = requests.get( 'http://127.0.1:8001/events/api/blocked_sites/', headers = headers) 
       return Response( snippet )

# This view obtains the blocked domains json data from the API of the Pandora project
class BlockedDomainsApi( APIView ):
   
   def get( self, request, format = None ):
       headers = {'Authorization': settings.SERVICES_TOKEN}
       snippet = requests.get( 'http://127.0.1:8001/events/api/blocked_domains/', headers = headers )
       return Response( snippet )

# This view renders the HTML containing information about the blocked sites and domains.
class BlockedUrlsSites( TemplateView ):
    template_name = "blocked-sites_domains.html"

  
# This view renders the HTML containing information about list of cases
class CaseList( TemplateView ):
    template_name = "list-cases.html"      
    
# This view renders the HTML containing information about list of cases
class CaseListAdvanced( TemplateView ):
    template_name = "list-cases-advanced.html"  
    
# This view obtains the list of cases json data from the API of the Pandora project  
class CaseListApi( APIView ):
    
   def get( self, request, format = None ):  
       headers = {'Authorization': settings.SERVICES_TOKEN}
       snippet = requests.get('http://127.0.0.1:8001/cases/api/list-case-filter/', headers=headers)    
       return Response( snippet )
   
   def post( self, request, format = None ):
       title = request.data["title"]
       region = request.data["region"]
       category = request.data["category"]
       start_date = request.data["start_date"]
       end_date = request.data["end_date"]
       isp = request.data["isp"]
       site =  request.data["site"]
       
       headers = {'Authorization': settings.SERVICES_TOKEN}
       snippet = requests.get( 'http://127.0.1:8001/cases/api/list-case-filter/?title=' + title + "&category=" + category + '&start_date=' + start_date + '&end_date=' + end_date + '&region=' + region + '&site=' + site + '&isp=' + isp , headers = headers )
       return Response(snippet)

# This view renders the HTML containing the dashboard
class Dashboard( TemplateView ):
    template_name = "dashboard.html"

# This view renders the HTML containing information about map with its cases per region.
class MapVenezuela( TemplateView ):
    template_name = "maps/venezuela.html"

# This view obtains the maps json data from the API of the Pandora project  
class MapApi( APIView ):
       
   def get( self, request, format = None ):
       headers = {'Authorization': settings.SERVICES_TOKEN}
       snippet = requests.get( 'http://127.0.1:8001/cases/api/list/region/' , headers = headers )       
       return Response( snippet )

# This view takes list of all the cases and exports it to a CVS file.
def SearchResultCVS( request ):
    
    # Get the list of all the cases and load it as JSON
    headers = {'Authorization': settings.SERVICES_TOKEN}
    snippet = requests.get( 'http://127.0.1:8001/cases/api/list-case-filter' , headers = headers )
    data = json.loads( snippet.text )
    print data 
    # Create the HttpResponse object with the appropriate CSV header.
    response = HttpResponse( content_type='text/csv' )
    response['Content-Disposition'] = 'attachment; filename="SearchResults.csv"'
    
    # CSV header.
    writer = csv.writer(response)
    writer.writerow(['Fecha inicio', 'Fecha final', 'Titulo', 'Descripcion', 'Categoria', 'Eventos', 'ISP', 'Region', 'Dominios'])

    # count is the total of cases to be shown.
    # result is where the information is located in the JSON
    result = data['results']
    count = data["count"]-1
    
    # Load all the information of each result in a CVS row
    while ( count > -1 ):

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
            if countIsp>0:
                ispList = ispList + "," + isp
            else:
                ispList = isp
            
            
            countIsp = countIsp + 1 
            
        regions = result[count]['region']
        countRegion = 0
        regionList = ""
        for region in regions:
            if countRegion>0:
                regionList = regionList + "," + region
            else:
                regionList = region
            
            
            countRegion = countRegion + 1 
            
        domains = result[count]['domains']
        countDomain = 0
        domainList = ""
        for domain in domains:
            if countDomain>0:
                domainList = domainList + "," + domain["site"] + ": " + domain["url"] 
            else:
                domainList = domain["site"] + ": " + domain["url"] 
            
            
            countDomain = countDomain + 1 
        
        writer.writerow([start_date, end_date, title, description, category, eventsList, ispList, regionList, domainList])
        count = count - 1     
    
   
    return response  

# This view takes list of filtered cases and exports it to a CVS file.
def SearchResultFilterCVS( request, title, region, category, e_day, s_day, e_month, s_month, e_year, s_year ):
    
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
    snippet = requests.get( 'http://127.0.1:8001/cases/api/list-case-filter/?title=' + title + "&category=" + category + '&start_date=' + start_date + '&end_date=' + end_date + '&region=' + region , headers = headers )
    data = json.loads( snippet.text )

    # Create the HttpResponse object with the appropriate CSV header.
    response = HttpResponse( content_type='text/csv' )
    response['Content-Disposition'] = 'attachment; filename="SearchResults.csv"'
    
    # CSV header
    writer = csv.writer(response)
    writer.writerow(['Fecha inicio', 'Fecha final', 'Titulo', 'Descripcion', 'Categoria', "Eventos", "ISP", "Region", "Dominios"])

    # count is the total of cases to be shown.
    # result is where the information is located in the JSON     
    result = data['results']
    count = data["count"]-1
    
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
            if countEvent>0:
                eventList = eventList + "," + event
            else:
                eventsList = event
            
            
            countEvent = countEvent + 1 
            
            
        isps = result[count]['isp']
        countIsp = 0
        ispList = ""
        for isp in isps:
            if countIsp>0:
                ispList = ispList + "," + isp
            else:
                ispList = isp
            
            
            countIsp = countIsp + 1 
            
        regions = result[count]['region']
        countRegion = 0
        regionList = ""
        for region in regions:
            if countRegion>0:
                regionList = regionList + "," + region
            else:
                regionList = region
            
            
            countRegion = countRegion + 1 
            
        domains = result[count]['domains']
        countDomain = 0
        domainList = ""
        for domain in domains:
            if countDomain>0:
                domainList = domainList + "," + domain["site"] + ": " + domain["url"] 
            else:
                domainList = domain["site"] + ": " + domain["url"] 
            
            
            countDomain = countDomain + 1 
        
        writer.writerow([start_date, end_date, title, description, category, eventsList, ispList, regionList, domainList])
        count = count - 1
            
    
   
    return response    
