# covid_data_fetch_and_save.py

import os
# import requests
import json
import glob
from datetime import datetime

# Sample COVID-19 data for 2021 (replace this with real data from your data source)
covid_data_2021 = {
    'months': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    'confirmed_cases': [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000],
    'deaths': [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200],
    'recovered': [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000],
}

covid_data_2021_am_chart = [
    {'month': 'January', 'confirmed_cases': 1000, 'deaths': 100, 'recovered': 500},
    {'month': 'February', 'confirmed_cases': 2000, 'deaths': 600, 'recovered': 1000},
    {'month': 'March', 'confirmed_cases': 3000, 'deaths': 300, 'recovered': 7000},
    {'month': 'April', 'confirmed_cases': 1500, 'deaths': 200, 'recovered': 6000},
    {'month': 'May', 'confirmed_cases': 1000, 'deaths': 800, 'recovered': 500},
    {'month': 'June', 'confirmed_cases': 200, 'deaths': 300, 'recovered': 2100},
    {'month': 'July', 'confirmed_cases': 2000, 'deaths': 100, 'recovered': 300},
    {'month': 'August', 'confirmed_cases': 1300, 'deaths': 200, 'recovered': 300}
    # Add data for other months
]

def fetch_covid_data():
    # Replace the API_URL with the actual API endpoint to fetch COVID-19 data
    # API_URL = "https://api.example.com/covid_data"

    try:
        # response = requests.get(API_URL)
        # response.raise_for_status()  # Check for successful response
        covid_data = covid_data_2021_am_chart

        # Save the new data to a JSON file with the current timestamp in the filename
        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        
        extended_covid_data = {"timestamp": timestamp, "data": covid_data}
        
        new_filename = f"covid_data_{timestamp}.json"
        with open(new_filename, 'w') as file:
            json.dump(extended_covid_data, file)

        print(f"COVID-19 data fetched and saved to {new_filename}.")

        # Keep a maximum of 10 files and delete older files if the limit is reached
        max_files = 10
        files = glob.glob("covid_data_*.json")
        files.sort(key=os.path.getmtime)

        if len(files) > max_files:
            oldest_files = files[:len(files) - max_files]
            for file in oldest_files:
                os.remove(file)
                print(f"Old file {file} has been deleted.")

    # except requests.exceptions.RequestException as e:
    except Exception as e:
        print("Error fetching COVID-19 data:", e)

if __name__ == "__main__":
    fetch_covid_data()
