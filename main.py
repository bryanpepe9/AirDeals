from flask import Flask, redirect, render_template, url_for, flash
from flask_bootstrap import Bootstrap
from flask_ckeditor import CKEditor
from datetime import date
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from flask_login import UserMixin, login_user, LoginManager, login_required, current_user, logout_user
from forms import LoginForm, RegisterForm, FlightSpecificationForm
from flask_gravatar import Gravatar
from functools import wraps
from flask import abort
from kiwi import Kiwi
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = '8BYkEfBA6O6donzWlSihBXox7C0sKR6b'
ckeditor = CKEditor(app)
Bootstrap(app)

# Connect to DB
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///AirDeals.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)

gravatar = Gravatar(app, size=100, rating='g', default='retro', force_default=False, force_lower=False, use_ssl=False, base_url=None)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Configure DB Tables - Using SQL Alchemy instead of regular SQL commands
class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

class FlightInfo(db.Model):
    __tablename__ = 'flight_info'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    fly_from = db.Column(db.String(20), nullable=False)
    fly_to = db.Column(db.String(20), nullable=False)
    date_from = db.Column(db.String(20), nullable=False)
    date_to = db.Column(db.String(20), nullable=False)
    flight_type = db.Column(db.String(20))
    max_stopovers = db.Column(db.Integer)
    max_fly_duration = db.Column(db.Integer)
    nights_in_dst_from = db.Column(db.String(20))
    nights_in_dst_to = db.Column(db.String(20))


with app.app_context():
    db.create_all()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if not user:
            flash("No user associated with this email, please try again.")
            return redirect(url_for('login'))
        elif not check_password_hash(pwhash=user.password, password=form.password.data):
            print(f"Entered password {form.password.data}, hashed password {user.password}")
            flash("Password incorrect, please try again.")
            return redirect(url_for('login'))
        else:
            login_user(user)
            print(f"Entered password {form.password.data}, hashed password {user.password}")
            return redirect(url_for("index"))
    return render_template("login.html", form=form, current_user=current_user)


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))



@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user:
            # print(user.first_name, user.password)
            flash("A user with this email already exists, use another email or log in instead.")
            return redirect(url_for('register'))
        else:
            hashed_and_salted_password = generate_password_hash(
                password=form.password.data,
                method='pbkdf2:sha256',
                salt_length=8
            )
            new_user = User(
                first_name=form.first_name.data,
                last_name=form.last_name.data,
                email=form.email.data,
                password=hashed_and_salted_password
            )
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user)
            return redirect(url_for('flight_search'))
    return render_template('register.html', form=form)

@app.route('/flight_search', methods=['GET', 'POST'])
def flight_search():
    form = FlightSpecificationForm()
    if form.validate_on_submit():
        if not current_user.is_authenticated:
            flash("You need to login or register to comment.")
            return redirect(url_for('login'))
        new_search = FlightInfo(
            user_id=current_user.id,
            fly_from=form.fly_from.data,
            fly_to=form.fly_to.data,
            date_from=form.date_from.data,
            date_to=form.date_to.data,
            flight_type=form.flight_type.data,
            max_stopovers=form.max_stopovers.data,
            max_fly_duration=form.max_fly_duration.data,
            nights_in_dst_from=form.nights_in_dst_from.data,
            nights_in_dst_to=form.nights_in_dst_to.data
        )
        print(new_search.user_id)
        db.session.add(new_search)
        db.session.commit()
        return redirect(url_for("results"))
    return render_template('flight_search.html', form=form)


@app.route('/tracking')
def tracking():
    tracked_flights = db.session.query(FlightInfo).filter(FlightInfo.user_id == current_user.id).all()
    return render_template('tracking.html', tracked_flights=tracked_flights)

@app.route('/edit/<int:flight_id>', methods=['GET', 'POST'])
def edit(flight_id):
    # The line below is used to query the row from the FlightInfo table that matches the flight_id that the user wants to alter
    flight_search = FlightInfo.query.get(flight_id)
    print(datetime.strptime(flight_search.date_from, '%Y-%m-%d'))
    print(type(datetime.strptime(flight_search.date_from, '%Y-%m-%d')))


    # Edit form contains the wtform already populated with the values for each attribute with the db values
    edit_form = FlightSpecificationForm(
        fly_from=flight_search.fly_from,
        fly_to=flight_search.fly_to,
        date_from=datetime.strptime(flight_search.date_from, '%Y-%m-%d'),
        date_to=datetime.strptime(flight_search.date_to, '%Y-%m-%d'),
        flight_type=flight_search.flight_type,
        max_stopovers=flight_search.max_stopovers,
        max_fly_duration=flight_search.max_fly_duration,
        nights_in_dst_from=flight_search.nights_in_dst_from,
        nights_in_dst_to=flight_search.nights_in_dst_to
    )

    # If the user submits the form from the edit page, any field that the user may have edited will be updated in the database
    if edit_form.validate_on_submit():
        flight_search.fly_from = edit_form.fly_from.data
        flight_search.fly_to = edit_form.fly_to.data
        flight_search.date_from = edit_form.date_from.data
        flight_search.date_to = edit_form.date_to.data
        flight_search.flight_type = edit_form.date_to.data
        flight_search.max_stopovers = edit_form.max_stopovers.data
        flight_search.max_fly_duration = edit_form.max_fly_duration.data
        flight_search.nights_in_dst_from = edit_form.nights_in_dst_from.data
        flight_search.nights_in_dst_to = edit_form.nights_in_dst_to.data
        db.session.commit()
        return redirect(url_for('tracking'))

    print(flight_search)

    #update the values in the database
    return render_template('edit.html', flight_id=flight_id, form=edit_form)


@app.route('/results')
def results():
    # Retrieve flight information from the database
    flight_info = FlightInfo.query.filter_by(user_id=current_user.id).first() # This needs to be fixed so it gets all rows matching the user id to perform multiple searches if needed
    if flight_info:
        flight_data = Kiwi(flight_info)
        flights_found = flight_data.filtered_results
    else:
        flights_found = None
    return render_template('results.html', flights_found=flights_found)


if __name__ == '__main__':
    app.run(debug=True)
