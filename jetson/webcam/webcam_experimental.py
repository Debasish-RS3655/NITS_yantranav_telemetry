# python code to send the captured images contiuously to the server creating a stream
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

resolution_width = 255
resolution_height = 255
cap1 = cv2.VideoCapture(1)
cap2 = cv2.VideoCapture(0)
# setting the resolutions for the two cams
cap1.set(cv2.CAP_PROP_FRAME_WIDTH, resolution_width)
cap1.set(cv2.CAP_PROP_FRAME_HEIGHT, resolution_height)
cap2.set(cv2.CAP_PROP_FRAME_WIDTH, resolution_width)
cap2.set(cv2.CAP_PROP_FRAME_HEIGHT, resolution_height)

async def streamWebcam(cap, camid):
    while True:
        success, img = cap.read()     
        if success:
            # cv2.imshow("OUTPUT", img)
            _, imdata = cv2.imencode('.JPG', img)
            imdata_baes64 = base64.b64encode(imdata).decode('utf-8')
            print('.', end='', flush=True)

            # prepare the post request
            headers = {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
            payload = { 'image': imdata_baes64 }            
            requests.post(urljoin(host, f'/webcam/cam{camid}'), json=payload, headers=headers)
            # 40ms = 25 frames per second (1000ms/40ms), 
            # 1000ms = 1 frame per second (1000ms/1000ms)
            # but this will work only when `imshow()` is used.
            # Without `imshow()` it will need `time.sleep(0.04)` or `time.sleep(1)`
            if cv2.waitKey(40) == 27 :  # 40ms = 25 frames per second (1000ms/40ms) 
                cv2.destroyAllWindows()
                cv2.release()
                break        

# asyncio.run(streamWebcam(cap1))

async def main(): 
    task1 = asyncio.create_task(streamWebcam(cap1, "1"))
    task2 = asyncio.create_task(streamWebcam(cap2, "2"))
    await task1
    await task2


if __name__ == '__main__':
    asyncio.run(main())