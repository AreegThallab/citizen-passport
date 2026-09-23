import uuid
from django.db import models


class Passport(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=40)
    avatar = models.CharField(max_length=12, default='palm')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Stamp(models.Model):
    passport = models.ForeignKey(Passport, on_delete=models.CASCADE, related_name='stamps')
    region = models.CharField(max_length=30)
    earned_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['passport', 'region'], name='one_stamp_per_region')
        ]

    def __str__(self):
        return f'{self.passport.name} / {self.region}'