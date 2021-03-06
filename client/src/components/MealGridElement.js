import React from 'react';
import { Link } from 'react-router-dom';
import { GridTile } from 'material-ui/GridList';
import { Rating } from 'material-ui-rating';

const MealGridElement = function({ gridItem }) {
  return (
  <GridTile
    className="tile"
    key={gridItem.name}
    title={<Link to={`/meals/${gridItem.id}`} style={{color:'white', textDecoration: 'none'}}>{gridItem.name}</Link>}
    subtitle={<Link to={`/chefs-profile/${gridItem.chef.id}`} target="#" className="un-linkify" >by <b>{gridItem.chef.username}</b></Link>}
    actionIcon={<Rating value={Math.ceil(gridItem.rating)} max={5} readOnly={true} />}
  >
    <img src={gridItem.images} alt={gridItem.name}/>
  </GridTile>);
}

export default MealGridElement;