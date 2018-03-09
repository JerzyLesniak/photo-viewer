import * as React from 'react';

import Slider from "react-slick";
import {Link} from "react-router-dom";
import {Collection, CollectionImage, CollectionsEnum} from "../../../stores/UnsplashApiStore";
import routePaths from "../../../constants/routePaths";

import './CategoryListItem.css'

interface Props {
  collectionId: number;
  collection: Collection;
}

const settings = {
  dots: false,
  slidesToShow: 5,
  adaptiveHeight: true,
  centerMode: true,
  centerPadding: '60px',
};

export default class CategoryListItem extends React.Component<Props> {
  render() {
    return (
      <Link className="category-list-item--container" to={`${routePaths.allPhotos.path}/${this.props.collectionId}`}>
        <div className="category-list-item--title">
          {CollectionsEnum.property[this.props.collectionId].name}
        </div>
        <Slider className="category-list-item--slider-container" {...settings}>
          {this.props.collection.images.map((image: CollectionImage) => (
            <div className="category-list-item--inner-container">
              <div key={image.id} className="category-list-item--miniature">
                <img className="category-list-item--miniature-img" src={image.urls.small}/>
              </div>
            </div>
          ))}
        </Slider>
      </Link>
    );
  }
}