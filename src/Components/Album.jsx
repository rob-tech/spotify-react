import React, { Component } from "react";
import { Container } from "reactstrap";
import NavBar from "./NavBar";

class Album extends Component {
  state = {};
  render() {
    return (
      <>
        <NavBar triggerSearch={this.props.search} />
        <Container fluid className="mainContent">
          <h5>hello</h5>
        </Container>
      </>
    );
  }

  componentDidMount = async () => {
    var albumId = this.props.match.params.albumId;
    await this.fetchAlbum(albumId)
  };

  //   componentDidUpdate = async prevProps => {
  //     if (prevProps.song.album.id !== this.props.song.album.id) {
  //       await this.fetchDetails(this.props.song.album.id);
  //     }
  //   };

  fetchAlbum = async(albumId) => {

 var response = await fetch(
        "https://deezerdevs-deezer.p.rapidapi.com/album/" + albumId,
        {
          headers: {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key":
              "784a08652cmsha32051208a637acp1f594djsna6648f90d98e"
          }
        }
      );

      console.log(response)

    //   this.setState({
    //     movieID: imdbID,
    //     movie: movie,
    //     comments: comments
    //   });
    }
}

export default Album;
