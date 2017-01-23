from django.conf.urls import url


from summary.views import (ListCases, SummaryTable, MeasurementsTable, SummaryCategoryTableApi, SummaryIspTableApi, MeasurementsTableApi)



urlpatterns = [
    url(r'^list-cases$',ListCases.as_view()),
    url(r'^summary-table$',SummaryTable.as_view()),
    url(r'^measurements-table/(?P<pk>\d+)/$',MeasurementsTable.as_view()),
    url(r'^summary-category-api$',SummaryCategoryTableApi.as_view(), name="SummaryCategoryTableApi"),
    url(r'^summary-isp-api$',SummaryIspTableApi.as_view(), name="SummaryIspTableApi"),
    url(r'^summary-measurement-api/(?P<pk>\d+)/$',MeasurementsTableApi.as_view(), name="MeasurementsTableApi"),

] 