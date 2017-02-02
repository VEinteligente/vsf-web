from django.conf.urls import url

from views import (
    CaseCVS,
    CasePdf,
    OneElementCase,
    OneElementCaseApi,
    OneElementCaseUpdateApi,
    GanttEvents,
    GanttEventsApi,
    MultipleElementsCase,
    SpeedTestCase)


urlpatterns = [
    url(r'^one-element-case/(?P<pk>\d+)/$',
        OneElementCase.as_view(),
        name="OneElementCase"),
    url(r'^case-excel/$', CaseCVS, name="ExcelCaseCVSEmpty"),
    url(r'^case-excel/id=(?P<pk>\d+)/$', CaseCVS, name="ExcelCaseCVS"),
    url(r'^case-pdf/id=(?P<pk>\d+)/$', CasePdf, name="CasePdf"),
    url(r'^case-pdf/$', CasePdf, name="CasePdfEmpty"),
    url(r'^one-element-case-api/(?P<pk>\d+)/$',
        OneElementCaseApi.as_view(),
        name="OneElementCaseApi"),
    url(r'^one-element-case-update-api/(?P<pk>\d+)/$',
        OneElementCaseUpdateApi.as_view(),
        name="OneElementCaseUpdateApi"),
    url(r'^gantt$', GanttEvents.as_view(), name="ganttEvents"),
    url(r'^gantt-api$', GanttEventsApi.as_view(), name="ganttEventsApi"),
    url(r'^multiple-elements-case$',
        MultipleElementsCase.as_view(),
        name="MultipleElementsCase"),
    url(r'^speed-test-case$', SpeedTestCase.as_view(), name="SpeedTestCase"),
]
