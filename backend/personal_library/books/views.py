from rest_framework import viewsets, generics, filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend

from .models import Book
from .serializers import BookSerializer
# from .filters import BookFilter
from books.serializers import UserRegistrationSerializer


# class BookPagination(PageNumberPagination):
#     page_size = 10
#     page_size_query_param = 'page_size'
#     max_page_size = 100

class BookViewSet(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()
    permission_classes = [IsAuthenticated]
    # pagination_class = BookPagination

    def get_queryset(self):
        # Filter books by the current user
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Assign the current user to the book
        serializer.save(user=self.request.user)

class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .models import Book
from .serializers import BookSerializer
import django_filters

class BookFilter(django_filters.FilterSet):
    title_start = django_filters.CharFilter(field_name='title', lookup_expr='startswith')

    class Meta:
        model = Book
        fields = ['title_start']

class BookListView(generics.ListAPIView):
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = BookFilter

    def get_queryset(self):
        queryset = super().get_queryset()
        title_start = self.request.query_params.get('title_start', None)
        if title_start:
            queryset = queryset.filter(title__startswith=title_start)
        return queryset




