import { useState, useEffect } from 'react';
// import all gifs
function importAll(r) {
    return r.keys().map(r);
  }
  
const gifs = importAll(require.context('../gifs/', false, /\.(gif)$/));

// array of 20 gifs
export const deck = gifs.map(elem => 
    <img key={elem.toString()} src={elem} />
);