# Generated by Django 2.2 on 2021-06-03 00:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0015_auto_20210602_1850'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='total_balance',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10, null=True),
        ),
    ]
