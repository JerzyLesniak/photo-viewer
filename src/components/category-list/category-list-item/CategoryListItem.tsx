import * as React from 'react';

import {Link} from "react-router-dom";
import routePaths from "../../../constants/routePaths";

import './CategoryListItem.css'

interface Props {
  categoryName: string
}

export default class CategoryListItem extends React.PureComponent<Props> {
  render () {
    return (

      <Link className="category-list-item--container" to={routePaths.category}>
        <div className="category-list-item--title">
          {this.props.categoryName}
        </div>
      <div className="category-list-item--inner-container">
        <div className="category-list-item--miniature"/>
        <div className="category-list-item--miniature"/>
        <div className="category-list-item--miniature"/>
        <div className="category-list-item--miniature"/>
        <div className="category-list-item--miniature"/>
        <div className="category-list-item--miniature"/>
        <div className="category-list-item--miniature"/>
        <div className="category-list-item--miniature"/>
        <div className="category-list-item--miniature"/>
        <div className="category-list-item--miniature"/>
      </div>
      </Link>
    );
  }
}