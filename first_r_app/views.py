from rest_framework.viewsets import ModelViewSet
from .models import Author, TODO, User, Project
from .serializer import AuthorModelSerializer
from .serializer import TODOHyperlinkSerializer, TODOSerializer, UserModelSerializer, ProjectModelSerializer

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