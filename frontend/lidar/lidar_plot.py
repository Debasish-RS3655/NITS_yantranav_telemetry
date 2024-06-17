# code to fetch the latest scan from the central server and then plot here
# Debashish Buragohain

import os
from dotenv import load_dotenv
from urllib.parse import urljoin
import requests
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
import numpy as np

load_dotenv()
host = os.getenv('HOST_URL')


def fetch_lidar_data():
    response = requests.get(urljoin(host, '/lidar/scan'))
    if response.status_code == 200:
        return response.json()
    return []


def update(frame):
    data = (fetch_lidar_data())["data"]
    if data:
        print(data)
        # creating numpy arrays for angle and ranges in the data
        angles = np.array([point['angle'] for point in data])
        ranges = np.array([point['range'] for point in data])

        # clear the current plot
        ax.clear()

        # plot the new data
        ax.plot(angles, ranges, 'o', markersize=2)

        # set plot limits
        ax.set_ylim(0, max(ranges) if ranges.size > 0 else 1)
        ax.set_title('Live Lidar Data')

    else:
        print("No data received.")

# create a polar plot
fig, ax = plt.subplots(subplot_kw={'projection': 'polar'})

# use FuncAnimation to update the plot
ani = FuncAnimation(fig, update, interval=500)

# show the plot 
plt.show()