import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Container, Row } from "reactstrap";
import NavBar from "./NavBar";
import FilteredSearch from "./FilteredSearch";

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
      genericArtist: null,
      genericArtistTitle: null
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
          <FilteredSearch
            filteredArtist={this.state.genericArtist}
            filteredTitle={this.state.genericArtistTitle}
          />
          {this.state.artistTitle &&
            this.state.artistTitle.map((title, index) => {
              var indTitle = index;
              return (
                <div key={index}>
                  {!this.state.genericArtistTitle && (
                    <Row className="titleRow"> {title} </Row>
                  )}
                  {this.state.collections &&
                    this.state.collections.map((collectionsObject, index) => {
                      var indObj = index;

                      if (indObj === indTitle) {
                        return (
                          <div key={index}>
                            {!this.state.genericArtist && (
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
                                        <h5>
                                          {" "}
                                          <a href={song.title}>{song.title}</a>
                                        </h5>
                                        <h5>
                                          {" "}
                                          <a href={song.album.title}>
                                            {song.album.title}
                                          </a>
                                        </h5>
                                      </div>
                                    </div>
                                  ))}
                              </Slider>
                            )}
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
      collection[index].artistSongs.forEach((songsObject, index) => {
        if (index === 0) {
          singleArtistName = songsObject.artist.name.toUpperCase();
          console.log(singleArtistName);
        }
      });

      artistNames.push(singleArtistName);

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
          generalArtistName = oneSongObject.artist.name.toUpperCase();
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
