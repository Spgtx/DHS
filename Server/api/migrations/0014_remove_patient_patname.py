# Generated by Django 4.0.2 on 2024-03-15 12:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_patient_city_patient_fname_patient_lname_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='patient',
            name='patName',
        ),
    ]
