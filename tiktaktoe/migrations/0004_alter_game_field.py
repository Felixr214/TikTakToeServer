# Generated by Django 5.1.2 on 2024-10-09 18:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tiktaktoe', '0003_alter_game_field'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='field',
            field=models.CharField(default=[0, 0, 0, 0, 0, 0, 0, 0, 0], max_length=2),
        ),
    ]
