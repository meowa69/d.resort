from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, RegisterEmployeeView, EmployeeListCreateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path('api/register/', RegisterEmployeeView.as_view(), name='register_employee'),
    path('api/employees/', EmployeeListCreateView.as_view(), name="employee_list_create"),
    path("api-auth/", include("rest_framework.urls")),
]