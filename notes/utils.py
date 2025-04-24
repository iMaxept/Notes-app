from .models import Note
from .serializers import NoteSerializer
from rest_framework.response import Response


def getNotes(request):
     notes = Note.objects.all()
     serializer = NoteSerializer(notes, many=True)
     return Response(serializer.data)

def createNote(request):
     data = request.data
     note = Note.objects.create(
          title = data['title'],
          body = data['body']
     )
     serializer = NoteSerializer(note, many = False)
     return Response(serializer.data)


def getNote(request, id):
     note = Note.objects.get(id=id)
     serializer = NoteSerializer(note, many=False)
     return Response(serializer.data)


def updateNote(request,id):
     data = request.data
     note = Note.objects.get(id=id)
     serializer = NoteSerializer(instance=note, data=data)
     if serializer.is_valid():
        serializer.save()

     return Response(serializer.data)


def deleteNote(request, id):
     note = Note.objects.get(id=id)
     note.delete()
     return Response("Note has been deleted!")


