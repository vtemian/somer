from utils import serialize_to_json
from django.http import HttpResponseForbidden, HttpResponse

def json_response(context):
    resp = []

    if type(context) is not dict:
        return HttpResponse(parse(context), mimetype='application/json')

    for k in context.iterkeys():
        resp.append('"%s": %s' % (k, parse(context[k])))

    data = '{%s}' % ','.join(resp)
    return HttpResponse(data, mimetype='application/json')