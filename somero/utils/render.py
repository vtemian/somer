from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.conf import settings

class render:
    '''Register response engines based on HTTP_ACCEPT

     parameters:
         template: template for html rendering
         format: supported formats ('json','html')

     @render('index.html')
     def my_view(request)

     @render('index.html', ('json',))
     def my_view(request)

    html format is supported by default if a template is defined.

     @render('json')
     def my_view(request)

    in above case, json is the default format.

    '''
    class render_decorator:

        def __init__(self, parent, view_func):
            self.parent = parent
            self.view_func = view_func

        def __call__(self, *args, **kwargs):
            request = args[0]
            context = self.view_func(*args, **kwargs)

            if isinstance(context, HttpResponse):
                return context

            engine = None

            if request.META.has_key('HTTP_ACCEPT'):
                accept = request.META['HTTP_ACCEPT']
                for content in self.parent.engines.iterkeys():
                    if accept.find(content)<>-1:
                        engine, template = self.parent.engines.get(content)
                        break

            if engine is None:
                engine, template = self.parent.engines.get(self.parent.default)

            if 'html'==engine:
                response = self.html_render(request, context, template)
            elif 'json'==engine:
                response = self.json_render(request, context)
            else:
                response = context

            return response

        def json_render(self,request, context):
            return json_response(context)

        def html_render(self,request, context, template):
            return render_to_response(
                template,
                context,
                context_instance=RequestContext(request),
            )

    def __register_engine(self, engine, template, default = False):

        if engine == 'json':
            content_type = 'application/json'
        elif engine == 'html':
            content_type = 'text/html'
        else:
            raise ValueError("Unsuported format %s" % engine)

        if default:
            self.default = content_type
        self.engines[content_type] = engine, template

    def __init__(self, template=None, format=None):

        self.engines = {}

        if format is None:
            format = ()
        elif not isinstance(format, tuple):
            format = (format,)

        if template == 'json':
            self.__register_engine('json', None, True)
        elif template:
            self.__register_engine('html', template, True)

        for f in format:
            self.__register_engine(f, None)

    def __call__(self, view_func):
        return render.render_decorator(self, view_func)

###### --- RENDER TO JSON --- ######

import time
import datetime
import types
from decimal import *

from django.db import models
from django.utils import simplejson as json
from django.core.serializers.json import DateTimeAwareJSONEncoder

def json_response(context):
    resp = []

    if type(context) is not dict:
        return HttpResponse(parse(context), mimetype='application/json')

    for k in context.iterkeys():
        resp.append('"%s": %s' % (k, parse(context[k])))

    data = '{%s}' % ','.join(resp)
    return HttpResponse(data, mimetype='application/json')

def parse(data):
    """
    The main issues with django's default json serializer is that properties that
    had been added to a object dynamically are being ignored (and it also has
    problems with some models).
    """

    def _any(data):
        ret = None
        if type(data) is types.ListType:
            ret = _list(data)
        elif type(data) is types.DictType:
            ret = _dict(data)
        elif isinstance(data, Decimal):
            # json.dumps() cant handle Decimal
            #ret = str(data)
            ret = float(data)
        elif isinstance(data, models.query.QuerySet):
            # Actually its the same as a list ...
            ret = _list(data)
        elif isinstance(data, models.Model):
            ret = _model(data)
        elif isinstance(data, datetime.date):
            ret = time.strftime("%Y/%m/%d",data.timetuple())
        else:
            ret = data
        return ret

    def _model(data):
        ret = {}
        # If we only have a model, we only want to encode the fields.
        for f in data._meta.fields:
            ret[f.attname] = _any(getattr(data, f.attname))
        # And additionally encode arbitrary properties that had been added.
        fields = dir(data.__class__) + ret.keys()
#        add_ons = [k for k in dir(data) if k not in fields]
        add_ons = [k for k in dir(data) if k not in fields and k not in ('delete', '_state',)]
        for k in add_ons:
            ret[k] = _any(getattr(data, k))
        return ret

    def _list(data):
        ret = []
        for v in data:
            ret.append(_any(v))
        return ret

    def _dict(data):
        ret = {}
        for k,v in data.items():
            ret[k] = _any(v)
        return ret

    ret = _any(data)

    return json.dumps(ret, cls=DateTimeAwareJSONEncoder)