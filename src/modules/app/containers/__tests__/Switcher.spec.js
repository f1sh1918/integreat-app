// @flow

import * as React from 'react'
import ConnectedSwitcher, { Switcher } from '../Switcher'
import Payload from '../../../endpoint/Payload'
import { shallow, mount } from 'enzyme'
import { CATEGORIES_ROUTE } from '../../routes/categories'
import { LANDING_ROUTE } from '../../routes/landing'
import { MAIN_DISCLAIMER_ROUTE } from '../../routes/mainDisclaimer'
import { EXTRAS_ROUTE } from '../../routes/extras'
import { EVENTS_ROUTE } from '../../routes/events'
import { DISCLAIMER_ROUTE } from '../../routes/disclaimer'
import { SEARCH_ROUTE } from '../../routes/search'
import { I18N_REDIRECT_ROUTE } from '../../routes/i18nRedirect'
import CityModel from '../../../endpoint/models/CityModel'
import CategoriesMapModel from '../../../endpoint/models/CategoriesMapModel'
import EventModel from '../../../endpoint/models/EventModel'
import ExtraModel from '../../../endpoint/models/ExtraModel'
import PageModel from '../../../endpoint/models/PageModel'
import CategoryModel from '../../../endpoint/models/CategoryModel'
import moment from 'moment-timezone'
import LanguageModel from '../../../endpoint/models/LanguageModel'
import SprungbrettJobModel from '../../../endpoint/models/SprungbrettJobModel'
import WohnenFormData from '../../../endpoint/models/WohnenFormData'
import WohnenOfferModel from '../../../endpoint/models/WohnenOfferModel'
import { SPRUNGBRETT_ROUTE } from '../../routes/sprungbrett'
import { WOHNEN_ROUTE } from '../../routes/wohnen'
import theme from '../../../theme/constants/theme'
import createReduxStore from '../../createReduxStore'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import DateModel from '../../../endpoint/models/DateModel'
import LocationModel from '../../../endpoint/models/LocationModel'
import PoiModel from '../../../endpoint/models/PoiModel'
import { POIS_ROUTE } from '../../routes/pois'

describe('Switcher', () => {
  const categories = new CategoriesMapModel([
    new CategoryModel({
      id: 1,
      path: 'path01',
      title: 'Title10',
      content: 'contnentl',
      thumbnail: 'thumb/nail',
      parentPath: 'parent/url',
      order: 4,
      availableLanguages: new Map(),
      lastUpdate: moment.tz('2017-11-18 09:30:00', 'UTC')
    })
  ])
  const disclaimer = new PageModel({
    id: 1689,
    title: 'Feedback, Kontakt und mögliches Engagement',
    content: 'this is a test content',
    lastUpdate: moment.tz('2017-11-18 09:30:00', 'UTC')
  })

  const extras = [
    new ExtraModel({
      alias: 'ihk-lehrstellenboerse',
      path: 'ihk-jobborese.com',
      title: 'Jobboerse',
      thumbnail: 'xy',
      postData: null
    }),
    new ExtraModel({
      alias: 'ihk-praktikumsboerse',
      path: 'ihk-pratkitkumsboerse.com',
      title: 'Praktikumsboerse',
      thumbnail: 'xy',
      postData: null
    })
  ]

  const events = [
    new EventModel({
      id: 1234,
      path: '/augsburg/en/events/nulltes_event',
      title: 'nulltes Event',
      date: new DateModel({
        allDay: false,
        startDate: moment(0),
        endDate: moment(0)
      }),
      content: 'Huiiii',
      excerpt: 'Buuuuh',
      thumbnail: 'Ich hab deine Nase!',
      location: new LocationModel({
        town: 'Schloss Burgeck',
        address: 'Adresse 0',
        postcode: 'postcode'
      }),
      availableLanguages: new Map(
        [['de', '/augsburg/de/events/nulltes_event'], ['ar', '/augsburg/ar/events/nulltes_event']]),
      lastUpdate: moment(0)
    })
  ]

  const cities = [
    new CityModel({
      name: 'Mambo No. 5',
      code: 'city1',
      live: true,
      eventsEnabled: true,
      extrasEnabled: false,
      sortingName: 'Mambo'
    })
  ]
  const languages = [
    new LanguageModel('de', 'Deutsch'),
    new LanguageModel('en', 'English')
  ]
  const sprungbrettJobs = [
    new SprungbrettJobModel({
      id: 0,
      title: 'WebDeveloper',
      location: 'Augsburg',
      isEmployment: true,
      isApprenticeship: true,
      url: 'http://awesome-jobs.domain'
    })
  ]
  const wohnenOffers = [
    new WohnenOfferModel({
      email: 'mail@mail.com',
      createdDate: moment('2018-07-24T00:00:00.000Z'),
      formDataType: WohnenFormData,
      formData: new WohnenFormData(
        {
          firstName: 'Max',
          lastName: 'Ammann',
          phone: ''
        },
        {
          ofRooms: ['kitchen', 'child2', 'child1', 'bed'],
          title: 'Test Angebot',
          location: 'Augsburg',
          totalArea: 120,
          totalRooms: 4,
          moveInDate: moment('2018-07-19T15:35:12.000Z'),
          ofRoomsDiff: ['bath', 'wc', 'child3', 'livingroom', 'hallway', 'store', 'basement', 'balcony']
        },
        {
          ofRunningServices: ['chimney', 'other'],
          ofAdditionalServices: ['garage'],
          baseRent: 1000,
          runningCosts: 1200,
          hotWaterInHeatingCosts: true,
          additionalCosts: 200,
          ofRunningServicesDiff: ['heating', 'water', 'garbage'],
          ofAdditionalServicesDiff: []
        })
    })
  ]

  const pois = [
    new PoiModel({
      id: 1,
      path: '/augsburg/en/locations/first_poi',
      title: 'first Event',
      availableLanguages: new Map(
        [['de', '/augsburg/de/locations/erster_poi'], ['ar', '/augsburg/ar/locations/erster_poi']]),
      location: new LocationModel({
        address: 'address',
        town: 'town',
        postcode: 'postcode'
      }),
      excerpt: 'excerpt',
      lastUpdate: moment('2016-01-07 10:36:24'),
      content: 'content',
      thumbnail: 'thumbnail'
    })
  ]

  const categoriesPayload = new Payload(false, 'https://random.api.json', categories, null)
  const eventsPayload = new Payload(false, 'https://random.api.json', events, null)
  const extrasPayload = new Payload(false, 'https://random.api.json', extras, null)
  const disclaimerPayload = new Payload(false, 'https://random.api.json', disclaimer, null)
  const citiesPayload = new Payload(false, 'https://random.api.json', cities, null)
  const languagesPayload = new Payload(false, 'https://random.api.json', languages, null)
  const sprungbrettPayload = new Payload(false, 'https://random.api.json', sprungbrettJobs, null)
  const wohnenPayload = new Payload(false, 'https://random.api.json', wohnenOffers, null)
  const poisPayload = new Payload(false, 'https://random.api.json', pois, null)

  const errorPayload = new Payload(false, 'https://random.api.json', null, new Error('fake news'))
  const fetchingPayload = new Payload(true)

  const createSwitcher = (currentRoute: string): React.Node =>
    <Switcher viewportSmall={false} currentRoute={currentRoute} citiesPayload={citiesPayload}
              categoriesPayload={categoriesPayload} eventsPayload={eventsPayload} extrasPayload={extrasPayload}
              poisPayload={poisPayload}
              disclaimerPayload={disclaimerPayload} languages={languages} city={'city1'} language={'de'}
              sprungbrettJobsPayload={sprungbrettPayload} wohnenPayload={wohnenPayload} param={'param'} darkMode />

  describe('layout', () => {
    it('should render a location layout if the current route is a location layout route', () => {
      const switcher = shallow(
        createSwitcher(CATEGORIES_ROUTE)
      )

      expect(switcher).toMatchSnapshot()
    })

    it('should render a layout with a footer if the current route is the landing route', () => {
      const switcher = shallow(
        createSwitcher(LANDING_ROUTE)
      )

      expect(switcher).toMatchSnapshot()
    })

    it('should render a layout with a header and a footer as default', () => {
      const switcher = shallow(
        createSwitcher(MAIN_DISCLAIMER_ROUTE)
      )

      expect(switcher).toMatchSnapshot()
    })
  })

  it('should return a spinner if the data has not been fetched yet', () => {
    expect(Switcher.renderFailureLoadingComponents([fetchingPayload])).toMatchSnapshot()
  })

  it('should return a failure if there was an error during fetching', () => {
    expect(Switcher.renderFailureLoadingComponents([errorPayload])).toMatchSnapshot()
  })

  describe('should get the right page if data has been fetched and', () => {
    it('is the categories route', () => {
      const switcher = shallow(
        createSwitcher(CATEGORIES_ROUTE)
      )

      expect(switcher).toMatchSnapshot()
    })

    it('is the extras route', () => {
      const switcher = shallow(
        createSwitcher(EXTRAS_ROUTE)
      )

      expect(switcher).toMatchSnapshot()
    })

    it('is the events route', () => {
      const switcher = shallow(
        createSwitcher(EVENTS_ROUTE)
      )

      expect(switcher).toMatchSnapshot()
    })

    it('is the disclaimer route', () => {
      const switcher = shallow(
        createSwitcher(DISCLAIMER_ROUTE)
      )

      expect(switcher).toMatchSnapshot()
    })

    it('is the search route', () => {
      const switcher = shallow(
        createSwitcher(SEARCH_ROUTE)
      )

      expect(switcher).toMatchSnapshot()
    })

    it('is the main disclaimer route', () => {
      const switcher = shallow(
        createSwitcher(MAIN_DISCLAIMER_ROUTE)
      )

      expect(switcher).toMatchSnapshot()
    })

    it('is the landing route', () => {
      const switcher = shallow(
        createSwitcher(LANDING_ROUTE)
      )

      expect(switcher).toMatchSnapshot()
    })

    it('is the i18nRedirect route', () => {
      const switcher = shallow(
        createSwitcher(I18N_REDIRECT_ROUTE)
      )

      expect(switcher).toMatchSnapshot()
    })

    it('is the wohnen route', () => {
      const switcher = shallow(
        createSwitcher(WOHNEN_ROUTE)
      )

      expect(switcher).toMatchSnapshot()
    })

    it('is the sprungbrett route', () => {
      const switcher = shallow(
        createSwitcher(SPRUNGBRETT_ROUTE)
      )

      expect(switcher).toMatchSnapshot()
    })

    it('is the pois route', () => {
      const switcher = shallow(
        createSwitcher(POIS_ROUTE)
      )

      expect(switcher).toMatchSnapshot()
    })
  })

  it('should map state to props', () => {
    const currentRoute = CATEGORIES_ROUTE
    const location = {
      type: currentRoute,
      payload: {city: 'augsburg', language: 'de'},
      prev: {payload: {param: 'param'}}
    }

    const store = createReduxStore({
      events: eventsPayload,
      cities: citiesPayload,
      categories: categoriesPayload,
      disclaimer: disclaimerPayload,
      extras: extrasPayload,
      languages: languagesPayload,
      pois: poisPayload,
      wohnen: wohnenPayload,
      sprungbrettJobs: sprungbrettPayload,
      viewport: {is: {small: true}},
      darkMode: true
    })
    store.getState().location = location
    store.getState().cities = citiesPayload

    const tree = mount(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <ConnectedSwitcher />
        </Provider>
      </ThemeProvider>
    )

    expect(tree.find(Switcher).props()).toEqual({
      currentRoute,
      categoriesPayload,
      eventsPayload,
      extrasPayload,
      citiesPayload,
      disclaimerPayload,
      sprungbrettJobsPayload: sprungbrettPayload,
      poisPayload,
      wohnenPayload,
      languages,
      dispatch: expect.any(Function),
      viewportSmall: true,
      city: 'augsburg',
      param: 'param',
      language: 'de',
      darkMode: true
    })
  })
})
