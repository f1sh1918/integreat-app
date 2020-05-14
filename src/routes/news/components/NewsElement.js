// @flow

import * as React from 'react'
import styled from 'styled-components'
import type Moment from 'moment'
import CleanLink from '../../../modules/common/components/CleanLink'
import LastUpdateInfo from './../../../modules/common/components/LastUpdateInfo'
import type { TFunction } from 'react-i18next'
import textTruncator from './../../../modules/common/utils/textTruncator'
import { LOCAL_NEWS } from '../constants'

const TRUNCATE_LETTERS_COUNT = 30

const Link = styled(CleanLink)`
  display: flex;
  background-color: ${({ theme }) => (theme.colors.backgroundColor)};
`
const ReadMoreLink = styled(({ type, ...props }) => <Link {...props} />)`
  align-self: flex-end;
  color: ${({ theme, type }) => type === LOCAL_NEWS ? theme.colors.themeColor : theme.colors.tunewsThemeColor};
  color: ${({ theme, type }) => type === LOCAL_NEWS ? theme.colors.themeColor : theme.colors.tunewsThemeColor};
  font-weight: 600;
`

const Description = styled.div`
  display: flex;
  height: 100%;
  min-width: 1px; /* needed to enable line breaks for too long words, exact value doesn't matter */
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
  font-family: Raleway;
  font-size: 18px;
  font-weight: 700;
`
const Body = styled.p`
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
  justify-content: space-between;
`

const StyledDate = styled(LastUpdateInfo)`
  font-size: 12px;
`

type PropsType = {|
  id: number,
  title: string,
  content: string,
  timestamp: Moment,
  language: string,
  path: string,
  type: string,
  t: TFunction
|}

class NewsElement extends React.PureComponent<PropsType> {
  renderContent (itemPath: string): React.Node {
    const { title, content, timestamp, language, t, type } = this.props
    return (
      <Description>
        <Title>{title}</Title>
        <Body>{textTruncator(content, TRUNCATE_LETTERS_COUNT)}</Body>
        <StyledContainer>
          <StyledDate lastUpdate={timestamp} language={language} />
          <ReadMoreLink to={itemPath} type={type}>{t('readMore')} ></ReadMoreLink>
        </StyledContainer>
      </Description>
    )
  }

  render () {
    const { path, id } = this.props
    const itemPath = `${path}/${id}`

    return (
      <StyledNewsElement>
        <Link to={itemPath}>
          {this.renderContent(itemPath)}
        </Link>
      </StyledNewsElement>
    )
  }
}

export default NewsElement
