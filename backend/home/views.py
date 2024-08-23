 
from rest_framework.response import Response
from rest_framework import status 
from rest_framework.views import APIView
from .models import *
from .serializers import  *
from rest_framework.permissions import IsAuthenticated
from .models import *
from products.serializers import  *
from products.models import Rate

 


class HomeListView(APIView):
    def get(self, request):
        info = Info.objects.all().first()
        slide = Slide.objects.filter(is_active=True)
        cat = Category.objects.filter(is_active=True).order_by('?')
        one_deal = Deal.objects.all().order_by('?').first()
        deal = Deal.objects.all().order_by('?')
        group_product = GroupProduct.objects.all().order_by('?')
        card = Card.objects.all().order_by('?')
        best_sellers = BestSellers.objects.all().order_by('?')
        questions = QuestionsGeneral.objects.all()
        rate = Rate.objects.all().order_by('?')

        info_serializer = InfoSerializer(info)
        slide_serializer = SlideSerializer(slide, many=True)
        cat_serializer =CategorySerializer(cat, many=True)
 
        one_deal_serializer = DealSerializer(one_deal)

        deal_serializer = DealSerializer(deal, many=True)
        group_product_serializer = GroupProductSerializer(group_product, many=True)
        card_serializer = CardSerializer(card, many=True)
        best_serializer = BestSellersSerializer(best_sellers, many=True)
        questions_serializer = QuestionsGeneralSerializer(questions, many=True)
        rate_serializer = RateSerializer(rate, many=True)
 
        return Response({
            'info': info_serializer.data,
            'slide': slide_serializer.data,
            'Category':cat_serializer.data,
            'one_deal':one_deal_serializer.data,
            'deal': deal_serializer.data,
            'group_product': group_product_serializer.data,
            'card': card_serializer.data,
            'best_sellers': best_serializer.data,
            'questions': questions_serializer.data,
            'rate': rate_serializer.data,
        }, status=200)
 

 


class DealListView(APIView):
    def get(self, request, *args, **kwargs):
        deal = Deal.objects.all().order_by('?')
        deal_serializer = DealSerializer(deal, many=True)
        return Response({'deal': deal_serializer.data}, status=status.HTTP_200_OK)
            
        
       

class GroupProductListView(APIView):
    def get(self, request, *args, **kwargs):
        group_product = GroupProduct.objects.all().order_by('?')
        group_serializer = GroupProductSerializer(group_product, many=True)
        return Response({'group_products': group_serializer.data}, status=status.HTTP_200_OK)
            
         
 
class DealView(APIView):
    permission_classes = [IsAuthenticated]  
    def get(self, request):
        queryset = Deal.objects.all()
        deal_count = queryset.count()
        
        serializer = DealSerializer(queryset, many=True)
        data = {
            'deals': serializer.data,
            'deal_count': deal_count
        }
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = Deal_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            deal = Deal.objects.get(pk=pk)
        except Deal.DoesNotExist:
            return Response({'error': 'Deal not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = Deal_Serializer(deal, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            deal = Deal.objects.get(pk=pk)
        except Deal.DoesNotExist:
            return Response({'error': 'Deal not found'}, status=status.HTTP_404_NOT_FOUND)

        deal.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




 


 
class QuestionsGeneralView(APIView):
    permission_classes = [IsAuthenticated]  

    def get(self, request):
        queryset = QuestionsGeneral.objects.all()
        ques_count = queryset.count()
        
        serializer = QuestionsGeneralSerializer(queryset, many=True)
        data = {
            'ques': serializer.data,
            'ques_count': ques_count
        }
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data)
        serializer = QuestionsGeneralSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            ques = QuestionsGeneral.objects.get(pk=pk)
        except QuestionsGeneral.DoesNotExist:
            return Response({'error': 'QuestionsGeneral not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = QuestionsGeneralSerializer(ques, data=request.data)
      
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            ques = QuestionsGeneral.objects.get(pk=pk)
        except QuestionsGeneral.DoesNotExist:
            return Response({'error': 'QuestionsGeneral not found'}, status=status.HTTP_404_NOT_FOUND)

        ques.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
 
 
class SlideView(APIView):
    permission_classes = [IsAuthenticated]  

    def get(self, request):
        queryset = Slide.objects.all()
        ques_count = queryset.count()
        
        serializer = SlideSerializer(queryset, many=True)
        data = {
            'slide': serializer.data,
            'slide_count': ques_count
        }
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
      
        serializer = SlideSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            slide = Slide.objects.get(pk=pk)
        except Slide.DoesNotExist:
            return Response({'error': 'Slide not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = SlideSerializer(slide, data=request.data)
      
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            slide = Slide.objects.get(pk=pk)
        except Slide.DoesNotExist:
            return Response({'error': 'Slide not found'}, status=status.HTTP_404_NOT_FOUND)

        slide.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
 

 
class CardView(APIView):
    permission_classes = [IsAuthenticated]  

    def get(self, request):
        queryset = Card.objects.all()
        card_count = queryset.count()
        
        serializer = CardSerializer(queryset, many=True)
        data = {
            'card': serializer.data,
            'card_count': card_count
        }
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
      
        serializer = CardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            card = Card.objects.get(pk=pk)
        except Card.DoesNotExist:
            return Response({'error': 'Card not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CardSerializer(card, data=request.data)
      
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            card = Card.objects.get(pk=pk)
        except Card.DoesNotExist:
            return Response({'error': 'card not found'}, status=status.HTTP_404_NOT_FOUND)

        card.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
 

 
class BestSellersView(APIView):
    permission_classes = [IsAuthenticated]  

    def get(self, request):
        queryset = BestSellers.objects.all()
        card_count = queryset.count()
        
        serializer = BestSellersSerializer(queryset, many=True)
        data = {
            'best': serializer.data,
            'best_count': card_count
        }
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
      
        serializer = BestSellersـSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
    def delete(self, request, pk):
        try:
            best = BestSellers.objects.get(pk=pk)
        except BestSellers.DoesNotExist:
            return Response({'error': 'BestSellers not found'}, status=status.HTTP_404_NOT_FOUND)

        best.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

 

 
class GroupView(APIView):
    permission_classes = [IsAuthenticated]  

    def get(self, request):
        queryset = GroupProduct.objects.all()
        group_count = queryset.count()
        
        serializer = GroupProductSerializer(queryset, many=True)
        data = {
            'group': serializer.data,
            'group_count': group_count
        }
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = GroupProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            group = GroupProduct.objects.get(pk=pk)
        except GroupProduct.DoesNotExist:
            return Response({'error': 'Group Product not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = GroupProductSerializer(group, data=request.data)
      
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            group = GroupProduct.objects.get(pk=pk)
        except GroupProduct.DoesNotExist:
            return Response({'error': 'Group Product not found'}, status=status.HTTP_404_NOT_FOUND)

        group.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
 
 


class InfoView(APIView):
    def get(self, request):
        info = Info.objects.all().first()
        info_serializer = InfoSerializer(info)
        return Response(info_serializer.data, status=status.HTTP_200_OK)
 




class InfoListView(APIView):
    permission_classes = [IsAuthenticated]     
    def get(self, request):
        info = Info.objects.all().first()
        info_serializer = InfoSerializer(info)
        return Response(info_serializer.data, status=status.HTTP_200_OK)
 
    def post(self, request):
        serializer = InfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            info = Info.objects.get(pk=pk)
        except Info.DoesNotExist:
            return Response({'error': 'info not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = InfoSerializer(info, data=request.data)
      
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_200_OK)
 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

   