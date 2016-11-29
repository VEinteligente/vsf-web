from django.conf.urls import url

from general.views import (Dashboard, AboutUs)


urlpatterns = [
    url(r'^dashboard$',Dashboard.as_view()),
    url(r'^about-us$',AboutUs.as_view()),

] 