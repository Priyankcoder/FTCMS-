from django.views.generic import View,FormView
from .login import LoginForm
from django.contrib.auth.models import User
from django.views.generic import View,FormView
from django.contrib.auth import authenticate,login,logout
from django.shortcuts import render,redirect

class LoginView(FormView):
  form_class = LoginForm
  template_name = "student/user_form.html"
  def get(self,request):
    form = self.form_class(None)
    return render(request,self.template_name,{"form":form})
  def post(self,request):
    form = self.form_class(request.POST)
    if form.is_valid():
      username = form.cleaned_data['username']
      password = form.cleaned_data['password']
      print(username,password)
      user = authenticate(username=username,password=password)
      if user is not None:
        login(request,user)
        return redirect('student:profile')
      print(user)
    return render(request,self.template_name,{"form":form})
