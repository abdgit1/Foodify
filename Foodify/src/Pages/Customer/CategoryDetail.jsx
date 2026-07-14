import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MenuItemCard from '../../Components/HomeComponents/Menu/MenuItemCard';
import { getAllMenuItems } from '../../services/menuItemService';
import Navbar from '../../Components/CommonComponents/Navbar';
import Footer from '../../Components/CommonComponents/Footer';


const CategoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const loadItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const allItems = await getAllMenuItems();
        const filtered = allItems.filter(
          (item) => String(item.category?.id) === String(id)
        );

        if (!isCancelled) {
          setItems(filtered);
          setCategoryName(filtered[0]?.category?.name || '');
        }
      } catch (err) {
        if (!isCancelled) setError(err.message);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    loadItems();

    return () => {
      isCancelled = true;
    };
  }, [id]);

  return (
    <div>
          <Navbar />

    <section className="px-6 py-8">
    
      <h2 className="text-2xl font-bold mb-1">
        {categoryName ? `${categoryName} Menu Items` : 'Menu Items'}
      </h2>
      <p className="text-black/50 text-sm mb-6">
        {items.length} item{items.length === 1 ? '' : 's'} across all restaurants
      </p>

      {loading && (
        <p className="text-black/50 text-[15px]">Loading menu items…</p>
      )}

      {error && (
        <p className="text-red-500 text-[15px]">
          Couldn't load menu items right now. ({error})
        </p>
      )}

      {!loading && !error && items.length === 0 && (
        <p className="text-black/50 text-[15px]">No menu items found in this category.</p>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {items.map((item) => (
            <MenuItemCard
              key={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
              restaurantName={item.restaurant.name}
              onClick={() => navigate(`/restaurants/${item.restaurant.id}`)}
            />
          ))}
        </div>
      )}
    </section>
    <Footer />
    </div>
  );
};

export default CategoryDetail;