from twilio.rest import Client

account_sid = 'ACd77d2b299a684f3ed2289fc89c412e41'
auth_token = '7fe7d56264d95319a4e0a700013cda58'

# For Whatsapp Messages
# Twilio_Number = 'whatsapp:+14155238886'
# My_Number = 'whatsapp:+17542509086'

# For Regular SMS
Twilio_Number = '+18884955482'
My_Number = '+17542509086'


class SMS_Manager:
    def __init__(self, flights):
        self.flights = flights
        self.client = Client(account_sid, auth_token)

    def send_message(self):
        if self.flights:
            for num in range(0, 12):
                flight = self.flights[num]
                message = self.client.messages.create(
                    from_=Twilio_Number,
                    body=f"CHEAP FLIGHT ALERT!\nA flight from {flight['cityFrom']} to {flight['cityTo']} is now available for ${flight['price']}, on {flight['date']} at {flight['time']}.",
                    to=My_Number
                )
            print(message.sid)
        else:
            message = self.client.messages.create(
                    from_=Twilio_Number,
                    body="No Cheap Flights Found today.",
                    to=My_Number
            )
