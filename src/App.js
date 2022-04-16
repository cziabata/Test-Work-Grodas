import React, { useEffect, useState} from "react";
import './App.css';
import data from "./data.json";
import back_icon from "./icons/back.svg";
import next_icon from "./icons/next.svg";
import regular_star_icon from "./icons/star-regular.svg";
import solid_star_icon from "./icons/star-solid.svg";


function App() {

  // get and initialize state
  const [response, setResponse] = useState([]);
  const [portion, setPortion] = useState(0);
  const [mainImg, setMainImg] = useState();
  const [isFavour, setIsFavour] = useState(true)
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

  //slice high rate images arr to size described in design doc
  const slicedHighRateImages = highRateImages.slice(0, 5);

  return (
    <main className="app">
      {
        response.length > 0 && <div> 
          <h1>FEATURED IMAGES</h1>
          <section className="featuredImages_wpap">
            <div className="bigImage">
              <div className="arrow backArrow" onClick={()=>{
                if(portion === 0) {
                  setPortion(sliceArr(highRateImages).length - 1);
                } else { setPortion(portion - 1) }
              }}><img src={back_icon} alt="back"/></div>
              <div className="addToFavorite" onClick={()=>{setIsFavour(isFavour ? false : true)}}><img src={isFavour ? solid_star_icon : regular_star_icon} alt="star"/></div>
              <img src={require(`${(mainImg ? mainImg.image: null) || highRateImages[0].image || spinner}`)} alt="main img"/>
              <div className="boxShadow"></div>
              <div className="imgInfo">
                <div><span className="bigImgTitle">{(mainImg ? mainImg.title : null) || highRateImages[0].title}</span></div>
                <span className="imgTags">
                  {(mainImg 
                    ? mainImg.tags.map((tag, index)=><span key={index}><span>#{tag } </span></span>) 
                    : null) || highRateImages[0].tags.map((tag, index)=><span key={index}><span>#{tag } </span></span>)}
                </span>
              </div>
            </div>
            <div className="smallImage">
              {
                sliceArr(highRateImages)[portion].map((item, index) => 
                  <div key={item.id} 
                       className={ index === 0 ? "smallImages marginBottom" : "smallImages" } 
                       id="smallImg" 
                       onClick={()=>{setMainImg(item)}}>
                    <div className="addToFavorite"><img src={regular_star_icon} alt="star"/></div>
                    <img src={require(`${item.image}`)} alt={item.title}/>
                    <div className="boxShadow_small"></div>
                    <div className="imgInfo">
                      <div><span className="smallImgTitle">{item.title}</span></div>
                      {item.tags.map((tag, index)=><span key={index} className="imgTags"><span>#{tag} </span></span>)}
                    </div>
                  </div>
                )
              }
              <div className="arrow nextArrow" onClick={()=>{
                if(portion === sliceArr(highRateImages).length - 1) {
                  setPortion(0)
                } else { setPortion(portion + 1) }
              }}><img src={next_icon} alt="next"/></div>
            </div>
          </section>

          { /* MARKUP FOR 680px WIDTH START*/ }
          <section className="tablet_wpap">
          <div className="tablet_featuredImages_wpap marginBottom">
            <div className="bigImage">
              <img src={require(`${slicedHighRateImages[0].image}`)} alt="main img"/>
              <div className="boxShadow"></div>
              <div className="imgInfo">
                <div><span className="bigImgTitle">{slicedHighRateImages[0].title}</span></div>
                <span className="imgTags">
                  {slicedHighRateImages[0].tags.map((tag, index)=><span key={index}><span>#{tag } </span></span>)}
              </span>
            </div>
            </div>
          </div>

          <div className="tablet_featuredImages_wrap">
            {
              slicedHighRateImages.slice(1, 5).map((item, index) => 
                <div key={item.id} 
                    className={ (index === 0 ? "smallImages marginBottom marginRight" : index % 2 === 0 ? "smallImages marginRight" :"smallImages")  } 
                    id="smallImg">
                  <div className="addToFavorite"><img src={regular_star_icon} alt="star"/></div>
                  <img src={require(`${item.image}`)} alt={item.title}/>
                  <div className="boxShadow_small"></div>
                  <div className="imgInfo">
                    <div><span className="smallImgTitle">{item.title}</span></div>
                    {item.tags.map((tag, index)=><span key={index} className="imgTags"><span>#{tag} </span></span>)}
                  </div>
                </div>
              )
            }
          </div>
          </section>

          { /* MARKUP FOR 680px WIDTH END*/ }

          {/* MARKUP FOR 280px WIDTH START */}

          <section className="phone_featuredImages_wrap">
            {
              slicedHighRateImages.map((item, index) => 
                <div key={item.id} 
                    className={ index !== 0 ? "smallImages marginTop" :"smallImages"} 
                    id="smallImg">
                  <div className="addToFavorite"><img src={regular_star_icon} alt="star"/></div>
                  <img src={require(`${item.image}`)} alt={item.title}/>
                  <div className="boxShadow_small"></div>
                  <div className="imgInfo">
                    <div><span className="smallImgTitle">{item.title}</span></div>
                    {item.tags.map((tag, index)=><span key={index} className="imgTags"><span>#{tag} </span></span>)}
                  </div>
                </div>
              )
            }
          </section>
            
          {/* MARKUP FOR 280px WIDTH END */}

          <section>
            <h1>LAST IMAGES</h1>
            <div className="smallImages_flex">
              {
                newAgeImages.map((item, index) => 
                  <div key={item.id} className="cursorPointer">
                    <div className={ index !== 0 ? "smallImages marginRight marginTop" : "smallImages marginRight"}>
                      <img src={require(`${item.image}`)} alt={item.title}/>
                      <div className="addToFavorite"><img src={regular_star_icon} alt="star"/></div>
                    </div>
                    <div className="smallImg_wrap">
                      <div className="smallImgTitle_wrap"><span className="smallImgTitle">{item.title}</span></div>
                      <span>{item.tags.map((tag, index)=><span key={index} className="newImgTags"><span>#{tag} </span></span>)}</span>
                    </div>
                  </div>)
              }
              <div className="banner"><div>BANNER</div></div>
            </div>
          </section>
        </div>
      }
    </main>
  );
}

export default App;