from django.conf.urls import url
from todos import views

urlpatterns = [
    url(r'^todos/$', views.TodoList.as_view()),
    url(r'^todos/(?P<pk>[0-9]+)/$', views.TodoDetail.as_view()),
    url(r'^users/$', views.UserList.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
]