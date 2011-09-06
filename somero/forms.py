from django import forms
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.forms.fields import CharField, EmailField
from django.forms.forms import Form
from models import Job
from models import  UserProfile
from django.forms import ModelForm

class UserLogin(Form):
    utilizator = CharField(required=True)
    parola = CharField(required=True)
    def __init__(self, request=None, *args, **kwargs):
        self.request = request
        self.user = None
        super(UserLogin, self).__init__(*args, **kwargs)
    def clean(self):
        print self.cleaned_data
        utilizator = self.cleaned_data.get('utilizator')
        parola=self.cleaned_data.get('parola')
        if utilizator and parola:
            self.user = authenticate(username=utilizator, password=parola)
            if self.user is None:
                raise ValidationError('Utilizator sau parola invalida')
            elif not self.user.is_active:
                raise forms.ValidationError("Contul numai este activ")
        return self.cleaned_data
    
    def scoate_user(self):
        return self.user
class RegistrationForm(ModelForm):
    class Meta:
        model=User
        fields=['first_name','last_name','username','email','password']
class ModificaParola(Form):
    parola1 = CharField(required=True)
class ModificaEmail(Form):
    email = EmailField(required=True)
class ModificaJudet(Form):
    judet = CharField(required=True)
class AdaugaJob(ModelForm):
   class Meta:
       model=Job
       fields=['Titlu','Descriere','Judet','Localitate','Varsta','Sex','Recompensa']


