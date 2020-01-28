from django.shortcuts import render
from student.models import Student, Fees, Branch, Course
from rest_framework import viewsets
from student.serializers import StudentSerializer, FeesSerializer, BranchSerializer, CourseSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class FeesViewSet(viewsets.ModelViewSet):
    queryset = Fees.objects.all()
    serializer_class = FeesSerializer

class BranchViewSet(viewsets.ModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
