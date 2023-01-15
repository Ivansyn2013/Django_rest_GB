from django.db import models
from uuid import  uuid4


class Author(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    birthday = models.PositiveIntegerField()


class User(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    name = models.CharField(max_length=100)

class Project(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    name = models.CharField(max_length=64)
    link = models.URLField()
    users = models.ManyToManyField(User)


class TODO(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    project_name = models.ForeignKey()
    todo_text = models.TextField()
    create_data = models.DateTimeField(auto_now_add=True)
    update_data = models.DateTimeField()
    own_user_name = models.ManyToManyField(User)
    is_active = models.BooleanField(default=True, auto_created=True)

