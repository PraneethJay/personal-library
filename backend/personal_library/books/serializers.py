from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Book


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'publication_date', 'isbn', 'cover_image']
        read_only_fields = ['user']

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user  # Get the user from the request
        return Book.objects.create(user=user, **validated_data)


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        """
        Create and return a new `User` instance, with hashed password.
        """
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

    def validate_password(self, value):
        """
        Validate the password to ensure it meets certain criteria.
        """
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        return value
