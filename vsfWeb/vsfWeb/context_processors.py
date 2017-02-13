from django.conf import settings


def global_settings(request):
    # return any necessary values
    return {
        'URL_VSF': settings.URL_VSF,
        'URL_VSF_WEB': settings.URL_VSF_WEB
    }
