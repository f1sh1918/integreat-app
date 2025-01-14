// @flow

import { type Dispatch } from 'redux'
import { connect } from 'react-redux'
import Navigator from '../components/Navigator'
import type { StoreActionType } from '../StoreActionType'

type OwnPropsType = {|
  routeKey: ?string,
  routeName: ?string,
  cityCode: ?string,
  languageCode: ?string
|}

type DispatchPropsType = {|
  fetchCategory: (cityCode: string, language: string, key: string, forceUpdate: boolean) => void,
  fetchCities: (forceRefresh: boolean) => void
|}

type PropsType = {| ...OwnPropsType, ...DispatchPropsType |}

const mapDispatchToProps = (dispatch: Dispatch<StoreActionType>): DispatchPropsType => ({
  fetchCategory: (cityCode: string, language: string, key: string, forceUpdate: boolean) => {
    const path = `/${cityCode}/${language}`

    dispatch({
      type: 'FETCH_CATEGORY',
      params: {
        city: cityCode,
        language,
        path,
        depth: 2,
        criterion: { forceUpdate, shouldRefreshResources: true },
        key
      }
    })
  },
  fetchCities: (forceRefresh: boolean) => {
    dispatch({ type: 'FETCH_CITIES', params: { forceRefresh } })
  }
})

export default connect<PropsType, OwnPropsType, _, _, _, _>(undefined, mapDispatchToProps)(Navigator)
