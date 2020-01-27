from django.db import models

class Students(models.Model):
    r_no = models.CharField(maximun_length=100)
    s_name = models.CharField(maximun_length=100)
    f_name = models.CharField(maximun_length=100)
    p_no = models.Integer(maximun_length=15)
    email = models.CharField(maximun_length=100)
    address = models.Textarea(maximun_length=150)
    branch = models.ForeignKey(Branch,on_delete= models.CASCADE,default=None)
    course = models.ForeignKey(Course,on_delete= models.CASCADE, default=None)
    def __str__(self):
        return self.r_no + self.s_name

