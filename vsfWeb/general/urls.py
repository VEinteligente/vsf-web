from django.conf.urls import url

from general.views import (Dashboard, AboutUs, BlockedSitesApi, BlockedDomainsApi, BlockedUrlsSites, MapApi, MapVenezuela,
                           CaseList, CaseListApi)


urlpatterns = [
    url(r'^dashboard$',Dashboard.as_view(), name="Dashboard"),
    url(r'^about-us$',AboutUs.as_view(), name="AboutUs"),
    url(r'^blocked-sites-api$',BlockedSitesApi.as_view(),name="BlockedSitesApi"),
    url(r'^blocked-domains-api$',BlockedDomainsApi.as_view(),name="BlockedDomainsApi"),
    url(r'^blocked-domains_sites$',BlockedUrlsSites.as_view(), name="BlockedUrlsSites"),
    url(r'^map-Venezuela',MapVenezuela.as_view(), name="MapVenezuela"),
    url(r'^map-api',MapApi.as_view(), name="MapApi"),
    url(r'^list-cases',CaseList.as_view(), name="CaseList"),
    url(r'^cases-api',CaseListApi.as_view(), name="CaseListApi"),
    url(r'^cases-api/filter=(?P<title>)',CaseListApi.as_view(), name="CaseListApi"),
] 