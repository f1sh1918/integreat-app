// @flow

import * as React from 'react'
import type { TFunction } from 'react-i18next'
import { withTranslation } from 'react-i18next'
import type Moment from 'moment'
import styled from 'styled-components/native'
import { type StyledComponent } from 'styled-components'
import type { ThemeType } from '../../theme/constants'
import { contentDirection } from '../../i18n/contentDirection'
import DateFormatter from 'api-client/src/i18n/DateFormatter'

const TimeStampText: StyledComponent<{||}, ThemeType, *> = styled.Text`
  color: ${props => props.theme.colors.textSecondaryColor};
  font-family: ${props => props.theme.fonts.native.contentFontRegular};
`

type DirectionContainerPropsType = {|
  language: string,
  children: React.Node,
  theme: ThemeType
|}

const DirectionContainer: StyledComponent<DirectionContainerPropsType, ThemeType, *> = styled.View`
  display: flex;
  flex-direction: ${props => contentDirection(props.language)};
`

type PropsType = {|
  lastUpdate: Moment,
  formatter: DateFormatter,
  t: TFunction,
  language: string,
  theme: ThemeType,
  showText?: boolean,
  format?: string
|}

export class TimeStamp extends React.PureComponent<PropsType> {
  render() {
    const { lastUpdate, formatter, t, language, theme, showText = true, format = 'LL' } = this.props
    // only show day, month and year
    const dateText = formatter.format(lastUpdate, {
      format
    })
    return (
      <DirectionContainer language={language} theme={theme}>
        {showText && <TimeStampText theme={theme}>{t('lastUpdate')} </TimeStampText>}
        <TimeStampText theme={theme}>{dateText}</TimeStampText>
      </DirectionContainer>
    )
  }
}

export default withTranslation<PropsType>('common')(TimeStamp)
