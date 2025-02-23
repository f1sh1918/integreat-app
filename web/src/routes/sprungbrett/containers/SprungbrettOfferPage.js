// @flow

import * as React from 'react'
import { OfferModel, SprungbrettJobModel } from 'api-client'
import SprungbrettListItem from '../components/SprungbrettListItem'
import FailureSwitcher from '../../../modules/common/components/FailureSwitcher'
import { withTranslation, type TFunction } from 'react-i18next'
import List from '../../../modules/common/components/List'
import Caption from '../../../modules/common/components/Caption'
import styled, { type StyledComponent } from 'styled-components'
import CleanAnchor from '../../../modules/common/components/CleanAnchor'
import type { ThemeType } from 'build-configs/ThemeType'

const Image: StyledComponent<{||}, ThemeType, *> = styled.img`
  display: block;
  margin: 0 auto;
`

type PropsType = {|
  sprungbrettJobs: Array<SprungbrettJobModel>,
  offers: Array<OfferModel>,
  t: TFunction
|}

export class SprungbrettOfferPage extends React.Component<PropsType> {
  renderSprungbrettListItem = (job: SprungbrettJobModel): React.Node => <SprungbrettListItem key={job.id} job={job} />

  render() {
    const { sprungbrettJobs, offers, t } = this.props
    const offer: OfferModel | void = offers.find(offer => offer.alias === 'sprungbrett')

    if (!offer) {
      return <FailureSwitcher error={new Error('The Sprunbrett offer is not supported.')} />
    }

    return (
      <>
        <Caption title={offer.title} />
        <List
          noItemsMessage={t('noOffersAvailable')}
          renderItem={this.renderSprungbrettListItem}
          items={sprungbrettJobs}
        />
        <CleanAnchor href='https://www.sprungbrett-intowork.de'>
          <Image src={offer.thumbnail} />
        </CleanAnchor>
      </>
    )
  }
}

export default withTranslation('sprungbrett')(SprungbrettOfferPage)
