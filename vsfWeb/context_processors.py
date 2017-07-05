from django.conf import settings


def global_settings(request):
    # return any necessary values
    return {
        'URL_VSF': settings.URL_VSF,
        'URL_VSF_WEB': settings.URL_VSF_WEB,
        'BLOCKED_DPI': settings.BLOCKED_DPI,
        'BLOCKED_DNS': settings.BLOCKED_DNS,
        'BLOCKED_IP': settings.BLOCKED_IP,
		'TRAFFIC_INTERCEPTION': settings.TRAFFIC_INTERCEPTION,	
		'FAILURE_DNS': settings.FAILURE_DNS,
		'INTERNET_SPEED': settings.INTERNET_SPEED,
		'TRAFFIC_ALTERATION': settings.TRAFFIC_ALTERATION,
		'OTHERS': settings.OTHERS
    }
