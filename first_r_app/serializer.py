from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Author, TODO, User, Project
from rest_framework import serializers
from datetime import datetime


class AuthorModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class AuthorModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'




class TODOHyperlinkSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = TODO
        fields = '__all__'



class TODOSerializer(serializers.Serializer):

    class Meta:
        model = TODO
        fields = '__all__'
