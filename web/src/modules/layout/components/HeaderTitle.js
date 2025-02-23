// @flow

import * as React from 'react'
import styled, { type StyledComponent } from 'styled-components'
import type { ThemeType } from 'build-configs/ThemeType'
import dimensions from '../../theme/constants/dimensions'

type PropsType = {|
  children: ?string
|}

const LONG_TITLE_LENGTH = 25
export const HEADER_TITLE_HEIGHT = 50

const HeaderTitleDiv: StyledComponent<{| long: boolean |}, ThemeType, *> = styled.div`
  display: flex;
  align-items: center;
  font-size: ${props => (props.long ? '1.3rem' : '1.8rem')};
  max-height: ${dimensions.headerHeightLarge};
  font-weight: 800;
  flex: 1;
  order: 2;
  padding: 0 10px;
  box-sizing: border-box;

  @media ${dimensions.minMaxWidth} {
    font-size: ${props => (props.long ? '1.5rem' : '1.8rem')};
  }

  @media ${dimensions.smallViewport} {
    font-size: ${props => (props.long ? '1.2rem' : '1.5rem')};
    height: ${HEADER_TITLE_HEIGHT}px;
    order: 3;
    min-width: 100%;
    justify-content: center;
    padding: 0 10px;
    text-align: center;
  }
`

/**
 * The title of a Header. Is only designed for the Header component.
 */
class HeaderTitle extends React.PureComponent<PropsType> {
  render() {
    const { children } = this.props
    return <HeaderTitleDiv long={(children?.length || 0) >= LONG_TITLE_LENGTH}>{children}</HeaderTitleDiv>
  }
}

export default HeaderTitle
