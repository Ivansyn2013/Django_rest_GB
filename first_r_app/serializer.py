from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Author
from .models import TODO
from rest_framework import serializers
from datetime import datetime


class AuthorModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'

class TODOHyperlinkSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = TODO
        fields = '__all__'
        exclude = ['update_data',
                   'create_data',
                   ]

    def create(self, validated_data):
        return TODO(**validated_data)

    def update(self, instance, validated_data):
        instance.project_name = validated_data.get('project_name', instance.project_name)
        instance.todo_text = validated_data.get('todo_text', instance.todo_text)
        instance.own_user_name = validated_data.get('own_user_name', instance.own_user_name)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.update_data = validated_data.get(datetime.now())
        return instance
class TODOSerializer(serializers.Serializer):

    class Meta:
        model = TODO
        fields = '__all__'
    def create(self, validated_data):
        return TODO(**validated_data)

    def update(self, instance, validated_data):
        instance.project_name = validated_data.get('project_name', instance.project_name)
        instance.todo_text = validated_data.get('todo_text', instance.todo_text)
        instance.own_user_name = validated_data.get('own_user_name', instance.own_user_name)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.update_data = validated_data.get(datetime.now())
        return instance
