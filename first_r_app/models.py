from django.db import models
from uuid import  uuid4


class Author(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    birthday = models.PositiveIntegerField()

    def __str__(self):
        return self.first_name

class User(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    name = models.CharField(max_length=100)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    def __str__(self):
        return self.name

class Project(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    name = models.CharField(max_length=64)
    link = models.URLField()
    users = models.ManyToManyField(User)


class TODO(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    project_name = models.ForeignKey(Project, on_delete=models.CASCADE)
    todo_text = models.TextField()
    create_data = models.DateTimeField(auto_now_add=True)
    update_data = models.DateTimeField(null=True)
    own_user_name = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True, auto_created=True)


