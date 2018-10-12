from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for
)
from werkzeug.exceptions import abort
from database import db_session, User, Canvasser

#create canvasser blueprint
bp = Blueprint('canvasser', __name__, url_prefix='/canvasser')

#canvasser page url and render method
@bp.route('/canPage', methods=('GET', 'POST'))
def canPage():
    return render_template('canvasser_html/canvas.html')