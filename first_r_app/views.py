from rest_framework.viewsets import ModelViewSet
from .models import Author, TODO, User, Project
from .serializer import AuthorModelSerializer
from .serializer import TODOHyperlinkSerializer,  UserModelSerializer, ProjectModelSerializer
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404

class AuthorModelViewset(ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer

class TODOModelViewset(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOHyperlinkSerializer

class UserModelViewset(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

class ProjectModelViewset(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class MyFirstViewSet(viewsets.ViewSet):
    @action(detail=True, methods=['get'])
    def article_text_only(self, request, pk=None):
        author = get_object_or_404(Author, pk='9da16d2863404627a3c01d598177639dpr')

        return Response({'author.text': author})

    def list(self, request):
        users = User.objects.all()

        serializer = UserModelSerializer(users)
        return Response(serializer.data)