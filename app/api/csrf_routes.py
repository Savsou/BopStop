from flask import Blueprint, request, jsonify, session
from flask_wtf.csrf import validate_csrf

csrf_routes = Blueprint('csrf', __name__)

@csrf_routes.route("/")
def checkCSRF():
  if(request.cookies.get('csrf_token')):
    return jsonify(csrf_token=request.cookies.get('csrf_token'))
  return jsonify(csrf_token=session.get('csrf_token'))
