import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterGroup from '../components/FilterGroup';
import ProductListing from '../components/ProductListing';
import { products } from '../data/products';

const brandOptions = ['Adidas', 'Balenciaga', 'K-Swiss', 'Nike', 'Puma'];
const categoryOptions = ['Esporte e lazer', 'Casual', 'Utilitário', 'Corrida'];

export default function ProductListingPage() {
  const [params] = useSearchParams();
  const filter = params.get('filter')?.trim().toLowerCase() ?? '';
  const category = params.get('category') ?? '';
  const [sort, setSort] = useState('featured');
  const [brands, setBrands] = useState<string[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [genders, setGenders] = useState<string[]>([]);
  const [conditions, setConditions] = useState<string[]>([]);

  const found = useMemo(() => products
    .filter(product =>
      (!filter || `${product.name} ${product.brand} ${product.category} ${product.description}`.toLowerCase().includes(filter)) &&
      (!category || product.category === category) &&
      (!brands.length || brands.includes(product.brand)) &&
      (!departments.length || (product.department && departments.includes(product.department))) &&
      (!genders.length || genders.includes(product.gender)) &&
      (!conditions.length || conditions.includes(product.condition))
    )
    .sort((a, b) => sort === 'lowest'
      ? (a.priceDiscount ?? a.price) - (b.priceDiscount ?? b.price)
      : sort === 'highest'
        ? (b.priceDiscount ?? b.price) - (a.priceDiscount ?? a.price)
        : 0),
    [filter, category, sort, brands, departments, genders, conditions]
  );

  function clearFilters() {
    setBrands([]);
    setDepartments([]);
    setGenders([]);
    setConditions([]);
    setSort('featured');
  }

  return (
    <div className="catalog-page">
      <div className="container">
        <div className="catalog-toolbar">
          <div className="catalog-summary">
            <strong>{filter ? `Resultados para “${filter}”` : category ? `Resultados para “${category}”` : 'Todos os produtos'}</strong>
            {' — '}{found.length} produtos
          </div>
          <label className="sort-label">
            Ordenar por:
            <select value={sort} onChange={event => setSort(event.target.value)}>
              <option value="featured">Mais relevantes</option>
              <option value="lowest">Menor preço</option>
              <option value="highest">Maior preço</option>
            </select>
          </label>
        </div>
        <div className="catalog-layout">
          <aside className="sidebar" aria-label="Filtros de produtos">
            <div className="filter-panel">
              <h2>Filtrar por</h2>
              <FilterGroup title="Marca" inputType="checkbox" options={brandOptions.map(text => ({ text }))} selected={brands} onChange={setBrands} />
              <FilterGroup title="Categoria" inputType="checkbox" options={categoryOptions.map(text => ({ text }))} selected={departments} onChange={setDepartments} />
              <FilterGroup title="Gênero" inputType="checkbox" options={['Masculino', 'Feminino', 'Unissex'].map(text => ({ text }))} selected={genders} onChange={setGenders} />
              <FilterGroup title="Estado" inputType="radio" options={['Novo', 'Usado'].map(text => ({ text }))} selected={conditions} onChange={setConditions} />
              <button type="button" className="clear-filters" onClick={clearFilters}>Limpar filtros</button>
            </div>
          </aside>
          <div className="catalog-results">
            {found.length ? <ProductListing products={found} /> : (
              <div className="empty-state">
                <h2>Nenhum produto encontrado</h2>
                <p>Tente alterar sua busca ou remover algum filtro.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
