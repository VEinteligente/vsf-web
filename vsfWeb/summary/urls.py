from django.conf.urls import url

from summary.views import (ListCases, SummaryTable, MeasurementsTable, SummaryTableApi, SummaryTableCategoryApi, SummaryTableIspApi)


urlpatterns = [
    url(r'^list-cases$',ListCases.as_view()),
    url(r'^summary-table$',SummaryTable.as_view()),
    url(r'^summary-table-api',SummaryTableApi.as_view()),
    url(r'^measurements-table$',MeasurementsTable.as_view()),
    url(r'^summary-table-category-api',SummaryTableCategoryApi.as_view(), name="SummaryTableCategoryApi"),
    url(r'^summary-table-isp-api',SummaryTableIspApi.as_view(), name="SummaryTableIspApi"),
    
] 