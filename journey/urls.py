from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('destinations/', views.destinations, name='destinations'),
    path('station/<slug:slug>/', views.challenge, name='challenge'),
    path('passport/', views.passport_page, name='passport'),
    path('reset/', views.reset, name='reset'),
]