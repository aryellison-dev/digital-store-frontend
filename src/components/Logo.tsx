import { Link } from 'react-router-dom';
export default function Logo({light=false}:{light?:boolean}){
  return <Link to="/" className="logo" aria-label="Digital Store, página inicial">
    <img src={light?'/assets/logo-footer.svg':'/assets/logo-header.svg'} width="253" height="44" alt="Digital Store" />
  </Link>;
}
