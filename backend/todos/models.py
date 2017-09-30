from django.db import models

class Todo(models.Model):
  created = models.DateTimeField(auto_now_add=True)
  title = models.CharField(max_length=100, blank=True, default='')
  content = models.CharField(max_length=140, blank=True, default='')
  owner = models.ForeignKey('auth.User', related_name='todos', on_delete=models.CASCADE, default=1)

  class Meta:
    ordering = ('created',)