# Generated by Django 3.2.10 on 2022-01-13 06:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0031_auto_20220108_0342'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='main_currency',
            field=models.CharField(max_length=6, null=True),
        ),
        migrations.AddField(
            model_name='transaction_history',
            name='ex_price',
            field=models.DecimalField(blank=True, decimal_places=1, default=0, max_digits=10, null=True),
        ),
        migrations.AddField(
            model_name='transaction_history',
            name='ex_rate',
            field=models.DecimalField(blank=True, decimal_places=4, default=0, max_digits=10, null=True),
        ),
        migrations.AlterField(
            model_name='transaction_history',
            name='person',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='accounts.account'),
        ),
        migrations.CreateModel(
            name='BranchAccounts',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_balance', models.DecimalField(decimal_places=2, default=0, max_digits=10, null=True)),
                ('add_money', models.DecimalField(blank=True, decimal_places=1, max_digits=10, null=True)),
                ('take_money', models.DecimalField(blank=True, decimal_places=1, max_digits=10, null=True)),
                ('currency', models.CharField(max_length=6, null=True)),
                ('main_account', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='accounts.account')),
            ],
        ),
    ]
