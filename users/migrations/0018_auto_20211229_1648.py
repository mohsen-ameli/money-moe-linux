# Generated by Django 3.2.10 on 2021-12-29 21:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0017_customuser_currency'),
    ]

    operations = [
        migrations.DeleteModel(
            name='CountryChoose',
        ),
        migrations.AddField(
            model_name='customuser',
            name='language',
            field=models.CharField(max_length=15, null=True),
        ),
    ]
