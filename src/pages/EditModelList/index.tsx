import React, { useCallback, useState } from 'react'

import {
  AuthModalContents,
  RequestModalContents,
  ResponseModalContents,
} from './components/ModalContents'
import { PayloadModelItemContainer } from './components/PayloadModelItemContainer'
import { AuthModelItemContainer } from './components/AuthModelItemContainer'
import { PageTitle } from '../../components/PageTitle'
import { Button } from '../../components/Button'
import { Plus } from '../../components/Icons'
import { Modal } from '../../components/Modal'
import * as T from './types'
import './styles.css'

const AUTHENTICATION_MODELS_MOCK: T.AuthModelItemContainerProps[] = [
  { authTitle: 'Admin Auth', authType: 'Bearer Token' },
  { authTitle: 'Costumer Auth', authType: 'Bearer Token' },
]

const REQUEST_MODELS_MOCK: T.PayloadModelItemContainerProps[] = [
  { authTitle: 'My Request Model #1', contentType: 'Application/JSON' },
  { authTitle: 'My Request Model #2', contentType: 'Application/JSON' },
]

const RESPONSE_MODELS_MOCK: T.PayloadModelItemContainerProps[] = [
  { authTitle: 'My Response Model #1', contentType: 'Application/JSON' },
  { authTitle: 'My Response Model #2', contentType: 'Application/JSON' },
]

const MODAL_CONTENTS = [
  {
    title: 'Auth Model',
    content: (<AuthModalContents />),
  },
  {
    title: 'Request Model',
    content: (<RequestModalContents />),
  },
  {
    title: 'Response Model',
    content: (<ResponseModalContents />),
  },
]

export const EditModelList: React.FC = () => {
  const [modalIsOpened, setModalIsOpened] = useState(false)
  const [modalContentIndex, setModalContentIndex] = useState(0)

  const toggleModalIsOpened = useCallback((contentIndex: number) => {
    setModalContentIndex(contentIndex)
    setModalIsOpened(!modalIsOpened)
  }, [modalIsOpened])

  const closeModal = useCallback(() => {
    setModalIsOpened(false)
  }, [])

  return (
    <div className="edit_model_list_container">
      <div className="page_content_max_width">
        <PageTitle title="Models" />

        <h3>Authentication</h3>

        {AUTHENTICATION_MODELS_MOCK.map((model, idx) => (
          <AuthModelItemContainer
            key={idx}
            authTitle={model.authTitle}
            authType={model.authType}
          />
        ))}

        <Button
          text="NEW AUTH MODEL"
          height="medium"
          isFullWidth
          Icon={<Plus size={24} />}
          onClick={() => toggleModalIsOpened(0)}
          style={{ margin: '1.75rem auto 3rem' }}
        />

        <h3 className="model_container_margin">Request Body</h3>

        {REQUEST_MODELS_MOCK.map((model, idx) => (
          <PayloadModelItemContainer
            key={idx}
            authTitle={model.authTitle}
            contentType={model.contentType}
          />
        ))}

        <Button
          text="NEW REQUEST MODEL"
          height="medium"
          isFullWidth
          Icon={<Plus size={24} />}
          onClick={() => toggleModalIsOpened(1)}
          style={{ margin: '1.75rem auto 3rem' }}
        />

        <h3 className="model_container_margin">Response Body</h3>

        {RESPONSE_MODELS_MOCK.map((model, idx) => (
          <PayloadModelItemContainer
            key={idx}
            authTitle={model.authTitle}
            contentType={model.contentType}
          />
        ))}

        <Button
          text="NEW RESPONSE MODEL"
          height="medium"
          isFullWidth
          Icon={<Plus size={24} />}
          onClick={() => toggleModalIsOpened(2)}
          style={{ margin: '1.75rem auto 0' }}
        />
      </div>

      {
        modalIsOpened && (
          <Modal
            title={MODAL_CONTENTS[modalContentIndex].title}
            onClose={closeModal}
          >
            {MODAL_CONTENTS[modalContentIndex].content}
          </Modal>
        )
      }
    </div>
  )
}
