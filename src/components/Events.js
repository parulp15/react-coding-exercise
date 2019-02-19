import React from 'react'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getEvents, isEventsReady, getEventsError, getFavouritesSelector } from '../selectors'
import Icon from './Icon'
import titleIcon from '../icons/vivid-angle-top-left.svg'
import theme from '../style/theme'
import Event from './Event'

const Events = ({ classes, ready, events, error, favourites }) => {
  const event = ready ? (<div className={classes.tilesWrapper}>
    <div className={classes.tiles}>
      {events.map(event => {
        let isFavourite = false
        favourites && favourites.length > 0 && favourites.forEach(eventId => {
          if (eventId === event.id) {
            isFavourite = true
          }
        })
        event.isFavourited = isFavourite
        return <Event key={event.id} className={classes.tile} content={event} />
      })}
    </div>
  </div>
  ) : null
  return (
    <div className={classes.container}>
      <h3 className={classes.title}>
        <Icon className={classes.titleIcon} symbol={titleIcon} />
        Results <span className={events.length > 0 ? classes.show : classes.hide}>&nbsp;: {events.length}&nbsp; events found</span>
      </h3>
      {!ready && !error && <div className={classes.loaderContainer}>
        <div className={classes.loader} />
      </div>}
      {error && <div className={classes.error}> An unexpected error occured. Please try after sometime</div>}
      {event}
    </div>
  )
}

const mapStateToProps = (state) => ({
  ready: isEventsReady(state),
  events: getEvents(state),
  error: getEventsError(state),
  favourites: getFavouritesSelector(state)
})

export default compose(
  connect(mapStateToProps),
  injectSheet({
    title: {
      paddingLeft: 20,
      position: 'relative',
      display: 'flex'
    },
    titleIcon: {
      position: 'absolute',
      left: 0,
      top: 5
    },
    tilesWrapper: {
      margin: [0, 'auto'],
      maxWidth: theme.maxTileWidth,
      '@media (min-width: 768px)': {
        maxWidth: theme.maxTileWidth * 2 + theme.gutter
      },
      '@media (min-width: 1200px)': {
        maxWidth: theme.maxTileWidth * 3 + theme.gutter * 2
      }
    },
    tiles: {
      '@media (min-width: 768px)': {
        marginLeft: -theme.gutter / 2,
        marginRight: -theme.gutter / 2,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
      }
    },

    tile: {
      margin: [0, 'auto', theme.gutter],
      maxWidth: theme.maxTileWidth,
      '@media (min-width: 768px)': {
        marginLeft: theme.gutter / 2,
        marginRight: theme.gutter / 2,
        width: `calc(50% - ${theme.gutter}px)`
      },
      '@media (min-width: 1200px)': {
        width: `calc(${100 / 3}% - ${theme.gutter}px)`
      }
    },
    hide: {
      display: 'none'
    },
    show: {
      display: 'block'
    },
    loaderContainer: {
      height: '100%',
      width: '100%',
      backgroundColor: '#696969',
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '1000',
      opacity: '0.8'
    },
    loader: {
      border: '16px solid #f3f3f3',
      borderRadius: '50%',
      borderTop: '16px solid #3498db',
      width: '120px',
      height: '120px',
      animation: 'spin 2s linear infinite',
      top: '45%',
      left: '45%',
      position: 'absolute'
    },
    '@keyframes spin': {
      '0%': {
        transform: 'rotate(0deg)'
      },
      '100%': {
        transform: 'rotate(360deg)'
      }
    },
    error: {
      padding: '20px',
      textAlign: 'center',
      color: 'red',
      fontWeight: 'bold'
    }
  })
)(Events)
