from django.conf.urls import url

from summary.views import (ListCases, SummaryTable )


urlpatterns = [
    url(r'^list-cases$',ListCases.as_view()),
    url(r'^summary-table$',SummaryTable.as_view()),
] 