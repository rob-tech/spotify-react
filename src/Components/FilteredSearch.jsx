import React, { Component } from "react";
import { Row } from "reactstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Container } from "reactstrap";

class FilteredSearch extends Component {
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

        {this.props.filteredTitle && (
          <>
           <Container fluid className="mainContent">
            <Row className="titleRow"> {this.props.filteredTitle} </Row>
            <Slider className="slide" {...settings}>
              {this.props.filteredArtist &&
                this.props.filteredArtist.map(song => (
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
                        <a href={song.album.title}>{song.album.title}</a>
                      </h5>
                    </div>
                  </div>
                ))}
            </Slider>
            </Container>
          </>
        )}
      </>
    );
  }
}

export default FilteredSearch;
