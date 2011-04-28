from django.conf.urls.defaults import *
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = patterns('',
    (r'^/?$', 'django.views.generic.simple.direct_to_template', {'template': 'index.html'}),
    (r'^api/login/?$', 'somero.views.login'),
    (r'^profil/?$',  'django.views.generic.simple.direct_to_template', {'template': 'profil.html'}),
    (r'^logout/?$',  'django.contrib.auth.views.logout_then_login'),
    (r'^api/modifica/parola?$', 'somero.views.parola'),
    (r'^api/modifica/email?$', 'somero.views.email'),
    (r'^api/modifica/judet?$', 'somero.views.judet'),
    (r'^api/job/adauga?$', 'somero.views.add'),
    (r'^api/job/scoate?$', 'somero.views.ScoateJobs'),
)

urlpatterns += staticfiles_urlpatterns()
