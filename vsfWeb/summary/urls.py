from django.conf.urls import url

from summary.views import (ListCases)


urlpatterns = [
    url(r'^list-cases$',ListCases.as_view()),
] 