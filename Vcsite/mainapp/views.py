from django.shortcuts import render,reverse
from django.http import HttpResponseRedirect
from django import forms
from .forms import UploadFileForm
from .forms import UploadFileForm2
from .forms import UploadFileModel
# Create your views here.
from django.http import HttpResponse
from django.template import loader
from django.views.decorators.csrf import csrf_exempt
from mainapp.models import UploadFileModel
from mainapp.models import Post
import os
from django.conf import settings
import os
import base64
import tempfile

@csrf_exempt
def upload_file(request):
    if request.method == 'POST':
        form = UploadFileForm(data=request.POST, files=request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('/mainapp/'))
    else:
        '''form = UploadFileForm()'''
    print(form.files)
    for filename, file in request.FILES.items():
        name = request.FILES[filename].name
    print(name)
    post = UploadFileForm2(data=request.POST, files=request.FILES)
    post = Post()
    post.profile_pic = request.FILES.get('uploadfile')
    post.pdf = request.FILES.get('uploadfile')
    print(request.FILES.get('uploadfile'))
    post.save()
    '''
    uploadfilemodel = UploadFileModel()
    uploadfilemodel.title = request.POST.get('uploadfile', None)
    print(request.POST.get('uploadfile'))
    uploadfilemodel.save()'''
    return render(request, 'mainapp/index.html')

@csrf_exempt
def send(request):
    tesffff = request.POST['imgBase64']
    print(tesffff[22:])
    img_b64 = base64.b64decode(tesffff[22:])
    f1 = open('mainapp/media/test.png', 'wb')
    f1.write(img_b64)
    return render(request, 'mainapp/index.html')

def index(request):
    template = loader.get_template('mainapp/index.html')
    context = {
        'latest_question_list': "test",
    }
    return HttpResponse(template.render(context, request))


def download(request):
    print("####")
    file_ = open(os.path.join(settings.MEDIA_ROOT, 'prison.jpg'))
    path = settings.MEDIA_ROOT
    file_list = os.listdir(path)
    print("file_list: {}".format(file_list))
    return render(request, 'mainapp/index.html')
