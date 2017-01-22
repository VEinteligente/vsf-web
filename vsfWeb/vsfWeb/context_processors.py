from django.conf import settings


def global_settings(request):
    # return any necessary values
    return {
        'URL_VSF': settings.URL_VSF
    }
