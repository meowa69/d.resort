from django.db import models

class Employee(models.Model):
    name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=50, unique=True)  # Make it unique
    address = models.CharField(max_length=255)
    mobile_number = models.CharField(max_length=15)

    def __str__(self):
        return self.name
