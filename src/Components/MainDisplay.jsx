import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Container, Row } from "reactstrap";
import NavBar from "./NavBar";

class MainDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [
        { artistSongs: [] },
        { artistSongs: [] },
        { artistSongs: [] }
      ],
      artistTitle: [],
      genericArtist: [],
      genericArtistTitle: []
    };
  }

  search = value => {
    this.filterArtist(value);
  };

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
        <NavBar triggerSearch={this.search} />
        <Container fluid className="mainContent">
          {this.state.artistTitle &&
            this.state.artistTitle.map((title, index) => {
              var indTitle = index;
              return (
                <>
                  <Row className="titleRow"> {title} </Row>
                  {this.state.collections &&
                    this.state.collections.map((collectionsObject, index) => {
                      var indObj = index;
                      if (indObj === indTitle ) {
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
                                      <h5>{song.album.title}</h5>
                                    </div>
                                  </div>
                                ))}
                            </Slider>
                          </div>
                        );
                      }
                    })}
                </>
              );
            })}
        </Container>
      </>
    );
  }

  componentDidMount = async () => {
    await this.getSongs();
  };

  getSongs = () => {
    var singleArtistName = "";
    var artistNames = [];
    var artistName = ["Grammatik", "Bonobo", "Fleetwood Mac"];
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
      var songsArrayTwo = songsArray.data;
      console.log(songsArrayTwo);

      songsArrayTwo.forEach((songsObject, index) => {
        if (index === 0) {
          singleArtistName = songsObject.artist.name;
        }
      });
      artistNames.push(singleArtistName);
      console.log(artistNames);

      this.setState({
        collections: collection,
        artistTitle: artistNames
      });
    });
  };

  filterArtist = async filteredArtist => {
    var response = await fetch(
      "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + filteredArtist,
      {
        headers: {
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          "x-rapidapi-key": "784a08652cmsha32051208a637acp1f594djsna6648f90d98e"
        }
      }
    );

    var selectedArtist = await response.json();
    var genericArtists = selectedArtist.data;

    if (genericArtists != null) {
      var generalArtistName = "";

      var selectedArtistTwo = genericArtists;
      console.log(selectedArtistTwo);

      selectedArtistTwo.forEach((oneSongObject, index) => {
        if (index === 0) {
          generalArtistName = oneSongObject.artist.name;
        }
        console.log(generalArtistName);
      });
    }
    this.setState({
      genericArtistTitle: generalArtistName,
      genericArtist: genericArtists
    });
  };
}

export default MainDisplay;
