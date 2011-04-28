import hashlib
from django.contrib.auth.models import User
from django.http import *
from django.template import loader,Context
from django.contrib.auth import login as logare
from forms import *
from models import Job
from utils.render import json_response
from django.views.decorators.csrf import csrf_exempt

def index(request):
    t = loader.get_template('base_html.html')
    c = Context({
        'content':'asd'
    })
    return HttpResponse(t.render(c))
def login(request):
    form=UserLogin(data=request.POST)
    if form.is_valid():
        logare(request,form.scoate_user())
        return HttpResponse('ok')
    return HttpResponse(form.errors)
def profil(request):
    return HttpResponse()
def parola(request):
    form=ModificaParola(data=request.POST)
    if form.is_valid():
        users=User.objects.get(username=request.user.username)
        users.set_password(request.POST['parola1'])
        users.save()
        return HttpResponse('ok')
    else:
        return HttpResponse('lol!')
def email(request):
    form = ModificaEmail(data=request.POST)
    if form.is_valid():
        user=User.objects.get(username=request.user.username)
        user.email=request.POST['email']
        user.save()
        return HttpResponse('ok')
    else:
        return HttpResponse('bad')
def judet(request):
    form = ModificaJudet(data=request.POST)
    if form.is_valid():
        user=User.objects.get(username=request.user.username)
        user.judet=request.POST['judet']
        user.save()
        return HttpResponse('ok')
    else:
        return HttpResponse('bad')
def jobs(request):
    return HttpResponse('ahaaaam')
def add(request):
    form=AdaugaJob(data=request.POST)
    if form.is_valid():
        form.instance.user=request.user
        form.save()
    return HttpResponse(form.errors)

@csrf_exempt
def ScoateJobs(request):
    job=Job.objects.filter(Judet=request.POST['Judet'])
    return json_response(job)
