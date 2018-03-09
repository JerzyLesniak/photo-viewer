import * as React from 'react';

import {CollectionImage} from "../../stores/UnsplashApiStore";

import './AllPhotos.css';


interface Props {
  collectionId: number;
  isLoading: boolean;
  photos: Array<CollectionImage>;
  onFetchMorePhotos: () => void;
}

export default class AllPhotos extends React.Component<Props> {
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {

    if (
      (window.scrollY >= document.body.scrollHeight * 0.55) &&
      this.props.photos.length &&
      !this.props.isLoading
    ) {
      this.props.onFetchMorePhotos();
    }
  }

  renderLocation = (location: any) => {
    if (location != null) {
      return <span>Location: {location}</span>
    }
  }

  render() {
    return (
      <div className="all-photos--container">
        <div className="all-photos--inner-container">
        {this.props.photos.map(item =>
          <div key={item.id} className="all-photos--photo-container">
            <img className="all-photos--photo" src={item.urls.small}/>
            <div className="all-photos--photo-info">
              <span>Likes: {item.likes}</span>
              <a href={item.user.links.html}>Link to author site</a>
              <a href={item.user.links.portfolio}>Author portfolio</a>
              {this.renderLocation(item.user.location)}
            </div>
          </div>
        )}
      </div>
      </div>
    );
  }
}

