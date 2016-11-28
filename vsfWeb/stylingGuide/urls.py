from django.conf.urls import url

from stylingGuide.views import (Typography)


urlpatterns = [
    url(r'^typography',Typography.as_view()),
] 