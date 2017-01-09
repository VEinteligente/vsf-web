from django.conf.urls import url

from cases.views import (OneElementCase, OneElementCaseApi, MultipleElementsCase, GanttEvents, GanttEventsApi, SpeedTestCase)


urlpatterns = [
    url(r'^multiple-elements-case$',MultipleElementsCase.as_view()),
    url(r'^one-element-case/(?P<pk>\d+)/$',OneElementCase.as_view()),
    url(r'^one-element-case-api$',OneElementCaseApi.as_view(), name ="OneElementCaseApi"),
    url(r'^speed-test-case$',SpeedTestCase.as_view()),    
    url(r'^gantt$',GanttEvents.as_view(), name="ganttEvents"),  
    url(r'^gantt-api$',GanttEventsApi.as_view(), name="ganttEventsApi"),  

] 