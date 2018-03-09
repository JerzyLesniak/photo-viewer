import * as React from "react";

import {Route, Switch} from "react-router-dom";
import routePaths from "./constants/routePaths";
import CategoryListContainer from "./containers/category-list-container/CategoryListContainer";
import AllPhotosContainer from "./containers/all-photos-container/AllPhotosContainer";

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="app--container">
        <Switch>
          <Route path={routePaths.allPhotos.idPath} component={AllPhotosContainer}/>
          <Route path={routePaths.root} component={CategoryListContainer}/>
        </Switch>
      </div>
    );
  }
}

export default App;
