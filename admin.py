from flask import (Blueprint, flash, g, redirect, render_template, request, url_for, session)
from werkzeug.exceptions import abort
from database import db_session, User, GlobalVariables
from werkzeug.security import check_password_hash, generate_password_hash
#create the admin blueprint

bp = Blueprint('admin', __name__, url_prefix='/admin')

#function to render the admin page and set the admin page url
@bp.route('/adminPage/<u_name>', methods=('GET', 'POST'))
def adminPage(u_name):
	email = None
	if 'user' in session:
		email = session['user']
	else:  #No user makes login
		return render_template('index.html') 
	if request.method == 'POST':  # Response to update
		workday = request.form['workday']
		movspeed = request.form['movspeed']
		if(workday is None or movspeed is None):  # No invalid values
			user_table = db_session.query(User).order_by(User.email).filter(User.email != email)
			# onwer_table = db_session.query(User).filter(User.email == email)
			global_table = db_session.query(GlobalVariables).first()
			return render_template('admin_html/admin.html',usr_session =user_table,gblvar_session= global_table,u_name=u_name)
		else:
			global_table= db_session.query(GlobalVariables).first()
			if(global_table.workDayLength != int(workday)):
				global_table.workDayLength = int(workday)
			if(global_table.averageSpeed != int(movspeed)):
				global_table.averageSpeed = int(movspeed)
			db_session.commit()

	user_table = db_session.query(User).order_by(User.email).filter(User.email != email )
	# onwer_table = db_session.query(User).filter(User.email == email).first()
	global_table = db_session.query(GlobalVariables).first()
	return render_template('admin_html/admin.html',usr_session =user_table ,gblvar_session= global_table,u_name=u_name)

@bp.route('/<email>/delete', methods=('GET', 'POST'))
def delete(email):
        if request.method == 'POST':
                deletedUser = User.query.filter(User.email == email).first()
                roles = Role.query.filter(Role.email ==email).all()
                for ele in roles:
                	deletedUser.users_relation.remove(ele)
                db_session.delete(deletedUser)
                db_session.commit()
                user = session['user']
                return redirect(url_for('admin.adminPage',u_name=user.name))

@bp.route('/editUser', methods=('GET', 'POST'))
def editUser():
        if request.method == 'POST':
                email = request.form['email']
                realEmail = request.form['realEmail']
                password = request.form['password']
                name = request.form['name']
                if(password == 'Secret Password'):
                        user = User.query.filter(User.email == email).first()
                        user.email = email
                        user.name = name
                        db_session.commit()
                        admin = session['user']
                        return redirect(url_for('admin.adminPage',u_name=admin.name))
                else:
                        user = User.query.filter(User.email == email).first()
                        user.email = email
                        user.name = name
                        user.password = generate_password_hash(password)
                        db_session.commit()
                        admin = session['user']
                        return redirect(url_for('admin.adminPage',u_name=admin.name))
                
# #function to render the admin page and set the admin page url
# @bp.route('/adminProfile/<u_email>', methods=('GET', 'POST'))
# def adminProfile(u_email):
# 	if request.method == 'POST':  # Response to update
# 		name = request.form['name']
# 		# imageFile = request.form['Upload photo']  ---> solve later
# 		email = request.form['email']
# 		pasword = request.form['pasword']
# 		pre_email= None
# 		if 'user' in session:
# 			pre_email = session['user'] # Getting current email
# 			print(pre_email)
# 		if pre_email is not None:
# 			onwer_table = db_session.query(User).filter(User.email == email).first()
# 			check_email =None
# 			if email != pre_email:#Change the email---> need to check if duplicate
# 	        	check_email = db_session.query(User).order_by(User.email).filter(User.email == email)
# 	        if check_email is not None:
# 	        	flask("duplicate email, please enter unique one")
# 	        else:
# 	        	change= False
# 	        	if onwer_table != email  :
# 	        		onwer_table.email = email
# 	        		change = True
# 	        	if onwer_table.name != name:
# 	        		onwer_table.name = name
# 	        		change = True
# 	        	if(not check_password_hash(onwer_table.password, password)):
# 	        		onwer_table.password = generate_password_hash(password)
# 	        		change = True
# 	        	if change:
# 	        		db_session.commit() #Update owenr_table
# 	elif request.method == 'GET':  # Response to get
# 		onwer_table = db_session.query(User).filter(User.email == u_email).first()
# 		request.form['name'] =  onwer_table.name
# 		request.form['Upload photo'] = url_for('static', filename='image/'+ u_email)
# 		request.form['email'] = onwer_table.email
# 		request.form['pasword'] = owenr_table.password

# 	return return redirect(url_for('admin.adminProfile',u_email=user.email))


