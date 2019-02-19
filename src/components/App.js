import React, { Component } from 'react'
import { compose } from 'redux'
import injectSheet from 'react-jss'
import { connect } from 'react-redux'
import Events from './Events'
import theme from '../style/theme'
import { fetchFavouritesActionCreator } from '../actions'

class App extends Component {
  componentDidMount () {
    this.props.fetchFavourites()
  }
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12'>
            <Events />
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchFavourites: () => dispatch(fetchFavouritesActionCreator())
  }
}

export default compose(
  connect(null, mapDispatchToProps),
  injectSheet({
    '@global': {
      body: {
        fontFamily: theme.fonts.body,
        color: theme.colors.text
      },
      'h1, h2, h3, h4, h5, h6': {
        fontFamily: theme.fonts.headings,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: theme.colors.heading
      },
      a: {
        '&:hover': {
          color: theme.colors.primary,
          transition: 'color 0.3s ease-in'
        }
      }
    }
  })
)(App)
