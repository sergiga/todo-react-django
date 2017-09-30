from todos.models import Todo
from django.contrib.auth.models import User
from todos.serializers import TodoSerializer, UserSerializer
from todos.permissions import IsOwner
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions

class TodoList(APIView):
  permission_classes = (permissions.IsAuthenticated,
                        IsOwner)

  def get(self, request, format=None):
    todos = Todo.objects.all()
    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data)

  def post(self, request, format=None):
    serializer = TodoSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TodoDetail(APIView):
  permission_classes = (permissions.IsAuthenticated,
                        IsOwner)

  def get_object(self, pk):
    try:
      return Todo.objects.get(pk=pk)
    except Todo.DoesNotExist:
      raise Http404

  def get(self, request, pk, format=None):
    todo = self.get_object(pk)
    serializer = TodoSerializer(todo)
    return Response(serializer.data)

  def put(self, request, pk, format=None):
    todo = self.get_object(pk)
    serializer = TodoSerializer(todo, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  def delete(self, request, pk, format=None):
    todo = self.get_object(pk)
    todo.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

  def perform_create(self, serializer):
    serializer.save(owner=self.request.user)

class UserList(APIView):
  def get(self, request, format=None):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

  def post(self, request, format=None):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetail(APIView):
  def get_object(self, pk):
    try:
      return User.objects.get(pk=pk)
    except User.DoesNotExist:
      raise Http404

  def get(self, request, pk, format=None):
    user = self.get_object(pk)
    serializer = UserSerializer(user)
    return Response(serializer.data)

  def put(self, request, pk, format=None):
    todo = self.get_object(pk)
    serializer = UserSerializer(user, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  def delete(self, request, pk, format=None):
    user = self.get_object(pk)
    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)