"""vsfWeb URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^cases/', include('cases.urls', namespace="Cases")),
    url(r'^commons/', include('commons.urls', namespace="Commons")),
    url(r'^general/', include('general.urls', namespace="General")),
    url(r'^provider/', include('provider.urls', namespace="Provider")),
    url(r'^summary/', include('summary.urls', namespace="Summary")),
    url(r'^styling-guide/', include('stylingGuide.urls', namespace="StylingGuide")),
    url(r'^i18n/',include('django.conf.urls.i18n')),
]
