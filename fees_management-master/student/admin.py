from django.contrib import admin
from student.models import Student, Fees, Branch, Course

class FeesInline(admin.TabularInline):
    model = Fees
    extra = 1

class StudentAdmin(admin.ModelAdmin):
    list_display = ('usn', 'name', 'phone', 'father_name')
    list_filter = ('branch', 'sem')
    inlines = [
        FeesInline
    ]

class FeesAdmin(admin.ModelAdmin):
    list_filter = ('name',)

admin.site.register(Student, StudentAdmin)
admin.site.register(Fees, FeesAdmin)
admin.site.register(Branch)
admin.site.register(Course)