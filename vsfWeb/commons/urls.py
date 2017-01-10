from django.conf.urls import url

from commons.views import (loginTwitter)


urlpatterns = [
    url(r'^twitter/$', loginTwitter.as_view(), name = "loginTwitter" ),
]  