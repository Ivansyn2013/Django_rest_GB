from rest_framework.viewsets import ModelViewSet
from .models import Author
from .serializer import AuthorModelSerializer

class AuthorModelViewset(ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer
