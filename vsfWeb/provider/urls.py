from django.conf.urls import url

from provider.views import (CANTV, Digitel, Inter, Movistar, Supercable)


urlpatterns = [
    url(r'^CANTV$',CANTV.as_view()),
    url(r'^Digitel$',Digitel.as_view()),
    url(r'^Inter$',Inter.as_view()),
    url(r'^Movistar',Movistar.as_view()),
    url(r'^Supercable',Supercable.as_view()),
] 