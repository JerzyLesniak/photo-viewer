import * as React from 'react';

import RootStore, {BaseObserverProps} from "../../stores/RootStore";
import {inject, observer} from "mobx-react";
import {RouteComponentProps} from "react-router";
import {CollectionImage} from "../../stores/UnsplashApiStore";
import CategoryAllPhotos from "../../components/all-photos/AllPhotos";

import * as spinner from "../../resources/loading.gif";

const applySetResult = (result: Array<CollectionImage>, page: number) => ({
  photos: result,
  page: page,
  isLoading: false,
  initialLoading: false,
});

const applyUpdateResult = (result: Array<CollectionImage>, page: number) => (prevState) => ({
  photos: [...prevState.photos, ...result],
  page: page,
  isLoading: false,
});

interface Params {
  collectionId: number;
}

interface Props extends RouteComponentProps<Params> {
}

interface InjectedProps extends BaseObserverProps, Props {
}

interface State {
  photos: Array<CollectionImage>,
  page: number,
  isLoading: boolean,
  initialLoading: boolean,
}

@inject('rootStore')
@observer
export default class AllPhotosContainer extends React.Component<Props, State> {
  rootStore: RootStore;

  get injected() {
    return this.props as InjectedProps;
  }

  constructor(props: Props) {
    super(props);

    this.rootStore = this.injected.rootStore;
    this.initialSearch()

    this.state = {
      photos: [],
      page: null,
      isLoading: false,
      initialLoading: true,
    };
  }

  initialSearch = () => {
    this.fetchPhotos(0);
  }

  onFetchMorePhotos = () => {
    this.fetchPhotos(this.state.page + 1);
  }

  fetchPhotos = async (page: number) => {
    this.setState({isLoading: true});
    const collectionId = this.props.match.params.collectionId;
    const result = await this.rootStore.unsnplashApiStore.fetchPaginatedCollectionPhotos(collectionId, page);

    this.onSetResult(result, page);
  }

  onSetResult = (images: Array<CollectionImage>, page: number) => {
    page === 0
      ? this.setState(applySetResult(images, page))
      : this.setState(applyUpdateResult(images, page));
  }

  render() {
    const collectionId = this.props.match.params.collectionId;
    if (this.state.initialLoading) {
      return (
        <div className="spinner">
          <img src={spinner}/>
        </div>
      );
    }
    return (
      <CategoryAllPhotos
        collectionId={collectionId}
        isLoading={this.state.isLoading}
        photos={this.state.photos}
        onFetchMorePhotos={this.onFetchMorePhotos}/>
    );
  }
}