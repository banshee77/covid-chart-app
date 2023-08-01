from flask import Flask, jsonify

app = Flask(__name__)

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
    {'month': 'June', 'confirmed_cases': 2000, 'deaths': 500, 'recovered': 2000}
    # Add data for other months
]

@app.route('/api/getCovidData')
def get_covid_data():
    data = covid_data_2021
    
    # Process the data and format it for the chart
    labels = [month for month in data['months']]
    confirmed_cases = data['confirmed_cases']
    deaths = data['deaths']
    recovered = data['recovered']

    chart_data = {
        'labels': labels,
        'datasets': [
            {
                'label': 'Confirmed Cases',
                'data': confirmed_cases,
                'backgroundColor': 'rgba(255, 99, 132, 0.6)',
            },
            {
                'label': 'Deaths',
                'data': deaths,
                'backgroundColor': 'rgba(54, 162, 235, 0.6)',
            },
            {
                'label': 'Recovered',
                'data': recovered,
                'backgroundColor': 'rgba(75, 192, 192, 0.6)',
            },
        ],
    }

    return jsonify(chart_data)

@app.route('/api/getCovidDataAmChart')
def get_covid_data_am_chart():
    return jsonify(covid_data_2021_am_chart)

if __name__ == '__main__':
    app.run()
