import React, { useCallback, useState } from 'react'

import {
  AuthModalContents,
  RequestModalContents,
  ResponseModalContents,
} from './components/ModalContents'
import { PayloadModelItemContainer } from './components/PayloadModelItemContainer'
import { AuthModelItemContainer } from './components/AuthModelItemContainer'
import { PageTitle } from '../../components/PageTitle'
import { Plus } from '../../components/Icons'
import { Modal } from '../../components/Modal'
import * as T from './types'
import './styles.css'

const AUTHENTICATION_MODELS_MOCK: T.AuthModelItemContainerProps[] = [
  { authTitle: 'Admin Auth', authType: 'Bearer Token' },
  { authTitle: 'Costumer Auth', authType: 'Bearer Token' },
]

const REQUEST_MODELS_MOCK: T.PayloadModelItemContainerProps[] = [
  { payloadTitle: 'My Request Model #1', contentType: 'Application/JSON' },
  { payloadTitle: 'My Request Model #2', contentType: 'Application/JSON' },
]

const RESPONSE_MODELS_MOCK: T.PayloadModelItemContainerProps[] = [
  { payloadTitle: 'My Response Model #1', contentType: 'Application/JSON' },
  { payloadTitle: 'My Response Model #2', contentType: 'Application/JSON' },
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

        <div className="model_item_head">
          <h3>Authentication</h3>

          <button className="path_group_add" onClick={() => toggleModalIsOpened(0)}>
            <Plus size={20} /> Add Model
          </button>
        </div>

        {AUTHENTICATION_MODELS_MOCK.map((model, idx) => (
          <AuthModelItemContainer
            key={idx}
            authTitle={model.authTitle}
            authType={model.authType}
          />
        ))}

        <div className="model_item_head model_container_margin">
          <h3>Request Body</h3>

          <button className="path_group_add" onClick={() => toggleModalIsOpened(1)}>
            <Plus size={20} /> Add Model
          </button>
        </div>

        {REQUEST_MODELS_MOCK.map((model, idx) => (
          <PayloadModelItemContainer
            key={idx}
            payloadTitle={model.payloadTitle}
            contentType={model.contentType}
          />
        ))}

        <div className="model_item_head model_container_margin">
          <h3>Response Body</h3>

          <button className="path_group_add" onClick={() => toggleModalIsOpened(2)}>
            <Plus size={20} /> Add Model
          </button>
        </div>

        {RESPONSE_MODELS_MOCK.map((model, idx) => (
          <PayloadModelItemContainer
            key={idx}
            payloadTitle={model.payloadTitle}
            contentType={model.contentType}
          />
        ))}

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
