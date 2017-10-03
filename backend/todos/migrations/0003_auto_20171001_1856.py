# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-01 18:56
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0002_todo_owner'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todo',
            name='content',
        ),
        migrations.AddField(
            model_name='todo',
            name='completed',
            field=models.BooleanField(default=False),
        ),
    ]