from rest_framework.viewsets import ModelViewSet
from .models import Author, TODO, User, Project
from .serializer import AuthorModelSerializer
from .serializer import TODOHyperlinkSerializer,  UserModelSerializer, ProjectModelSerializer, TODOSerializer
from rest_framework.viewsets import generics, ViewSet
from rest_framework.renderers import JSONRenderer
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.renderers import BrowsableAPIRenderer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from rest_framework import status
from rest_framework.permissions import AllowAny

class ProjectModelPaginator(LimitOffsetPagination):
    default_limit = 10


class TODOModelPaginator(LimitOffsetPagination):
    default_limit = 20


class AuthorModelViewset(ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer

class TODOModelViewset(ModelViewSet):

    permission_classes = [AllowAny]
    queryset = TODO.objects.all()
    serializer_class = TODOHyperlinkSerializer

class UserModelViewset(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

class ProjectModelViewset(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class MyUserViewSet(generics.ListAPIView, generics.RetrieveAPIView, generics.RetrieveUpdateAPIView):
    renderer_classes = [JSONRenderer]
    queryset = User.objects.all()
    serializer_class = UserModelSerializer


class MyProjectView(ModelViewSet):
    renderer_classes = [JSONRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectModelPaginator

class MyTODOViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer]
    queryset = TODO.objects.all()
    serializer_class = TODOSerializer
    pagination_class = TODOModelPaginator
    filterset_fields = ['project_name']
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save
        return Response(status=status.HTTP_204_NO_CONTENT)