import * as React from 'react';

import {CollectionImage} from "../../stores/UnsplashApiStore";

import 'AllPhotos.css';

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
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - document.body.offsetHeight/2) &&
      this.props.photos.length &&
      !this.props.isLoading
    ) {
      this.props.onFetchMorePhotos();
    }
  }

  render() {
    const {photos} = this.props;
    return (
      <div className="all-photos--container">
        <div className="all-photos--section">
        {photos.map(item =>
          <div className="all-photos--photo-container" key={item.id}>
            <img className="all-photos--photo" src={item.urls.small}/>
          </div>
        )}
        </div>
      </div>
    );
  }
}