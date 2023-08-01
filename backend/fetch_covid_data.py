# fetch_covid_data.py

import os
import glob
import json

def get_latest_covid_data():
    # Get the list of JSON files with the format covid_data_{timestamp}.json
    files = glob.glob("covid_data_*.json")
    files.sort(key=os.path.getmtime)

    # Get the latest file
    latest_file = files[-1]

    # Read data from the latest file
    with open(latest_file, 'r') as file:
        covid_data = json.load(file)

    return covid_data

if __name__ == "__main__":
    latest_covid_data = get_latest_covid_data()
    print(latest_covid_data)
