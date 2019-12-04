const cacheName = "cacheObj";

const toCache = (imgURL, image, copyrights, copyrightlink) => {
  localStorage.clear();

  const cacheObj = {
    imgURL,
    image,
    copyrights,
    copyrightlink
  };
  localStorage.setItem(cacheName, JSON.stringify(cacheObj));
};

const fromCache = () => JSON.parse(localStorage.getItem(cacheName));

export { toCache, fromCache };
