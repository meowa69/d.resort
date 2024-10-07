from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, EmployeeSerializer, ScheduleSerializer
from .models import Employee, Schedule
from rest_framework.permissions import AllowAny

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class RegisterEmployeeView(generics.CreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [AllowAny]  # Ensure this is set
    
class EmployeeListCreateView(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    
class EmployeeScheduleView(generics.RetrieveUpdateAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    lookup_field = 'employee'  # Lookup the schedule by employee ID

    def get_object(self):
        employee_id = self.kwargs['employee_id']
        return Schedule.objects.get_or_create(employee_id=employee_id)[0]  # Create a schedule if none exists