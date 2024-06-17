# for the second webcam
# Debashish Buragohain

import asyncio
import os
from dotenv import load_dotenv
import requests
import cv2
from urllib.parse import urljoin
import base64

load_dotenv()
host = os.getenv('HOST_URL')
cap1 = cv2.VideoCapture(1)

async def streamWebcam(cap):
    while True:
        success, img = cap.read()     
        if success:
            cv2.imshow("OUTPUT", img)
            _, imdata = cv2.imencode('.JPG', img)
            imdata_baes64 = base64.b64encode(imdata).decode('utf-8')
            print('.', end='', flush=True)

            # prepare the post request
            headers = {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
            payload = { 'image': imdata_baes64 }            
            requests.post(urljoin(host, '/webcam/cam2'), json=payload, headers=headers)
            # 40ms = 25 frames per second (1000ms/40ms), 
            # 1000ms = 1 frame per second (1000ms/1000ms)
            # but this will work only when `imshow()` is used.
            # Without `imshow()` it will need `time.sleep(0.04)` or `time.sleep(1)`
            if cv2.waitKey(40) == 27 :  # 40ms = 25 frames per second (1000ms/40ms) 
                cv2.destroyAllWindows()
                cv2.release()
                break        

asyncio.run(streamWebcam(cap1))