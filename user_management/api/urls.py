from django.urls import path
from .views import LoginView, LogoutView, ProfileView, AllUsersView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/', ProfileView.as_view(), name='dashboard'),
    path("all-users/", AllUsersView.as_view(), name="all-users")
]
