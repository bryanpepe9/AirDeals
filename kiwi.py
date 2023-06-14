import requests
import datetime

airline_codes = []

class_codes = {
    'A': 'First Class Discounted',
    'B': 'Economy/Coach – Usually an upgradable fare to Business',
    'C': 'Business Class',
    'D': 'Business Class Discounted',
    'E': 'Shuttle Service (no reservation allowed) or Economy/Coach Discounted',
    'F': 'First Class',
    'G': 'Conditional Reservation',
    'H': 'Economy/Coach Discounted – Usually an upgradable fare to Business',
    'J': 'Business Class Premium',
    'K': 'Economy/Coach Discounted',
    'L': 'Economy/Coach Discounted',
    'M': 'Economy/Coach Discounted – Usually an upgradable fare to Business',
    'N': 'Economy/Coach Discounted',
    'P': 'First Class Premium',
    'Q': 'Economy/Coach Discounted',
    'R': 'First Class Suite or Supersonic (discontinued)',
    'S': 'Economy/Coach',
    'T': 'Economy/Coach Discounted',
    'U': 'Shuttle Service (no reservation needed/seat guaranteed)',
    'V': 'Economy/Coach Discounted',
    'W': 'Economy/Coach Premium',
    'X': 'Economy/Coach Discounted',
    'Y': 'Economy/Coach',
    'Z': 'Business Class Discounted'
}

class Kiwi:
    def __init__(self, search_params):
        self.API_KEY = {"apikey": '_P6fGt44-GSw23JSuC8guPqw58kkUYAH'}
        self.TEQUILA_ENDPOINT = 'https://api.tequila.kiwi.com/v2/search'
        self.params = self.get_parameters(search_params)
        self.api_results = self.make_api_call()
        self.filtered_results = self.organize_api_data(self.api_results)

    def get_parameters(self, search_params):
        params = {
            'fly_from': search_params.fly_from,
            'fly_to': search_params.fly_to,
            'price_to': 600,
            'date_from': search_params.date_from,
            'date_to': search_params.date_to,
            'nights_in_dst_from': search_params.nights_in_dst_from,
            'nights_in_dst_to': search_params.nights_in_dst_to,
            'max_fly_duration': search_params.max_fly_duration,
            'flight_type': search_params.flight_type,
            'max_stopovers': search_params.max_stopovers
        }
        return params

    def make_api_call(self):
        # Making a GET request to the Kiwi API endpoint passing in the parameters specified by the user
        results = requests.get(url=self.TEQUILA_ENDPOINT, headers=self.API_KEY, params=self.params)
        json = results.json()
        print(json)
        data = json['data']
        return data

    def organize_api_data(self, flights):
        filtered_data = []
        for flight in flights:
            current_flight = {
                'from': flight['cityFrom'],
                'to': flight['cityTo'],
                'price': flight['price'],
                'departureAirport': flight['flyFrom'],
                'arrivalAirport': flight['flyTo'],
                'airlines': flight['airlines'][0],
                'class': class_codes[flight['route'][0]['fare_category']],
                'departureDay': datetime.datetime.strptime(flight['route'][0]['local_departure'], '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%m/%d/%Y'),
                'departureTime': datetime.datetime.strptime(flight['route'][0]['local_departure'], '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%H:%M'),
                'returnDay': datetime.datetime.strptime(flight['route'][-1]['local_departure'], '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%m/%d/%Y'),
                'returnTime': datetime.datetime.strptime(flight['route'][-1]['local_departure'], '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%H:%M'),
                'flightNumber': flight['route'][0]['flight_no']
            }
            filtered_data.append(current_flight)
        print(filtered_data)
        return filtered_data
