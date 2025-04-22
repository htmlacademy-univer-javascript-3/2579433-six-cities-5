import { useRef, useCallback } from 'react';
import { useAppDispatch } from '../store/store';
import { changeOfferStatus } from '../store/api-actions';
import { addToFavorites, removeFromFavorites } from '../store/reducers/favorite-page-process';

export function usePendingFavorites() {
  const pendingFavorites = useRef<Map<string, boolean>>(new Map());
  const dispatch = useAppDispatch();

  const toggleFavorite = (offerId: string, newStatus: boolean, initialStatus: boolean) => {
    if (newStatus === initialStatus) {
      pendingFavorites.current.delete(offerId);
    } else {
      pendingFavorites.current.set(offerId, newStatus);
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
