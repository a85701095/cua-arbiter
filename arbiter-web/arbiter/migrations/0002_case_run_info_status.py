# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-02-13 03:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('arbiter', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='case_run_info',
            name='status',
            field=models.CharField(default='done', max_length=50),
        ),
    ]