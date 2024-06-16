import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const hostUrl = import.meta.env.VITE_HOST_URL;

  useEffect(() => {
    // async function to fetch the image from the backend
    const fetchImage = async (camid) => {
      const sleep = ms => new Promise(res => setTimeout(res, ms));
      try {
        while (true) {
          // fetch the image from the backend now
          const image = (await fetch(`${hostUrl}/webcam/cam${camid}`)
            .then(r => r.json())).image;
          setImage(image);
          // delay added to make things stabler
          await sleep(100);
        }
      }
      catch (err) {
        setImage(null);
        console.error('Error fetching image: ', err);
      }
    }

    if (hostUrl) fetchImage('1'); // fetch the image from the camera 1
  }, [hostUrl]);

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Webcam Viewer</h1>
        {image ? 
        (<img
          src={`data:image/jpeg;base64,${image}`}
          alt='Webcam feed'
        ></img>)
          : (<p>No image available</p>)}
      </header>
    </div>
  )
}

export default App;
