from rest_framework import serializers
from student.models import Student, Fees, Branch, Course


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = ('id', 'usn', 'name', 'phone', 'father_name', 'mother_name', 'parents_number', 'address', 'branch', 'sem')



class FeesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Fees
        fields = ('id', 'name', 'student', 'tax', 'payment', 'bank')

class BranchSerializer(serializers.ModelSerializer):

    class Meta:
        model = Branch
        fields = ('id', 'name', 'course')

class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = ('id', 'name')