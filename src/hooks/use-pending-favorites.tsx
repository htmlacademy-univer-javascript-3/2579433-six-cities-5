import { useRef, useCallback } from 'react';
import { useAppDispatch } from '../store/store';
import { changeOfferStatus } from '../store/api-actions';
import { addToFavorites, removeFromFavorites } from '../store/reducers/favorite-page-process';
import { OfferInfo } from '../types/offer';

export function usePendingFavorites() {
  const pendingFavorites = useRef<Map<string, boolean>>(new Map());
  const dispatch = useAppDispatch();

  const toggleFavorite = (offer: OfferInfo, newStatus: boolean, initialStatus: boolean) => {
    const { id } = offer;

    if (newStatus === initialStatus) {
      pendingFavorites.current.delete(id);
    } else {
      pendingFavorites.current.set(id, newStatus);
    }

    // Немедленное локальное обновление списка
    if (newStatus) {
      dispatch(addToFavorites(offer));
    } else {
      dispatch(removeFromFavorites(offer.id));
    }
  };

  const flushFavorites = useCallback(() => {
    pendingFavorites.current.forEach((status, offerId) => {
      dispatch(changeOfferStatus({ offerId, status: Number(status) }));
    });
    pendingFavorites.current.clear();
  }, [dispatch]);

  return {toggleFavorite, flushFavorites} ;
}
