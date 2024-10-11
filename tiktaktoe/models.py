from django.db import models


# Create your models here.
class Game(models.Model):
    start_player = models.CharField(max_length=2, default="-1")
    field = models.CharField(max_length=2, default=[0,0,0,0,0,0,0,0,0])

