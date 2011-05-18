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
def FiltreActiv(request):
    job=Job.objects.all()
    if request.POST['judet-h']=="active":
        job=job.filter(Judet=request.POST['judet'])
    if request.POST['localitate-h']=="active":
        job=job.filter(Localitate=request.POST['localitate'])
    if request.POST['varsta-h']=="active":
        job=job.filter(Varsta__range=(request.POST['varsta-min'],request.POST['varsta-max']))
    if request.POST['recompensa-h']=="active":
        job=job.filter(Recompensa__range=(request.POST['recompensa-min'],request.POST['recompensa-max']))

    return json_response(job)
@csrf_exempt
def FiltreInactiv(request):
    job=Job.objects.all()
    return json_response(job)
@csrf_exempt
def ScoateJobs(request):
    job=Job.objects.filter(Judet=request.POST['Judet'])
    return json_response(job)

@csrf_exempt
def ScoateChat(request):
    job=Job.objects.filter(id=request.POST['id'])
    return json_response(job)

@csrf_exempt
def ScoateChat_user(request):
    job=Job.objects.filter(user=request.user.id)
    job=job.filter(id=request.POST['id'])
    if job:
        return HttpResponse("ok")
    else:
         return HttpResponse("bad")

@csrf_exempt
def KillRoom(request):
    job=Job.objects.filter(id=request.POST['id'])
    job.delete()
    return HttpResponse("ok")
