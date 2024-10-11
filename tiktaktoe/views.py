from django.shortcuts import render
from django.http import JsonResponse
from copy import deepcopy
from .models import Game
from .World import api, retWinner, retFinished
# Create your views here.


def menu(request):
    return render(request, "menu.html")


def tiktaktoe(request):
    game = Game.objects.all()[0]
    finished = False #"0" in game.field
    return render(request, "TikTakToe.html", {"f": game.field, "finished": str(finished)})


def newGame(request):
    Game.objects.all().delete()
    Game.objects.create(start_player=request.POST["start_player"])
    return tiktaktoe(request)


def getMove(request):
    f = request.POST["field"]
    f = f.split(",")
    for a in range(len(f)):
        f[a] = int(f[a])
    sp = Game.objects.all()[0].start_player
    if not retFinished(f):
        m = api(f, sp)
        f[m] = -1

    finished = retFinished(f)

    #print(f)
    #print(finished)

    Game.objects.update(field=f)
    return JsonResponse({"f": f, "finished": str(finished)})


def getSp(request):
    sp = Game.objects.all()[0].start_player
    return JsonResponse({"sp": sp})


def getWinner(request):
    f = deepcopy(Game.objects.all()[0].field)
    f = f.replace("[", "")
    f = f.replace("]", "")
    f = f.split(",")
    for a in range(len(f)):
        f[a] = int(f[a])

    winner = retWinner(f)
    if winner is None:
        winner = 0
    return JsonResponse({"winner": winner})
