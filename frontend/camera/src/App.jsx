import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const hostUrl = import.meta.env.VITE_HOST_URL;

  useEffect(() => {
    // async function to fetch the image from the backend
    const fetchImage = async (camid) => {
      const sleep = ms => new Promise(res => setTimeout(res, ms));
      try {
        while (true) {
          // fetch the image from the backend now
          const img = (await fetch(`${hostUrl}/webcam/cam${camid}`)
            .then(r => r.json())).image;

          if (camid == "1") {
            setImage1(img);
          }
          else if (camid == "2") {
            setImage2(img);
          }
          // delay added to make things stabler
          await sleep(100);   // initially keep it 100
        }
      }
      catch (err) {
        // set nulls according to the camera ids
        if (camid == "1") {
          setImage1(null);
        }
        else if (camid == "2") {
          setImage2(null);
        }
        console.error('Error fetching image: ', err);
      }
    }

    if (hostUrl) {
      fetchImage('1'); // fetch the image from the camera 1
      fetchImage('2');
    }
  }, [hostUrl]);

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Camera View Panel</h1>
        <h2>NITS Yantranav</h2>
        {image1 ?
          (<img
            src={`data:image/jpeg;base64,${image1}`}
            alt='Webcam feed'
          ></img>)
          : (<p>No image available</p>)}

        {image2 ?
          (<img
            src={`data:image/jpeg;base64,${image2}`}
            alt='Webcam feed'
          ></img>)
          : (<p>No image available</p>)}
      </header>
    </div>
  )
}

export default App;
