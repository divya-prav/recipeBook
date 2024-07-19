from rest_framework import serializers
from .models import Recipes

class RecipesSerializer(serializers.ModelSerializer):
    recipe_image_url = serializers.SerializerMethodField()

    class Meta:
        model = Recipes
        fields = ['recipe_id', 'recipe_image', 'recipe_description', 'recipe_name', 'ingredients', 'preparation_time', 'instruction', 'recipe_image_url']
        read_only_fields = ['recipe_image_url']

    def get_recipe_image_url(self, obj):
        if obj.recipe_image:
            return obj.recipe_image.url
        return None
