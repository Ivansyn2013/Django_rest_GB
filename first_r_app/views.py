from rest_framework.viewsets import ModelViewSet
from .models import Author, TODO
from .serializer import AuthorModelSerializer
from .serializer import TODOHyperlinkSerializer, TODOSerializer

class AuthorModelViewset(ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer

class TODOModelViewset(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOHyperlinkSerializer