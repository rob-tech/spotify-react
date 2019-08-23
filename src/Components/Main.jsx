import React, { Component } from "react";
import { SideBar } from "./SideBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainDisplay from "./MainDisplay";
import Album from "./Album";
import NavBar from "./NavBar";
import FilteredSearch from "./FilteredSearch";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genericArtist: null,
      genericArtistTitle: null
    };
  }

  search = value => {
    this.filterArtist(value);
  };

  render() {
    return (
      <Router>
        <SideBar />
        <NavBar triggerSearch={this.search} />
        <FilteredSearch
          filteredArtist={this.state.genericArtist}
          filteredTitle={this.state.genericArtistTitle}
        />
        {!this.state.genericArtistTitle && !this.state.genericArtist && (
          <Route path="/" exact component={MainDisplay} />
        )}
        <Route path="/album/:albumId" exact component={Album} />
        <Route path="/search" exact component={FilteredSearch} />
      </Router>
    );
  }

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

export default Main;
