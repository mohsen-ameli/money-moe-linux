# Generated by Django 2.2 on 2021-06-02 18:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0013_auto_20210507_0929'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='add_money',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='account',
            name='bonus',
            field=models.DecimalField(decimal_places=3, default=1000, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='account',
            name='take_money',
            field=models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='account',
            name='total_balance',
            field=models.DecimalField(decimal_places=3, default=0, max_digits=10, null=True),
        ),
    ]
