from django.db import models

class Course(models.Model):
    name = models.CharField(max_length=40, unique=True)

    def get_branch(self):
        return self.branch_set
    
    def __str__(self):
        return str(self.name)

class Branch(models.Model):
    name =  models.CharField(max_length=50, unique=True, blank=True, null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name)

class Student(models.Model):
    Semesters = (
        ('1', 'first'),
        ('2', 'second'),
        ('3', 'third'),
        ('4', 'fourth'),
        ('5', 'fifth'),
        ('6', 'sixth'),
        ('7', 'seventh'),
        ('8', 'eigth'),
    )

    usn = models.CharField(unique=True, max_length=11)
    name = models.CharField(max_length=40)
    phone = models.PositiveIntegerField()
    father_name = models.CharField(max_length=40)
    mother_name = models.CharField(max_length=40)
    parents_number = models.PositiveIntegerField()
    address = models.TextField()
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    sem = models.CharField(max_length=1, choices=Semesters)
    total_sem = models.PositiveIntegerField(default=0)

    def __str__(self):
        return str(self.name)

    def __unicode__(self):
        return str(self.name)

class Fees(models.Model):
    name = models.CharField(max_length=50)
    tax = models.PositiveIntegerField(default=10)
    payment = models.PositiveIntegerField()
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    bank = models.CharField(max_length=30)
    order_no = models.CharField(max_length=30)

    def __str__(self):
        return str(self.student) + ' paid rupees ' + str(self.payment)

    def __unicode__(self):
        return str(self.student) + ' paid rupees ' + str(self.payment)
    
    def get_filtered_branch(self, id):
        from student.models import Student
        return Student.objects.filter(branch=id)

    def total_amount(self):
        return str(self.payment * self.tax / (100 + self.tax))