# Generated by Django 3.2.7 on 2021-12-20 04:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0023_auto_20211219_0113'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction_history',
            name='method',
            field=models.CharField(default='NONE', max_length=100),
        ),
    ]
