# Generated by Django 5.1.1 on 2024-10-10 10:49

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_rename_avg_price_product_avgprice'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='date_added',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
