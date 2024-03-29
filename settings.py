import os
DEBUG = True
TEMPLATE_DEBUG = DEBUG

ADMINS = (
    # ('Your Name', 'your_email@domain.com'),
)

FACEBOOK_ACCESS_SETTINGS = {
        "FACEBOOK_APP_ID": '124430930971021',
        "FACEBOOK_APP_SECRET": 'fff0f1aa0df1d4ed6894759ce3faef5c',
        # The following keys are optional
        # "CALLBACK": "la_facebook.callbacks.default.default_facebook_callback",
        # "PROVIDER_SCOPE": ['email','read_stream'],
        # "LOG_LEVEL": "DEBUG",
        # "LOG_FILE": "/tmp/la_facebook.log",
}
MANAGERS = ADMINS

DATABASES = {
    'default': {
        'ENGINE': 'mysql', # Add 'postgresql_psycopg2', 'postgresql', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'somer',                      # Or path to database file if using sqlite3.
        'USER': 'root',                      # Not used with sqlite3.
        'PASSWORD': 'seleus00',                  # Not used with sqlite3.
        'HOST': '',                      # Set to empty string for localhost. Not used with sqlite3.
        'PORT': '',                      # Set to empty string for default. Not used with sqlite3.
    }
}

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# On Unix systems, a value of None will cause Django to use the same
# timezone as the operating system.
# If running in a Windows environment this must be set to the same as your
# system time zone.
TIME_ZONE = 'America/Chicago'

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = 'en-us'

SITE_ID = 1

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# If you set this to False, Django will not format dates, numbers and
# calendars according to the current locale
USE_L10N = True

PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))
STATIC_URL = '/static/'
STATIC_ROOT = os.path.abspath(os.path.join(PROJECT_ROOT, '', 'static'))

MEDIA_ROOT = os.path.abspath(os.path.join(PROJECT_ROOT, '', 'site_media', 'media'))
MEDIA_URL = '/site_media/media/'

STATICFILES_MEDIA_DIRNAMES = ('static',)

COMPRESS_STORAGE = "staticfiles.storage.StaticFileStorage"

LOGIN_URL = '/'
LOGIN_REDIRECT_URL = '/'
# Make this unique, and don't share it with anybody.
SECRET_KEY = 'c313s%dndtn5#hoi1g9-)8t%^^o(ug(n*h+nif2g=k@csk&3#0'
TEMPLATE_CONTEXT_PROCESSORS = (
    'django.core.context_processors.debug',
    'django.core.context_processors.i18n',
    'django.core.context_processors.media',
    'django.contrib.auth.context_processors.auth',
    'django.contrib.messages.context_processors.messages',
)
# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
#     'django.template.loaders.eggs.Loader',
)


MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
     
)


ROOT_URLCONF = 'somer.urls'

TEMPLATE_DIRS = ('somero/templates',)

INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    # Uncomment the next line to enable the admin:
    # 'django.contrib.admin',
    # Uncomment the next line to enable admin documentation:
    # 'django.contrib.admindocs',
    'somer.somero',
    'django.contrib.staticfiles',
    'somer.somero.utils',
    'la_facebook',
)
