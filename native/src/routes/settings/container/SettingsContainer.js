// @flow

import Settings, { type PropsType as SettingsPropsType } from '../components/Settings'
import withTheme from '../../../modules/theme/hocs/withTheme'
import { withTranslation, type TFunction } from 'react-i18next'
import { connect } from 'react-redux'
import type { StateType } from '../../../modules/app/StateType'
import { type Dispatch } from 'redux'
import type { StoreActionType } from '../../../modules/app/StoreActionType'
import type { NavigationPropType, RoutePropType } from '../../../modules/app/constants/NavigationTypes'
import type { SettingsRouteType } from 'api-client/src/routes'

type OwnPropsType = {|
  route: RoutePropType<SettingsRouteType>,
  navigation: NavigationPropType<SettingsRouteType>
|}

type StatePropsType = {|
  languageCode: string,
  cityCode: ?string
|}

type PropsType = {|
  ...OwnPropsType,
  ...StatePropsType,
  dispatch: Dispatch<StoreActionType>
|}

const mapStateToProps = (state: StateType): StatePropsType => {
  return { languageCode: state.contentLanguage, cityCode: state.cityContent?.city }
}

export default connect<PropsType, OwnPropsType, _, _, _, _>(mapStateToProps)(
  withTheme<$Diff<SettingsPropsType, {| t: TFunction |}>>(withTranslation<SettingsPropsType>('settings')(Settings))
)
