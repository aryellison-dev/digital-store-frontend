import {useState} from 'react';
import {Link} from 'react-router-dom';
import {ChevronLeft,ChevronRight,Shirt,Footprints,Headphones,ArrowRight} from 'lucide-react';
import Section from '../components/Section';
import ProductListing from '../components/ProductListing';
import {asset,products} from '../data/products';

const slides=[
 {eyebrow:'Melhores ofertas personalizadas',title:<>Queima de<br/>estoque Nike 🔥</>,caption:'Consequat culpa exercitation mollit nisi excepteur do do tempor laboris eiusmod irure consectetur.',image:'/assets/figma-nike-hero.png'},
 {eyebrow:'Ofertas imperdíveis',title:<>Seu estilo, suas regras.</>,caption:'Descubra os produtos que combinam com você.',image:asset('home-slide-1.jpeg')},
 {eyebrow:'Coleção em destaque',title:<>Encontre seu próximo favorito.</>,caption:'Uma seleção especial para todos os momentos.',image:asset('home-slide-2.jpeg')},
 {eyebrow:'Novidades para você',title:<>Novos estilos chegaram.</>,caption:'Explore a coleção e aproveite nossas ofertas.',image:asset('home-slide-3.jpeg')}
];
const collections=[{label:'Novo drop Supreme',image:'collection-1.png'},{label:'Coleção Adidas',image:'collection-2.png'},{label:'Novo Beats Bass',image:'collection-3.png'}];
const categories=[{label:'Camisetas',icon:Shirt},{label:'Calças',icon:Shirt},{label:'Bonés',icon:Shirt},{label:'Headphones',icon:Headphones},{label:'Tênis',icon:Footprints}];
export default function HomePage(){const [active,setActive]=useState(0);const current=slides[active];return <>
<section className="figma-hero" aria-label="Ofertas em destaque">
  <div className="container figma-hero-inner">
    <div className="figma-hero-copy"><p className="figma-eyebrow">{current.eyebrow}</p><h1>{current.title}</h1><p className="figma-hero-description">{current.caption}</p><Link to="/products" className="button button--primary figma-hero-button">Ver Ofertas</Link></div>
    <div className="figma-hero-visual"><img src={current.image} alt="Tênis em destaque da campanha"/><span className="figma-hero-speckles" aria-hidden="true"/></div>
    <button type="button" className="figma-hero-arrow figma-hero-arrow-left" aria-label="Slide anterior" onClick={()=>setActive((active+slides.length-1)%slides.length)}><ChevronLeft/></button>
    <button type="button" className="figma-hero-arrow figma-hero-arrow-right" aria-label="Próximo slide" onClick={()=>setActive((active+1)%slides.length)}><ChevronRight/></button>
    <div className="figma-hero-dots" aria-label="Selecionar destaque">{slides.map((_,i)=><button type="button" key={i} aria-label={`Exibir destaque ${i+1}`} aria-current={active===i?'true':undefined} className={active===i?'active':''} onClick={()=>setActive(i)}/>)}</div>
  </div>
</section>
<div className="figma-home-body"><div className="container figma-home-sections">
  <Section title="Coleções em destaque"><div className="figma-collections">{collections.map(collection=><Link to="/products" key={collection.image} className="figma-collection-card"><img src={asset(collection.image)} alt={collection.label}/><span className="figma-collection-discount">30% OFF</span><span className="figma-collection-cta">Comprar</span></Link>)}</div></Section>
  <section className="figma-categories"><h2>Coleções em destaque</h2><div className="figma-categories-items">{categories.map(({label,icon:Icon})=><Link key={label} to={`/products?category=${encodeURIComponent(label)}`}><span className="figma-category-icon"><Icon size={35} strokeWidth={1.8}/></span><span>{label}</span></Link>)}</div></section>
  <Section title="Produtos em alta" link={{text:'Ver todos',href:'/products'}}><ProductListing products={products.slice(0,8)}/></Section>
</div></div>
<section className="figma-offer"><div className="container figma-offer-inner"><div className="figma-offer-visual"><img src="/assets/figma-air-jordan.png" alt="Tênis Air Jordan em edição de colecionador"/></div><div className="figma-offer-copy"><p className="figma-eyebrow">Oferta especial</p><h2>Air Jordan edição de colecionador</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><Link className="button button--primary" to="/products">Ver Oferta <ArrowRight size={16}/></Link></div></div></section>
</>}
