import json

from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import AuthorModelViewset
from .models import Author, Project, TODO
from .models import TODO as td
from .models import User as model_User
from django.test import TestCase

# Create your tests here.


class TestAuthorViewSet(TestCase):
    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/authors/')
        view = AuthorModelViewset.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)



class TestProject(TestCase):

    def test_get_project_list(self):
        project = Project.objects.create(name='one', link='www.www.ru')
        admin = User.objects.create_superuser('admin',
                                              'admin@admin.com',
                                              'admin123456')

        client = APIClient()
        client.login(username='admin', password='admin123456')
        response = client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestTODO(APITestCase):

    def test_get_TODO_list(self):
        TODO = td.objects.create(todo_text='sdsd')
        user = model_User.objects.create(name='11')
        admin = User.objects.create_superuser('admin',
                                              'admin@admin.com',
                                              'admin123456')
        self.client.login(username='admin', password='admin123456')
        response = self.client.get(f'/api/projects/{TODO.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_todo_moxer(self):
        todo = mixer.blend(td)
        admin = User.objects.create_superuser('admin',
                                              'admin@admin.com',
                                              'admin123456')
        self.client.login(username='admin', password='admin123456')
        response = self.client.put(f'/api/projects/{TODO.id}/',{'user':'user'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
