from django.conf.urls import url

from summary.views import (ListCases, SummaryTable, MeasurementsTable)


urlpatterns = [
    url(r'^list-cases$',ListCases.as_view()),
    url(r'^summary-table$',SummaryTable.as_view()),
    url(r'^measurements-table$',MeasurementsTable.as_view()),
] 