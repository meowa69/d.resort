from django.db import models
from django.contrib.auth.models import User



class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Ensure there's no 'default'
    name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=50, unique=True)
    address = models.CharField(max_length=255)
    mobile_number = models.CharField(max_length=15)

    def __str__(self):
        return self.name
class Admin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Link to User model
    full_name = models.CharField(max_length=100)

    def __str__(self):
        return self.full_name
class Schedule(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    day = models.CharField(max_length=20)
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    duty = models.CharField(max_length=50, blank=True)
    day_off = models.BooleanField(default=False)

    class Meta:
        unique_together = ('employee', 'day')

    def __str__(self):
        return f"{self.employee.name} - {self.day}"
