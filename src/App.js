import React, { useState, useEffect } from "react";
import "./styles/main.scss";
import ProgressBars from "./containers/ProgressBars";
import { ReactComponent as Bing } from "./images/bing.svg";

const App = () => {
  const [backgroundImageObj, setBackgroundImageObj] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const url =
        "https://cors-anywhere.herokuapp.com/https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US";
      const response = await fetch(url);
      const responseJSON = await response.json();

      const imgURL = responseJSON.images[0].url;
      const copyrights = responseJSON.images[0].copyright;
      const copyrightlink = responseJSON.images[0].copyrightlink;

      setBackgroundImageObj({
        imgURL: `https://www.bing.com${imgURL}`,
        copyrights,
        copyrightlink
      });
    };
    
    fetchImage();
  }, []);

  return (
    <div className="App">
      {backgroundImageObj && (
        <div
          className="App__background"
          style={{
            background: `url(${backgroundImageObj.imgURL})`,
            backgroundAttachment: "fixed",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        />
      )}
      <ProgressBars />
      {backgroundImageObj && (
        <a
          href={backgroundImageObj.copyrightlink}
          target="_blank"
          rel="noopener noreferrer"
          className="bing-img-desc"
        >
          <Bing />
          <p className="bing-img-desc_text">{backgroundImageObj.copyrights}</p>
        </a>
      )}
    </div>
  );
};

export default App;
