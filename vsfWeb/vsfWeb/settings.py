"""
Django settings for vsfWeb project.

Generated by 'django-admin startproject' using Django 1.10.3.

For more information on this file, see
https://docs.djangoproject.com/en/1.10/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.10/ref/settings/
"""
from django.utils.translation import ugettext_lazy as _
import local_settings
import os


import base64
import json
import urllib2
# Setup access credentials

CONSUMER_KEY = local_settings.CONSUMER_KEY
CONSUMER_SECRET = local_settings.CONSUMER_SECRET

bearer_token = "%s:%s" % (CONSUMER_KEY, CONSUMER_SECRET)

bearer_token_64 = base64.b64encode(bearer_token)

token_request = urllib2.Request("https://api.twitter.com/oauth2/token")
token_request.add_header(
    "Content-Type",
    "application/x-www-form-urlencoded;charset=UTF-8")
token_request.add_header("Authorization", "Basic %s" % bearer_token_64)
token_request.data = "grant_type=client_credentials"

token_response = urllib2.urlopen(token_request)
token_contents = token_response.read()
token_data = json.loads(token_contents)

ACCESS_TOKEN = token_data["access_token"]

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.10/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'dh96m6zsamw9#&%z758vm9(@j^!o@k(5(^&p8la2r(qy&^qmmy'

DEBUG = local_settings.DEBUG
SERVICES_TOKEN = local_settings.SERVICES_TOKEN

URL_VSF_WEB = local_settings.URL_VSF_WEB
URL_VSF = local_settings.URL_VSF

BLOCKED_DPI = "#FF2114"
BLOCKED_DNS = "#8C120B"
BLOCKED_IP = "#FF857E"
TRAFFIC_INTERCEPTION = "#EAE70B"
FAILURE_DNS = "#2AA8E1"
INTERNET_SPEED = "#8CA63F"
TRAFFIC_ALTERATION = "#AAD2BA"
OTHERS = "#273469"


ALLOWED_HOSTS = []

# Cronjobs
CRON_CLASSES = [
    "vsfWeb.cron.ScreenshotCronjob",
]

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_cron',
    'compressor',
    'rest_framework',
    'widget_tweaks',
]
STATICFILES_FINDERS = (
    'compressor.finders.CompressorFinder',
)
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # Middleware For Translating Pages For End User
    'django.middleware.locale.LocaleMiddleware',
]

ROOT_URLCONF = 'vsfWeb.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'cases/templates'),
                 os.path.join(BASE_DIR, 'commons/templates'),
                 os.path.join(BASE_DIR, 'general/templates'),
                 os.path.join(BASE_DIR, 'provider/templates'),
                 os.path.join(BASE_DIR, 'summary/templates'),
                 os.path.join(BASE_DIR, 'stylingGuide/templates'),
                 ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'vsfWeb.context_processors.global_settings',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'vsfWeb.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.10/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/1.10/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.' +
        'UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.' +
        'MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.' +
        'CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.' +
        'NumericPasswordValidator',
    },
]

STATICFILES_FINDERS = (
    'compressor.finders.CompressorFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "commons/static")
]

COMPRESS_PRECOMPILERS = (
    ('text/x-sass', 'sass {infile} {outfile}'),
)
# Internationalization
# https://docs.djangoproject.com/en/1.10/topics/i18n/

LANGUAGE_CODE = 'es'

LANGUAGES = (
    ('en', _('English')),
    ('es', _('Spanish')),
)

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.10/howto/static-files/
COMPRESS_ROOT = 'commons/static'
STATIC_ROOT = 'commons/static'
STATIC_URL = '/commons/static/'
LOCALE_PATHS = (os.path.join(BASE_DIR, 'locale'),)
