import { useState } from 'react';
import { cars } from '../data/content';
import { Store } from './useStore';
import { useStoredState } from './useStoredState';
export function StoreProvider({ children }) {
  const [favorites, setFavorites] = useStoredState('abc-favorites-v2', []);
  const [compared, setCompared] = useStoredState('abc-compared-v2', []);
  const [modal, setModal] = useState(null);
  const [notice, setNotice] = useState('');
  const toggle = (setter, id) =>
    setter((previous) => (previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]));
  const value = {
    favorites: Array.isArray(favorites) ? favorites.filter((id) => cars.some((car) => car.id === id)) : [],
    compared: Array.isArray(compared) ? compared.filter((id) => cars.some((car) => car.id === id)) : [],
    toggleFavorite: (id) => toggle(setFavorites, id),
    toggleCompare: (id) => toggle(setCompared, id),
    clearFavorites: () => setFavorites([]),
    clearCompare: () => setCompared([]),
    modal,
    openModal: (type, car, extra = {}) => setModal({ type, car, ...extra }),
    closeModal: () => setModal(null),
    notice,
    setNotice,
  };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
