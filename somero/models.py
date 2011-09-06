from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields.related import ForeignKey

class Job(models.Model):
    Titlu=models.CharField(max_length=60)
    Descriere=models.CharField(max_length=255)
    user =ForeignKey(User, unique=False)
    Judet = models.CharField(max_length=60,null=True)
    Localitate = models.CharField(max_length=60,null=True)
    Varsta = models.CharField(max_length=60,null=True)
    Sex = models.CharField(max_length=60)
    Recompensa = models.CharField(max_length=5)
    
class UserProfile(models.Model):
    Judet=models.CharField(max_length=50)
    user = models.ForeignKey(User, unique=True)