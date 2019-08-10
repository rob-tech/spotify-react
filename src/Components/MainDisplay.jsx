import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Row } from "reactstrap";

class MainDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [
        {title:"Grammatik", artistSongs: [] },
        {title:"Bonobo", artistSongs: [] },
        {title:"Fleetwood Mac", artistSongs: [] }
      ],
      // artistName: ["Grammatik", "Bonobo", "Fleetwood Mac"]
    };
  }

  render() {
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    };

    return (
      <>
        {this.state.collections &&
          this.state.collections.map((collectionsObject, index) => {
            return (
              <div key={index}>
                  <Row className = "titleRow">{collectionsObject.title}</Row>
                <Slider className="slide" {...settings}>
                  {collectionsObject.artistSongs &&
                    collectionsObject.artistSongs.map(song => (
                      <div key={song.id} className="display">
                        <img
                          className="img-fluid"
                          id="sliderImg"
                          width="auto"
                          height="auto"
                          src={song.album.cover_medium}
                          alt={song.title}
                        />
                        <div className="desc">
                        <h5>{song.title}</h5>
                        <h5 >{song.album.title}</h5>              
                        </div>
                      </div>
                    ))}
                </Slider>
              </div>
            );
          })}
      </>
    );
  }

  componentDidMount = async () => {
    await this.getSongs();
  };

  getSongs = () => {
    var artistName = ["Grammatik", "Bonobo", "Fleetwood Mac"]
    artistName.forEach(async (artist, index) => {
      var response = await fetch(
        "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + artist,
        {
          headers: {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key":
              "784a08652cmsha32051208a637acp1f594djsna6648f90d98e"
          }
        }
      );
      var songsArray = await response.json();
      var collection = this.state.collections;
      collection[index].artistSongs = songsArray.data;

      this.setState({
        collections: collection
      });
    });
  };
}

export default MainDisplay;
