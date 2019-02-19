/* global fetch:false */
import get from 'lodash/get'
import {
  fetchEventsActionCreator,
  fetchFavouritesActionCreator,
  toggleFavouriteActionCreator,
  REHYDRATED,
  FETCH_FAVOURITES_TYPE,
  TOGGLE_FAVOURITE_TYPE } from '../actions'
import { eventTypeIdFilterSelector, getEventsApiUrl, getFavouritesApiUrl } from '../selectors'
import qs from 'query-string'

const fetchEvents = async (apiUrl, eventTypeId) => {
  let url = apiUrl
  if (eventTypeId) {
    url += '?' + qs.stringify({ eventTypeId })
  }
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json'
    }
  })

  const data = await response.json()
  const events = get(data, ['results', 'events'])

  if (!response.ok || !data.success || !events) {
    const error = new Error(get(data, ['error', 'message']) || 'Failed to fetch events')
    error.status = response.status
    throw error
  }

  return events
}

const fetchFavourites = async (apiUrl) => {
  let url = apiUrl
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json'
    }
  })
  const favourites = await response.json()
  if (!response.ok || !favourites) {
    const error = new Error('Failed to fetch favourites')
    error.status = response.status
    throw error
  }
  return favourites
}

const toggleFavourites = async (apiUrl, type) => {
  let url = apiUrl
  const response = await fetch(url, {
    method: type
  }, {
    headers: {
      Accept: 'application/json'
    }
  })
  const favourites = await response.json()
  if (!response.ok || !favourites) {
    const error = new Error('Failed to update favourites')
    error.status = response.status
    throw error
  }
  return favourites
}

export default store => next => action => {
  const ret = next(action)
  if (action.type === REHYDRATED) {
    const state = store.getState()
    const apiUrl = getEventsApiUrl(state)
    const eventTypeId = eventTypeIdFilterSelector(state)
    store.dispatch(fetchEventsActionCreator(fetchEvents(apiUrl, eventTypeId)))
  } else if (action.type === FETCH_FAVOURITES_TYPE) {
    const state = store.getState()
    const apiUrl = getFavouritesApiUrl(state)
    store.dispatch(fetchFavouritesActionCreator(fetchFavourites(apiUrl)))
  } else if (action.type === TOGGLE_FAVOURITE_TYPE) {
    const state = store.getState()
    let apiUrl = getFavouritesApiUrl(state)
    apiUrl = apiUrl + '/' + ret.payload.entityId
    const type = ret.payload.isFavourited ? 'PUT' : 'DELETE'
    store.dispatch(toggleFavouriteActionCreator(toggleFavourites(apiUrl, type)))
  }
  return ret
}
