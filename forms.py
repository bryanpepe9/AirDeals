from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField, DateField, IntegerField
from wtforms.validators import DataRequired, URL, Email
from flask_ckeditor import CKEditorField
from wtforms import ValidationError

# WTForm
# Form used for registering new users
class RegisterForm(FlaskForm):
    first_name = StringField("First Name", validators=[DataRequired()])
    last_name = StringField("Last Name", validators=[DataRequired()])
    email = StringField("Email", validators=[DataRequired()])
    password = PasswordField("Password", validators=[DataRequired()])
    submit = SubmitField("Sign me up!")

# Form used for authenticating existing users
class LoginForm(FlaskForm):
    email = StringField("Email", validators=[DataRequired()])
    password = PasswordField("Password", validators=[DataRequired()])
    submit = SubmitField("Log me in!")

# Form used for collecting flight info (for tracking)
class FlightSpecificationForm(FlaskForm):
    # Will need to add additional validators for this field
    fly_from = StringField('From', validators=[DataRequired()])
    fly_to = StringField('To', validators=[DataRequired()])
    date_from = DateField('Date From', validators=[DataRequired()])
    date_to = DateField('Date To', validators=[DataRequired()])
    flight_type = StringField('Flight Type')
    max_stopovers = IntegerField("Max Stopovers")
    max_fly_duration = IntegerField("Max Fly Duration")
    nights_in_dst_from = IntegerField("Min Number of Days in Destination")
    nights_in_dst_to = IntegerField("Max Number of Days in Destination")
    submit = SubmitField("Find me some flights!")

    def validate_flight_type(self, field):
        valid_flight_types = ['direct', 'round']
        if field.data.lower() not in valid_flight_types:
            raise ValidationError("Invalid flight type. Please choose either 'direct' or 'round'.")

    def validate_date_to(self, field):
        if self.date_from.data and field.data and self.date_from.data > field.data:
            raise ValidationError("'Date To' must be after 'Date From'.")








