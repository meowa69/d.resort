from django.urls import path
from .views import EmployeeListCreateView, EmployeeDetailView, ScheduleListCreateView, ScheduleDetailView, CustomTokenObtainPairView

urlpatterns = [
    path('employees/', EmployeeListCreateView.as_view(), name='employee-list-create'),
    path('employees/<int:pk>/', EmployeeDetailView.as_view(), name='employee-detail'),
    path('schedules/', ScheduleListCreateView.as_view(), name='schedule-list-create'),
    path('schedules/<int:pk>/', ScheduleDetailView.as_view(), name='schedule-detail'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
]