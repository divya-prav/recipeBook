from rest_framework.decorators import api_view,parser_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Recipes
from .serializers import RecipesSerializer
from rest_framework import status
# Create your views here.

@api_view(['GET','POST'])
@parser_classes([MultiPartParser, FormParser])
def recipes(request):
   
    if(request.method == 'GET'):
        print('you hit a get method')
        objs = Recipes.objects.all()
        serializer = RecipesSerializer(objs,many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        print("data-----",request.data)
        data = request.data
        serializer = RecipesSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print(serializer.errors) 
        return Response(serializer.errors)
    
@api_view(['GET', 'DELETE'])
def recipe_detail(request, pk):  
    try:
        recipe = Recipes.objects.get(pk=pk)
    except Recipes.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = RecipesSerializer(recipe)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        recipe.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)