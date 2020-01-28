
from django.contrib import admin
from django.urls import path, include, re_path
from fees_management import views
from rest_framework.routers import DefaultRouter

from student.views import *

router = DefaultRouter()
router.register(r'student', StudentViewSet)
router.register(r'fees', FeesViewSet)
router.register(r'course', CourseViewSet)
router.register(r'branch', BranchViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('dashboard/handlerequest/', views.handlerequest, name='handlerequest'),
    path('api/', include(router.urls)),
    path('', views.login, name='login'),
    path('logout/', views.logout_user, name='logout'),
    re_path(r'^dashboard/((?P<the_id>[0-9]+))?', views.Dashboard.as_view(), name='dashboard')
]
