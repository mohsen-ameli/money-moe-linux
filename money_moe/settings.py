"""
Django settings for money_moe project.

Generated by 'django-admin startproject' using Django 2.2.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os
import json
from datetime import timedelta
from django.utils.translation import gettext_lazy as _

with open("/etc/config.json") as config_file:
    config = json.load(config_file)

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config.get("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

if not DEBUG:
    ALLOWED_HOSTS = ['99.240.225.244', 'www.zarathustrust.com']
else:
    ALLOWED_HOSTS = ["*"]

# models primary key
DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'

# Application definition

INSTALLED_APPS = [
    "users.apps.UsersConfig",
    "accounts.apps.AccountsConfig",
    "crispy_forms",
    "rosetta",
    "axes",
<<<<<<< HEAD
    "mathfilters",
    "django_countries",
    # "django_elasticsearch_dsl",
=======
    #"mathfilters",
>>>>>>> a0f94bca76d7f4dab04adb7b91d491dac757ccd7
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

MIDDLEWARE = [
    "crum.CurrentRequestUserMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "axes.middleware.AxesMiddleware",
]

AUTHENTICATION_BACKENDS = [
    # AxesBackend should be the first backend in the AUTHENTICATION_BACKENDS list.
    "axes.backends.AxesBackend",
    # Django ModelBackend is the default authentication backend.
    "django.contrib.auth.backends.ModelBackend",
]

ROOT_URLCONF = "money_moe.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ]
        },
    }
]

WSGI_APPLICATION = "money_moe.wsgi.application"


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
    }
}

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]
AUTH_USER_MODEL = "users.CustomUser"

# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "America/Toronto"

USE_I18N = True

USE_L10N = True

USE_TZ = True

# USE_THOUSAND_SEPARATOR = True

LANGUAGES = [("de", _("German")), ("en", _("English"))]

LOCALE_PATHS = [os.path.join(BASE_DIR, "locale/")]

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATIC_ROOT = os.path.join(BASE_DIR, "static")  #'/home/moe/money_moe/static/'
STATIC_URL = "/static/"
# STATICFILES_DIRS = [os.path.join(BASE_DIR, 'staticfiles')]

# Crispy Forms
CRISPY_TEMPLATE_PACK = "bootstrap4"

# CELERY
CELERY_BROKER_URL = config.get("BROKER_URL")
CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_BAKCEND = "amqp://"
CELERY_TIMEZONE = "EST"
CELERY_TASK_TRACK_STARTED = True
# CELERY_TASK_TIME_LIMIT = 30 * 60
CELERYD_PREFETCH_MULTIPLIER = 1

# EMAIL
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = config.get("EMAIL_ID")
EMAIL_HOST_PASSWORD = config.get("EMAIL_PW")
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
# EMAIL_USE_SSL = False

# LOGIN
LOGIN_URL = "/login/"
# LOGIN_REDIRECT_URL = "/"

# ELASTICSEARCH_DSL={
#     'default': {
#         'hosts': 'localhost:8000'
#     },
# }

# AXES LOGIN
AXES_FAILURE_LIMIT = 3
AXES_COOLOFF_TIME = timedelta(minutes=3)
AXES_LOCKOUT_TEMPLATE = "users/login_timeout.html"

# HTTPS settings
if not DEBUG:
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_SSL_REDIRECT = True
    SECURE_HSTS_SECONDS = 2592000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    SECURE_BROWSER_XSS_FILTER = True
    X_FRAME_OPTIONS = "DENY"

# Linod staticfiles
"""DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

LINODE_BUCKET = config.get('LINODE_BUCKET')
LINODE_BUCKET_REGION = config.get('LINODE_BUCKET_REGION')
LINODE_BUCKET_ACCESS_KEY = config.get('LINODE_BUCKET_ACCESS_KEY')
LINODE_BUCKET_SECRET_KEY = config.get('LINODE_BUCKET_SECRET_KEY') 


AWS_S3_ENDPOINT_URL = f'https://{LINODE_BUCKET_REGION}.linodeobjects.com'
AWS_ACCESS_KEY_ID = LINODE_BUCKET_ACCESS_KEY
AWS_SECRET_ACCESS_KEY = LINODE_BUCKET_SECRET_KEY
AWS_S3_REGION_NAME = LINODE_BUCKET_REGION
AWS_S3_USE_SSL = True
AWS_STORAGE_BUCKET_NAME = LINODE_BUCKET
"""

# debug = false debugging
"""LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format' : "[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s",
            'datefmt' : "%d/%b/%Y %H:%M:%S"
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
    },
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'mysite.log',
            'formatter': 'verbose'
        },
    },
    'loggers': {
        'django': {
            'handlers':['file'],
            'propagate': True,
            'level':'DEBUG',
        },
        'MYAPP': {
            'handlers': ['file'],
            'level': 'DEBUG',
        },
    }
} """
