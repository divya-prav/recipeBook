from django.db import models

# Create your models here.

class Recipes(models.Model):
    recipe_id = models.AutoField(primary_key=True)
    recipe_image = models.ImageField(upload_to='images/')
    recipe_description = models.CharField(max_length=10000)
    recipe_name = models.CharField(max_length=100)
    ingredients = models.JSONField()
    preparation_time=models.CharField(max_length=100)
    instruction=models.JSONField()