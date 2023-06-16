import smtplib
import time

class Email_Manager():
    def __init__(self, user_email):
        self.my_email = "pythonprogramming22@gmail.com"
        self.my_password = "qhabvqbgiehatywa"
        self.send_email(user_email)


def check_flights(self):
    # Implement the logic to check for flights and send notifications
    # This function should call the send email function when a flight matches the preferences
    pass

def send_email(self, user_email):
    with smtplib.SMTP(host="smtp.gmail.com", port=587) as connection:
        connection.starttls()
        connection.login(user=self.my_email, password=self.my_password)
        connection.sendmail(
            from_addr=self.my_email,
            to_addrs=user_email,
            msg="Subject: Alert: Overhead Space Station\n\nLook outside, the Internation Space Station is overhead."
        )

def run(self, interval_minutes):
    while True:
        self.check_flights()
        time.sleep(interval_minutes * 60)  # Delay execution for the specified interval



# Both of these will be moved to the main class once done
