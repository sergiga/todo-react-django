from rest_framework import serializers
from todos.models import Todo
from django.contrib.auth.models import User

class TodoSerializer(serializers.ModelSerializer):
  owner = serializers.ReadOnlyField(source='owner.username')

  class Meta:
    model = Todo
    fields = ('id', 'title', 'completed', 'owner',)

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username', 'todos',)