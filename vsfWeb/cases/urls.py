from django.conf.urls import url

from views import (
    CaseCVS,
    CasePdf,
    Case,
    CaseApi,
    CaseUpdateApi,
    GanttEvents,
    GanttEventsApi,
    SpeedTestCase,
    EventsMonth)


urlpatterns = [
    url(r'^case/(?P<pk>\d+)/$',
        Case.as_view(),
        name="Case"),
    url(r'^case-excel/$', CaseCVS, name="ExcelCaseCVSEmpty"),
    url(r'^case-excel/id=(?P<pk>\d+)/$', CaseCVS, name="ExcelCaseCVS"),
    url(r'^case-pdf/id=(?P<pk>\d+)/$', CasePdf, name="CasePdf"),
    url(r'^case-pdf/$', CasePdf, name="CasePdfEmpty"),
    url(r'^case-api/(?P<pk>\d+)/$',
        CaseApi.as_view(),
        name="CaseApi"),
    url(r'^case-update-api/(?P<pk>\d+)/$',
        CaseUpdateApi.as_view(),
        name="CaseUpdateApi"),
    url(r'^gantt/(?P<pk>\d+)$', GanttEvents.as_view(), name="ganttEvents"),
    url(r'^gantt-api/(?P<pk>\d+)$',
        GanttEventsApi.as_view(),
        name="ganttEventsApi"),
    url(r'^events_month-api/(?P<pk>\d+)$',
        EventsMonth.as_view(),
        name="monthEventsApi"),
    url(r'^speed-test-case$', SpeedTestCase.as_view(), name="SpeedTestCase"),
]
