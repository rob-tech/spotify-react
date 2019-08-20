import React, { Component } from 'react';

class Artist extends Component {
    state = {  }
    render() { 
        return (  
            <div>hel</div>
        );
    }

    componentDidMount = async () => {
        await this.fetchDetails(this.props.song.album.id);
      };
    
      componentDidUpdate = async prevProps => {
        if (prevProps.id !== this.props.id) {
          await this.fetchDetails(this.props.song.album.id);
        }
      };
    
        
     fetchDetails = async albumID => {
       albumID = this.props.match.params.song.album.id;
        var response = await fetch("http://www.omdbapi.com/?apikey=448f4427&i=" + albumID);
        var albums = await response.json();
        
        // var commentResp = await fetch("https://strive-school-testing-apis.herokuapp.com/api/comments/" + albumID,{
        //     headers: {Authorization: "Basic dXNlcjc6M1VVNWRZRnZlblJ1UlA3RQ=="}
        //   });
        // var comments = await commentResp.json();
    
        // this.setState({
        //   movieID: imdbID,
        //   movie: movie,
        //   comments: comments  
        // });
      }
}
 
export default Artist;