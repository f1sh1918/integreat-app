// @flow

import * as React from 'react'
import styled from 'styled-components'
import { TunewsModel } from '@integreat-app/integreat-api-client'
import CleanLink from '../../../modules/common/components/CleanLink'
import LastUpdateInfo from './../../../modules/common/components/LastUpdateInfo'
import type { TFunction } from 'react-i18next'
import { textTruncator } from './../../../modules/theme/constants/helpers'

const Link = styled(CleanLink)`
  display: flex;
  background-color: white;
`

const ReadMoreLink = styled(CleanLink)`
  align-self: flex-end;
  color: ${({ theme }) => (theme.colors.secondaryAccentColor)};
  font-weight: 600;
`

const Description = styled.div`
  display: flex;
  height: 100%;
  min-width: 1px;
  flex-direction: column;
  flex-grow: 1;
  padding: 15px 10px 0;
  word-wrap: break-word;

  > * {
    padding-bottom: 10px;
  }
`

const Title = styled.h3`
  margin-bottom: 0;
  color: ${({ theme }) => (theme.colors.headlineTextColor)};
  font-family: Raleway;
  font-size: 18px;
  font-weight: 700;
`

const Body = styled.p`
  color: ${({ theme }) => (theme.colors.headlineTextColor)};
  font-size: 16px;
  line-height: 1.38;
`

const StyledNewsElement = styled.div`
  padding-bottom: 2px;
  background: linear-gradient(to left, rgba(168, 168, 168, 0.2), #bebebe 51%, rgba(168, 168, 168, 0.2));
`

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`

const StyledDate = styled(LastUpdateInfo)`
  color: ${({ theme }) => (theme.colors.headlineTextColor)};
  font-size: 12px;
`

type PropsType = {|
  newsItem: TunewsModel,
  path: string,
  language: string,
  city: string,
  t: TFunction
|}

const TRUNCATE_LETTERS_COUNT = 30

class TunewsElement extends React.PureComponent<PropsType> {
  renderContent (itemPath: string): React.Node {
    const { newsItem, t, language } = this.props
    return (
      <Description>
        <Title>{newsItem._title}</Title>
        <Body>{textTruncator(newsItem._content, TRUNCATE_LETTERS_COUNT)}</Body>
        <StyledContainer>
          <StyledDate lastUpdate={newsItem.date} language={language} withText={false} />
          <ReadMoreLink to={itemPath}>{t('readMore')} ></ReadMoreLink>
        </StyledContainer>
      </Description>
    )
  }

  render () {
    const { path, newsItem } = this.props
    const itemPath = `${path}/${newsItem._id}`

    return (
      <StyledNewsElement>
        <Link to={itemPath}>
          {this.renderContent(itemPath)}
        </Link>
      </StyledNewsElement>
    )
  }
}

export default TunewsElement
