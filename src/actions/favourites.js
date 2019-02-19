export const FETCH_FAVOURITES_TYPE = 'FETCH_FAVOURITES'
export const TOGGLE_FAVOURITE_TYPE = 'TOGGLE_FAVOURITE'

export const fetchFavouritesActionCreator = promise => ({
  type: FETCH_FAVOURITES_TYPE,
  payload: promise
})

export const toggleFavouriteActionCreator = (promise, entityId, isFavourited) => ({
  type: TOGGLE_FAVOURITE_TYPE,
  payload: { entityId, promise, isFavourited }
})
