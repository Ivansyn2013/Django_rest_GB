import graphene
from .models import Author, User, TODO, Project
from graphene_django import DjangoObjectType


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class TODOType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):
    users = graphene.List(UserType)
    projects = graphene.List(ProjectType)
    todolist = graphene.List(TODOType)

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_todo(root, info):
        return TODO.objects.all()


schema = graphene.Schema(query=Query)
