import React, { useState, useEffect } from "react";
import "./styles/main.scss";
import ProgressBars from "./containers/ProgressBars";
import { ReactComponent as Bing } from "./images/bing.svg";
import { utils } from "./utils";

const App = () => {
  const [backgroundImageObj, setBackgroundImageObj] = useState(null);
  const [isImageSee, setIsImageSee] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url =
          "https://cors-anywhere.herokuapp.com/https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US";
        const response = await fetch(url);
        const responseJSON = await response.json();

        const imgURL = responseJSON.images[0].url;
        const copyrights = responseJSON.images[0].copyright;
        const copyrightlink = responseJSON.images[0].copyrightlink;
        const title = responseJSON.images[0].title;

        setBackgroundImageObj({
          imgURL: `https://www.bing.com${imgURL}`,
          copyrights,
          copyrightlink,
          title
        });
        utils.imageCache.toCache(imgURL, copyrights, copyrightlink, title);
      } catch {
        // load image from cache
        const cachedImg = utils.imageCache.fromCache();
        if (cachedImg) {
          setBackgroundImageObj({
            imgURL: `https://www.bing.com${cachedImg.imgURL}`,
            copyrights: cachedImg.copyrights,
            copyrightlink: cachedImg.copyrightlink,
            title: cachedImg.title
          });
        }
      }
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
      {backgroundImageObj && !isImageSee && <div className="App__shadow" />}
      <ProgressBars visible={!isImageSee} />
      {backgroundImageObj && (
        <a
          href={backgroundImageObj.copyrightlink}
          target="_blank"
          rel="noopener noreferrer"
          className="bing-img-desc"
          onMouseEnter={() => setIsImageSee(true)}
          onMouseLeave={() => setIsImageSee(false)}
        >
          <Bing />
          <p className="bing-img-desc_text">
            {backgroundImageObj && !isImageSee
              ? backgroundImageObj.title
              : backgroundImageObj.copyrights}
          </p>
        </a>
      )}
    </div>
  );
};

export default App;
