from django.conf.urls import url

from general.views import (Dashboard, AboutUs, BlockedSites, BlockedUrls, CaseList)


urlpatterns = [
    url(r'^dashboard$',Dashboard.as_view()),
    url(r'^about-us$',AboutUs.as_view()),
    url(r'^blocked-sites$',BlockedSites.as_view()),
    url(r'^blocked-urls$',BlockedUrls.as_view()),
    url(r'^case-list$',CaseList.as_view()),




] 