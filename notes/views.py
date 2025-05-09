from rest_framework.response import Response
from rest_framework.decorators import api_view
from .utils import getNote, getNotes,createNote, updateNote, deleteNote


@api_view(['GET'])
def getRoutes(request):
     
     routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
     ]
     return Response(routes)

@api_view(['GET', 'POST'])
def getNotesList(request):
     if request.method == 'GET':
          return getNotes(request)
     if request.method == 'POST':
          return createNote(request)

#Routes for a specific note
@api_view(['GET', 'PUT', 'DELETE'])
def getNoteDetail(request, id):
     if request.method == 'GET':
          return getNote(request, id)
     if request.method == 'PUT':
          return updateNote(request, id)
     if request.method == 'DELETE':
          return deleteNote(request, id)