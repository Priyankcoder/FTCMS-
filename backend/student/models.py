from django.db import models

class Students(models.Model):
    r_no = models.CharField(max_length=100)
    s_name = models.CharField(max_length=100)
    f_name = models.CharField(max_length=100)
    p_no = models.IntegerField(max_length=15)
    email = models.CharField(max_length=100)
    address = models.TextField(max_length=150)
    #branch = models.ForeignKey(Branch,on_delete= models.CASCADE,default=None)
    #course = models.ForeignKey(Course,on_delete= models.CASCADE, default=None)
    def __str__(self):
        return self.r_no + self.s_name

