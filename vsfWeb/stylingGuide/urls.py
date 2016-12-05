from django.conf.urls import url

from stylingGuide.views import (Typography, Elements, List, ListApi)


urlpatterns = [
    url(r'^typography',Typography.as_view()),
    url(r'^elements',Elements.as_view()),
    url(r'^list',List.as_view(), name="List"),
    url(r'^list-api',ListApi.as_view(), name="ListApi"),
] 