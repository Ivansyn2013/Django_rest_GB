# Generated by Django 4.1.4 on 2023-01-16 15:31

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('first_r_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=64)),
                ('link', models.URLField()),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='TODO',
            fields=[
                ('is_active', models.BooleanField(auto_created=True, default=True)),
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('todo_text', models.TextField()),
                ('create_data', models.DateTimeField(auto_now_add=True)),
                ('update_data', models.DateTimeField()),
                ('own_user_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='first_r_app.user')),
                ('project_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='first_r_app.project')),
            ],
        ),
        migrations.AddField(
            model_name='project',
            name='users',
            field=models.ManyToManyField(to='first_r_app.user'),
        ),
    ]