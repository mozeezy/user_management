from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from .serializers import CustomUserSerializer
from rest_framework import generics
from .models import CustomUser

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            serializer = CustomUserSerializer(user)
            return Response({'message': 'Login successful', 'user_data': serializer.data})
        else:
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_400_BAD_REQUEST)
        

class LogoutView(APIView):
    authentication_classes = []
    def post(self, request):
        logout(request)
        response = Response({'message': 'Logout successful'})
        response['X-CSRFToken'] = ''
        return response

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication, BasicAuthentication]

    def get(self, request):
        user = request.user
        serializer = CustomUserSerializer(user)
        return Response({'user_data': serializer.data})
    
class AllUsersView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAdminUser]
