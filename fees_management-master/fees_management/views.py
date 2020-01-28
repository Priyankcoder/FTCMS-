from django.conf import settings
from twilio.rest import Client
from django.shortcuts import render,redirect
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, logout
from django.contrib.auth import login as auth_login
from student.models import *
from student.models import Fees
from django.views import View
from django.http import HttpResponseRedirect, HttpResponse
from django.utils.decorators import method_decorator
from django.utils.crypto import get_random_string
from . import Checksum
from django.views.decorators.csrf import csrf_exempt

def login(request):
    context = dict()
    if request.user.is_authenticated: 
        return HttpResponseRedirect('dashboard')
    else:
        if request.method == "POST":
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                auth_login(request, user)
                if request.GET.get('next', None):
                    return HttpResponseRedirect(request.GET['next'])
                return HttpResponseRedirect('dashboard')
            else:
                context["error"] = "Enter Valid Credentials"
                return render(request, 'login.html', context)
        else:
            return render(request, 'login.html', context)
        return render(request, 'login.html')


@method_decorator(login_required, name='dispatch')
class Dashboard(View):

    def get(self, request, the_id=None):
        context = dict()
        context['course'] = Course.objects.all()
        context['branch'] = Branch.objects.all()
        context['fees'] = Fees.objects.all()
        random = get_random_string(length=7)
        print("random is", random)
        context['random_value']=random

        if the_id:
            context['heading'] = Student.objects.filter(branch=the_id)[0]
            context['students'] = Student.objects.filter(branch=the_id)
            return render(request, 'dashboard.html', context)
        else:
            context['students'] = Student.objects.all()
            
            return render(request, 'dashboard.html', context)
    def post(self,request,the_id):
        print("right")
        fees_name = request.POST.get("fee-name")
        fees_tax = request.POST.get("fees-tax")
        fees_payment = request.POST.get("fees-payment")
        bank = request.POST.get("bank")
        order_no = request.POST.get("order_no")
        param_dict = {

                    'MID': 'JLyKHw92166866405106',
                    'ORDER_ID': str(order_no),
                    'TXN_AMOUNT': str(fees_payment),
                    'CUST_ID': 'chaudharypraveen98@gmail.com',
                    'INDUSTRY_TYPE_ID': 'Retail',
                    'WEBSITE': 'WEBSTAGING',
                    'CHANNEL_ID': 'WEB',
                    'CALLBACK_URL':'http://127.0.0.1:8000/dashboard/handlerequest/',

            }
        print(param_dict)
        param_dict['CHECKSUMHASH'] = Checksum.generate_checksum(param_dict, 'E9@MhdmWh8I61jcX')
        return render(request, 'paytm.html', {'param_dict': param_dict})

    #Contact_Us(name=name,email=email,subject=subject,message=message).save()
    #send_mail("Thank you for your valuable feedback","we are hoping to look ahead of your problem",EMAIL_HOST_USER,[email],fail_silently=False)
    #messages.success(request, 'Form submission successful')

def logout_user(request):
    logout(request)
    return HttpResponseRedirect('/')

@csrf_exempt
def handlerequest(request):
    to='+919950250161'
    client = Client(settings.TWILIO_ACCOUNT_SID,settings.TWILIO_AUTH_TOKEN)
    response = client.messages.create(body="Transaction successful",to=to,from_=settings.TWILIO_PHONE_NUMBER)
    # paytm will send you post request here
    """form = request.POST
    response_dict = {}
    for i in form.keys():
        response_dict[i] = form[i]
        if i == 'CHECKSUMHASH':
            checksum = form[i]

    verify = Checksum.verify_checksum(response_dict, 'E9@MhdmWh8I61jcX', checksum)
    if verify:
        if response_dict['RESPCODE'] == '01':
            print('order successful')
        else:
            print('order was not successful because' + response_dict['RESPMSG'])"""
    #return render(request, 'paymentstatus.html', {'response': response_dict})
    return HttpResponseRedirect('/')


