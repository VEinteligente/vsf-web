from django.conf.urls import url

from cases.views import (OneElementCase, MultipleElementsCase, GanttEvents, GanttEventsApi, SpeedTestCase)


urlpatterns = [
    url(r'^multiple-elements-case$',MultipleElementsCase.as_view()),
    url(r'^one-element-case$',OneElementCase.as_view()),
    url(r'^speed-test-case$',SpeedTestCase.as_view()),    
    url(r'^gantt$',GanttEvents.as_view(), name="ganttEvents"),  
    url(r'^gantt-api$',GanttEventsApi.as_view(), name="ganttEventsApi"),  

] 