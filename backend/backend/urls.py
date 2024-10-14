from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, RegisterEmployeeView, EmployeeListCreateView, UploadProductView, ProductListView, ProductAutocompleteView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path('api/register/', RegisterEmployeeView.as_view(), name='register_employee'),
    path('api/employees/', EmployeeListCreateView.as_view(), name="employee_list_create"),
    path('api/uploadproducts/', UploadProductView.as_view(), name="productupload"),
    path('api/products/', ProductListView.as_view(), name="productlist"),
    path('api/product-autocomplete/', ProductAutocompleteView.as_view(), name='product-autocomplete'),
    path("api-auth/", include("rest_framework.urls")),
]