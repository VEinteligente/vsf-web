from django.conf.urls import url

from stylingGuide.views import (Typography, Elements, List, ListApi, MapVenezuela)


urlpatterns = [
    url(r'^typography',Typography.as_view()),
    url(r'^elements',Elements.as_view()),
    url(r'^list',List.as_view(), name="List"),
    url(r'^map-Venezuela',MapVenezuela.as_view(), name="MapVenezuela"),
    url(r'^list-api',ListApi.as_view(), name="ListApi"),
] 