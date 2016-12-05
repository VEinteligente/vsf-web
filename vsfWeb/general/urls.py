from django.conf.urls import url

from general.views import (Dashboard, AboutUs, BlockedSitesApi, BlockedDomainsApi, BlockedUrlsSites)


urlpatterns = [
    url(r'^dashboard$',Dashboard.as_view(), name="Dashboard"),
    url(r'^about-us$',AboutUs.as_view(), name="AboutUs"),
    url(r'^blocked-sites-api$',BlockedSitesApi.as_view(),name="BlockedSitesApi"),
    url(r'^blocked-domains-api$',BlockedDomainsApi.as_view(),name="BlockedDomainsApi"),
    url(r'^blocked-domains_sites$',BlockedUrlsSites.as_view(), name="BlockedUrlsSites"),
] 