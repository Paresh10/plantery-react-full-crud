import React from 'react'
import UserPlantsList from '../UserPlantsList'
import { Menu, Segment } from 'semantic-ui-react'
import { Link, BrowserRouter as Router, Route} from 'react-router-dom'

export default function HeaderBar(props) {

  return(
    <React.Fragment>
      <div class="ui fixed borderless huge menu">
        <div class="ui container grid">
          <a class="header item">
          <Link to="/plants">
            Plantery
          </Link> </a>
          <a class="active item">
          <Link to="/users/myplants">
            SeeMyPlants
          </Link> </a>
        </div>
      </div>
    </React.Fragment>
  )

}
//
// <Router>
//   <Route path="../UserPlantsList" component={UserPlantsList}>
//   </Route>
//   <nav className="navbar navbar-default">
//     <div className="container">
//       <ul className="nav navbar-nav" >
//         <li><Link to={"../UserPlantsList"}> SeeMyPlants </Link> </li>
//       </ul>
//     </div>
//   </nav>
// </Router>
