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
        fields = ['name', 'id']
        #fields = '__all__'

class UserModelSerializerVersion2(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ProjectModelSerializer(HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model = Project
        fields = '__all__'


class AuthorModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'


class TODOHyperlinkSerializer(HyperlinkedModelSerializer):
    project = ProjectModelSerializer(source='project_name')
    id = serializers.ReadOnlyField(required=False)
    class Meta:
        model = TODO
        #fields = ['id', 'project_name','todo_text','create_data']
        fields = '__all__'
    def create(self, validated_data):

        project_data = validated_data.pop('project_name')
        print(project_data)
        print(project_data['name'])
        todo = TODO.objects.create(**validated_data, project_name=Project.objects.filter(name=project_data['name']).first())
        return todo




class TODOSerializer(serializers.Serializer):
    project = ProjectModelSerializer(source='project_name')
    class Meta:
        model = TODO
        fields = ['__all__', 'id']
