from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('notes/', views.getNotesList, name='notes'),
    path('notes/<int:id>/', views.getNoteDetail, name='note')
]