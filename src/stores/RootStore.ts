import { observable } from 'mobx';
import { RouteComponentProps } from 'react-router';
import UnsplashApiStore from "./UnsplashApiStore";

export interface BaseObserverProps {
  rootStore: RootStore;
}

export interface BaseObserverRoutedProps<T> extends RouteComponentProps<T> {
  rootStore: RootStore;
}

export default class RootStore {
  @observable unsnplashApiStore: UnsplashApiStore;

  constructor() {
    this.unsnplashApiStore = new UnsplashApiStore(this);
  }
}
