import { NavLink } from 'react-router-dom';
import style from './Navigation.module.css';
import classNames from 'classnames';

const getLinkClass = ({ isActive }) => 
  classNames(style.link, {
    [style.isActive]: isActive
  });


const Navigation = () => {
  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <NavLink className={getLinkClass} to="/" >Home</NavLink>
        <NavLink className={getLinkClass} to="/movies">Movies</NavLink>
      </nav>
    </header>
  );
}

export default Navigation;