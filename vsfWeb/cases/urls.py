from django.conf.urls import url

from cases.views import (OneElementCase, MultipleElementsCase, SpeedTestCase)


urlpatterns = [
    url(r'^multiple-elements-case$',MultipleElementsCase.as_view()),
    url(r'^one-element-case$',OneElementCase.as_view()),
    url(r'^speed-test-case$',SpeedTestCase.as_view()),    

] 