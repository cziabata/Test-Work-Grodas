import React, {useCallback, useEffect, useState} from "react";
import './App.css';
import data from "./data.json";
import back_icon from "./icons/back.svg";
import next_icon from "./icons/next.svg";


function App() {

  // get and initialize state
  const [response, setResponse] = useState([]);
  const [portion, setPortion] = useState(0);
  const [mainImg, setMainImg] = useState();
  const spinner = "./icons/spinner.svg";
  let getData = () => {
    return JSON.parse(JSON.stringify(data));
  };
  useEffect(()=>{
    setResponse(getData())
  }, []);

  // filter images by rate and age
  const getHighRateImages = (data) => {
    return data.filter(item=> item.rating >= 4);
  }
  const getNewAgeImages = (data) => {
    return data.filter(item=> item.age < 5);
  }
  
  //get images in arrays
  const highRateImages = getHighRateImages(response);
  const newAgeImages = getNewAgeImages(response);

  //slice arr to subarrays (to display images in slider)
  const sliceArr = (array) => {
    let size = 2; //subarray size (in accordance with the design)
    let slicedArr = [];
    for (let i = 0; i <Math.ceil(array.length/size); i++){
      slicedArr[i] = array.slice((i*size), (i*size) + size);
    }
    return slicedArr;
  }
  return (
    <div className="app">
      {
        response.length > 0 && <div> 
          <h1>FEATURED IMAGES</h1>
          <div className="featuredImages_wpap">
            <div className="bigImage">
              <div className="backArrow" onClick={()=>{
                if(portion === 0) {
                  setPortion(sliceArr(highRateImages).length - 1);
                } else { setPortion(portion - 1) }
              }}><img src={back_icon} alt="back"/></div>
              <img src={require(`${mainImg || highRateImages[0].image || spinner}`)} alt="main img"/>
              <div className="backArrow" onClick={()=>{
                if(portion === sliceArr(highRateImages).length - 1) {
                  setPortion(0)
                } else { setPortion(portion + 1) }
              }}><img src={next_icon} alt="next"/></div>
            </div>
            <div>
              {
                sliceArr(highRateImages)[portion].map(item => 
                  <div key={item.id} className="smallImages" id="smallImg" onClick={()=>{setMainImg(item.image)}}>
                    <img src={require(`${item.image}`)} alt={item.title}/>
                  </div>
                )
              }
            </div>
          </div>
          <div>
            <h1>LAST IMAGES</h1>
            <div>
              {
                newAgeImages.map(item => 
                  <div key={item.id} className="smallImages">
                    <div><img src={require(`${item.image}`)} alt={item.title}/></div>
                  </div>)
              }
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default App;

//<img src={require(`${response[0].image}`)} alt="dc"/>
