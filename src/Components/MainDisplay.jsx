import React, { Component } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Row} from "reactstrap";


class MainDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
          collections: [
            {artist: [] },
            {artist: [] },
            // {artist: [] }
        ],

        };
      }

    render() { 
        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 4,
            mobileFirst: true,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,        
                }
              }
              // You can unslick at a given breakpoint now by adding:
              // settings: "unslick"
              // instead of a settings object
            ]
          };
 
          return (
            <>
      
                  {this.state.collections && this.state.collections.map((collectionsObject, index) => {                   
                 return(<div key={index}>
                   {/* <Row className = "titleRow">{collectionsObject.artist.title}</Row> */}
                 <Slider className="slide"  {...settings}>
                   {collectionsObject.artist && collectionsObject.artist.map(artist => (
                     <div key={artist.id} className="display">
                       <img className="img-fluid" id="sliderImg"  width="70%" height="auto" src={artist.album.cover_medium} alt={artist.title} />
                       <h5 className = "desc">{artist.artist.name}</h5>
                         <h5 className = "desc">{artist.title}</h5>                   
                      </div>
                   ))}
                 </Slider>
                 </div>
           ) })
             }

      </>
               )
        }

        componentDidMount = async () => {
            await this.getAlbumsGram();
            await this.getAlbumsEminem() 
        
          };
        
          getAlbumsGram = async () => {

            var response = await fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=grammatik" ,{
                headers: {	"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": "784a08652cmsha32051208a637acp1f594djsna6648f90d98e"}
              });
            var artistArray = await response.json(); 
            var collection = this.state.collections;
            collection[0].artist = artistArray.data;
        
            this.setState({
              collections: collection
            });
            console.log(collection[0].artist);
   
          };

          getAlbumsEminem = async () => {

            var response = await fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem" ,{
                headers: {	"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": "784a08652cmsha32051208a637acp1f594djsna6648f90d98e"}
              });
            var artistArray = await response.json(); 
            var collection = this.state.collections;
            collection[1].artist = artistArray.data;
        
            this.setState({
              collections: collection
            });
            console.log(collection[1].artist);
   
          };
}
 
export default MainDisplay;