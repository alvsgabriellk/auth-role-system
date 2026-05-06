from flask import Flask, request, jsonify, redirect, url_for
from flask_cors import CORS
from database import db
import os
from dotenv import load_dotenv

load_dotenv()

