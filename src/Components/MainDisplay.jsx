import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";

class MainDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [
        { artistSongs: [] },
        { artistSongs: [] },
        { artistSongs: [] }
      ],
      artistTitle: []
    };
  }

  render() {
    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 6,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6,
            infinite: false,
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
          breakpoint: 360,
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
        <Container fluid className="mainContent">
          {this.state.artistTitle &&
            this.state.artistTitle.map((title, index) => {
              var indTitle = index;
              return (
                <div key={index}>
                  <span className="titleRow"> {title} </span>
                  {this.state.collections &&
                    this.state.collections.map((collectionsObject, index) => {
                      var indObj = index;
                      if (indObj === indTitle) {
                        return (
                          <div key={index}>
                            <Slider className="slide" {...settings}>
                              {collectionsObject.artistSongs &&
                                collectionsObject.artistSongs.map(song => (
                                  <div key={song.id}>
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
                                      <Link
                                        to={"/album/" + song.album.id}
                                        className="titleLink"
                                      >
                                        <h5>{song.album.title}</h5>
                                      </Link>
                                    </div>
                                  </div>
                                ))}
                            </Slider>
                          </div>
                        );
                      }
                    })}
                </div>
              );
            })}
        </Container>
      </>
    );
  }

  componentDidMount = async () => {
    await this.getSongs();
  };

  getSongs = async () => {
    // var singleArtistName = "";
    var artistNames = [];
    var artistName = ["Grammatik", "Bonobo", "Fleetwood Mac"];
    artistName.forEach(async (artist, index) => {
      artistNames.push(artist);
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
      // collection[index].artistSongs.forEach((songsObject, index) => {
      //   console.log(songsObject)
      //   if (index === 0) {
      //     singleArtistName = songsObject.artist.name.toUpperCase();
      //     console.log(singleArtistName);

      //   }
      // });
      // artistNames.push(singleArtistName);

      this.setState({
        collections: collection,
        artistTitle: artistNames
      });
    });
  };
}

export default MainDisplay;
