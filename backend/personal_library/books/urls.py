from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet, BookListView

# Create a router and register our viewset with it.
router = DefaultRouter()
router.register(r'books', BookViewSet, basename='book')

urlpatterns = [
    # Include the routes from the router
    path('', include(router.urls)),
]
