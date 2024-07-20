from django.urls import path
from . import views

urlpatterns = [
    path('',views.recipes),
    path('<int:pk>/', views.recipe_detail, name='recipe_detail'),
]