from django.conf.urls import url

from cases.views import (OneElementCase, MultipleElementsCase, SpeedTestCase, CaseList, OneElementCaseApi)


urlpatterns = [
    url(r'^case-list$',CaseList.as_view()),
    url(r'^multiple-elements-case$',MultipleElementsCase.as_view()),
    url(r'^one-element-case/(?P<pk>\d+)/$',OneElementCase.as_view()),
    url(r'^one-element-case-api$',OneElementCaseApi.as_view(), name ="OneElementCaseApi"),
    url(r'^speed-test-case$',SpeedTestCase.as_view()),



] 