# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-02 15:56
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0003_auto_20171001_1856'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='title',
            field=models.CharField(default='', max_length=100),
        ),
    ]
