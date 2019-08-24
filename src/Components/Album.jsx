import React, { Component } from "react";
import { Container } from "reactstrap";
import NavBar from "./NavBar";

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumDetails: null
    };
  }

  render() {
    return (
      <>
        <Container fluid className="mainContent">
        {this.state.albumDetails &&
            this.state.albumDetails.tracks.data.map((track, index) => {
              return(
                <div key={index}>
          <h5>{track.title}</h5>
          </div>
              )
            })}
        </Container>
      </>
    );
  }

  componentDidMount = async () => {
    var albumId = this.props.match.params.albumId;
    await this.fetchAlbum(albumId);
  };

  //   componentDidUpdate = async prevProps => {
  //     if (prevProps.song.album.id !== this.props.song.album.id) {
  //       await this.fetchDetails(this.props.song.album.id);
  //     }
  //   };

  fetchAlbum = async albumId => {
    var response = await fetch(
      "https://deezerdevs-deezer.p.rapidapi.com/album/" + albumId,
      {
        headers: {
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          "x-rapidapi-key": "784a08652cmsha32051208a637acp1f594djsna6648f90d98e"
        }
      }
    );

    var album = await response.json();

    this.setState({
      albumDetails: album
    });
  };
}

export default Album;
