// @flow

import React from 'react'
import { shallow, mount } from 'enzyme'
import ConnectedHelmet, { Helmet } from '../Helmet'
import CategoriesMapModel from '../../../endpoint/models/CategoriesMapModel'
import LanguageModel from '../../../endpoint/models/LanguageModel'
import EventModel from '../../../endpoint/models/EventModel'
import CategoryModel from '../../../endpoint/models/CategoryModel'
import moment from 'moment'
import createHistory from '../../../app/createHistory'
import theme from '../../../theme/constants/theme'
import createReduxStore from '../../../app/createReduxStore'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import PoiModel from '../../../endpoint/models/PoiModel'

describe('Helmet', () => {
  const city = 'augsburg'
  const language = 'en'
  const languages = [
    new LanguageModel('de', 'Deutsch'),
    new LanguageModel('en', 'English'),
    new LanguageModel('ar', 'Arabic')
  ]

  const events = [
    new EventModel({
      id: 1234,
      title: 'nulltes Event',
      address: 'Adresse 0',
      allDay: false,
      startDate: moment(0),
      endDate: moment(0),
      content: 'Huiiii',
      excerpt: 'Buuuuh',
      thumbnail: 'Ich hab deine Nase!',
      town: 'Schloss Burgeck',
      availableLanguages: new Map([['de', 1], ['en', 2]])
    })]

  const categoryModels = [
    new CategoryModel({
      id: 3650,
      path: '/augsburg/en/welcome',
      title: 'Welcome',
      content: '',
      parentPath: '/augsburg/en',
      order: 75,
      lastUpdate: moment(0),
      availableLanguages: new Map([['de', '/augsburg/de/willkommen']]),
      thumbnail: 'https://cms.integreat-ap…/03/Hotline-150x150.png'
    })
  ]

  const pois = [
    new PoiModel({
      id: 493,
      path: '/augsburg/en/locations/cafe-tuer-an-tuer/',
      title: 'Cafe Tür an Tür',
      content: 'Leckeres Essen!',
      thumbnail: 'Random thumbnail',
      address: 'Wertachstraße 29',
      town: 'Augsburg',
      excerpt: 'Random excerpt',
      availableLanguages: new Map([['de', '/augsburg/de/locations/cafe-tuer-an-tuer/']]),
      postcode: '86153',
      latitude: '48,3782461',
      longitude: '10,8881861',
      lastUpdate: moment('2099-01-07 10:36:24')
    })
  ]

  const categories = new CategoriesMapModel(categoryModels)
  const title = 'Random title'

  const location = {pathname: '/augsburg/de/', payload: {city, language}}

  it('should render and match snapshot', () => {
    const helmet = shallow(
      <Helmet title={title}
              categories={categories}
              location={location}
              events={events}
              pois={pois}
              languages={languages} />
    )

    expect(helmet).toMatchSnapshot()
  })

  it('should map state to props', () => {
    const location = {type: 'DISCLAIMER', payload: {city, language}, pathname: '/augsburg/de/disclaimer'}

    const store = createReduxStore(createHistory, {
      languages: {data: languages},
      categories: {data: categories},
      events: {data: events},
      pois: {data: pois}
    })
    store.getState().location = location

    const tree = mount(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <ConnectedHelmet title={title} />
        </Provider>
      </ThemeProvider>
    )

    expect(tree.find(Helmet).props()).toEqual({
      languages,
      location,
      events,
      categories,
      pois,
      title,
      dispatch: expect.any(Function)
    })
  })
})
