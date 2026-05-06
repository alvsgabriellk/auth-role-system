from flask import Flask, request, jsonify, redirect, url_for
from flask_cors import CORS
from database import db
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:5500"]) # faz o back aceitar o front acessar a api
