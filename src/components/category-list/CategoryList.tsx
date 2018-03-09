import * as React from 'react';

import CategoryListItem from "./category-list-item/CategoryListItem";
import {Collection, CollectionsEnum} from "../../stores/UnsplashApiStore";

import './CategoryList.css';

interface Props {
  latestCollections: Array<Collection>;
}

export default class Category extends React.Component<Props> {
  render() {
    return (
      <div className="category-list-container">
        {this.props.latestCollections.map((collection: Collection) => {
          return (
            <CategoryListItem
              key={collection.collectionId}
              collectionId={collection.collectionId}
              collection={collection}
            />
          )
        })}
      </div>
    );
  }
}