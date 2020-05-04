import React from 'react'
import UserPlantsList from '../UserPlantsList'
import { Menu, Segment } from 'semantic-ui-react'
// import { Link, BrowserRouter as Router, Route} from 'react-router-dom'

export default function HeaderBar(props) {

  return(
    <React.Fragment>
    <div class="ui three item menu">
    <a href="/api/v1/users/myplants" Ccomponent={UserPlantsList} class="item active">SeeMyPlants</a>
    <a class="item">Reviews</a>
    <a class="item">Upcoming Events</a>
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
