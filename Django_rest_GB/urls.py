"""Django_rest_GB URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from first_r_app.views import AuthorModelViewset, TODOModelViewset, ProjectModelViewset, UserModelViewset
from first_r_app.views import MyUserViewSet, MyProjectView, MyTODOViewSet
from rest_framework.authtoken import views


router = DefaultRouter()
router.register('authors', AuthorModelViewset)
router.register('todo', TODOModelViewset)
router.register('users', UserModelViewset)
router.register('projects', ProjectModelViewset)
#router.register('project', MyProjectView, basename='my_p')
router.register('t/todo', MyTODOViewSet, basename='my_t')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('users/', MyUserViewSet.as_view()),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', views.obtain_auth_token),

]


