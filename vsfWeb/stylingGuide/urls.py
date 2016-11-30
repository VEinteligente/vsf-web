from django.conf.urls import url

from stylingGuide.views import (Typography, Elements)


urlpatterns = [
    url(r'^typography',Typography.as_view()),
    url(r'^elements',Elements.as_view()),
] 