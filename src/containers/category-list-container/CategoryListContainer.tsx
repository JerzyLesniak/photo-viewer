import * as React from 'react';

import CategoryList from "../../components/category-list/CategoryList";
import {BaseObserverRoutedProps, default as RootStore} from "../../stores/RootStore";
import {inject, observer} from "mobx-react";

import * as spinner from "../../resources/loading.gif";

interface Props {
}

interface CategoryInjectedProps extends BaseObserverRoutedProps<object> {
}

interface State {
}

@inject('rootStore')
@observer
export default class CategoryContainer extends React.Component<Props, State> {
  rootStore: RootStore;

  get injected() {
    return this.props as CategoryInjectedProps;
  }

  constructor(props: BaseObserverRoutedProps<object>) {
    super(props);

    this.rootStore = this.injected.rootStore;
  }

  componentDidMount() {
    this.getMiniatures();
  }

  getMiniatures = async (): Promise<void> => {
    try {
      await this.rootStore.unsnplashApiStore.fetchCollectionsPhotos();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {latestCollections} = this.rootStore.unsnplashApiStore;
    if (!latestCollections || latestCollections.length < 1) {
      return <img src={spinner}/>
    }
    return (
      <CategoryList latestCollections={this.rootStore.unsnplashApiStore.latestCollections}/>
    )
  }
}