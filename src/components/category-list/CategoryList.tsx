import * as React from 'react';

import CategoryListItem from "./category-list-item/CategoryListItem";

import './CategoryList.css';

export default class CategoryList extends React.PureComponent {

  render() {
    return (
      <div className="category-list-container">
        <CategoryListItem categoryName='Krajoobrazy'/>
        <CategoryListItem categoryName='Makro'/>
        <CategoryListItem categoryName='Astro-fotografia'/>
        <CategoryListItem categoryName='Czarno-białe'/>
        <CategoryListItem categoryName='Ludzie'/>
      </div>
    );
  }
}