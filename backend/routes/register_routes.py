from database import db
from flask import Blueprint, request, redirect, url_for
from database import Usuario
from sqlalchemy.exc import IntegrityError

register_bp = Blueprint("register", __name__)
