// @flow

import * as React from 'react'

import { type TFunction, withTranslation } from 'react-i18next'
import { createFeedbackEndpoint, SEARCH_FEEDBACK_TYPE } from 'api-client'
import type { LocationState } from 'redux-first-router'
import { Description, StyledFeedbackBox } from '../../../modules/feedback/components/FeedbackBox'
import FeedbackComment from '../../../modules/feedback/components/FeedbackComment'
import { cmsApiBaseUrl } from '../../../modules/app/constants/urls'
import TextButton from '../../../modules/common/components/TextButton'
import buildConfig from '../../../modules/app/constants/buildConfig'

type PropsType = {|
  query?: string,
  location: LocationState,
  t: TFunction
|}

type StateType = {|
  comment: string,
  feedbackSent: boolean
|}

export class NothingFoundFeedbackBox extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props)
    this.state = { comment: '', feedbackSent: false }
  }

  handleCommentChanged = (comment: string) => this.setState({ comment })

  handleSubmit = () => {
    const { query, location } = this.props
    const { city, language } = location.payload
    const { comment } = this.state
    createFeedbackEndpoint(cmsApiBaseUrl).request({
      feedbackType: SEARCH_FEEDBACK_TYPE,
      isPositiveRating: false,
      comment,
      city,
      language,
      query
    })

    this.setState({ feedbackSent: true })
  }

  render() {
    const { feedbackSent, comment } = this.state
    const { t } = this.props

    return (
      <StyledFeedbackBox>
        {feedbackSent ? (
          <Description>{t('thanksMessage', { appName: buildConfig().appName })}</Description>
        ) : (
          <>
            <FeedbackComment
              comment={comment}
              commentMessage={t('wantedInformation')}
              onCommentChanged={this.handleCommentChanged}
            />
            <TextButton onClick={this.handleSubmit} text={t('send')} />
          </>
        )}
      </StyledFeedbackBox>
    )
  }
}

export default withTranslation<PropsType>('feedback')(NothingFoundFeedbackBox)
