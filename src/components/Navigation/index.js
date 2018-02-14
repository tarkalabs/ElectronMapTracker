import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';

const Navigation = (props, { authUser }) =>
  <div>
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </div>

Navigation.contextTypes = {
  authUser: PropTypes.object,
};

const NavigationAuth = () =>
  <ul class="nav">
    <li><Link style= {{"text-decoration": "none","color":"currentColor"}} to={routes.HOME}>Home</Link></li>
    <li><Link style= {{"text-decoration": "none","color":"currentColor"}} to={routes.ACCOUNT}>Account</Link></li>
    <li> <SignOutButton/> </li>
  </ul>

const NavigationNonAuth = () =>
  <ul class="nav" style= {{ "list-style": 'none'}}>
    <Link style= {{"text-decoration": "none","color":"currentColor"}} to={routes.LANDING}><h1>Tracker</h1></Link>
  </ul>

export default Navigation;
