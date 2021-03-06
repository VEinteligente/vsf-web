from django.conf.urls import url


from views import (
    ListCases,
    SummaryTable,
    SummaryCategoryTableCVS,
    SummaryISPTableCVS,
    MeasurementsTable,
    MeasurementsTableCVS,
    SummaryCategoryTableApi,
    SummaryIspTableApi,
    MeasurementsTableApi)


urlpatterns = [
    url(r'^list-cases$', ListCases.as_view()),
    url(r'^summary-table$', SummaryTable.as_view()),
    url(r'^measurements-table/(?P<pk>\d+)/$',
        MeasurementsTable.as_view(),
        name="MeasurementsTable"),
    url(r'^summary-category-api$',
        SummaryCategoryTableApi.as_view(),
        name="SummaryCategoryTableApi"),
    url(r'^summary-isp-api$',
        SummaryIspTableApi.as_view(),
        name="SummaryIspTableApi"),
    url(r'^summary-measurement-api/(?P<pk>\d+)$',
        MeasurementsTableApi.as_view(),
        name="MeasurementsTableApi"),
    url(r'^summary-measurement-excel/(?P<pk>\d+)$',
        MeasurementsTableCVS,
        name="ExcelMeasurementList"),
    url(r'^summary-isp-excel/$', SummaryISPTableCVS, name="ExcelISPList"),
    url(r'^summary-category-excel/$',
        SummaryCategoryTableCVS,
        name="ExcelCategoryList"),
]
