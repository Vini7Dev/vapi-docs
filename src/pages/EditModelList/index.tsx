import React, { FormEvent, useCallback, useState } from 'react'

import { useApiDocStorage } from '../../hooks/ApiDocStorage'
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
import * as ADST from '../../hooks/ApiDocStorage/types'
import './styles.css'

const MODEL_KEYS: Array<keyof ADST.ModelsType> = ['authModels', 'requestModels', 'responseModels']

export const EditModelList: React.FC = () => {
  const {
    models,
    saveOrUpdateAuthModel,
    saveOrUpdatePayloadModel,
  } = useApiDocStorage()

  const [modalIsOpened, setModalIsOpened] = useState(false)
  const [modalContentIndex, setModalContentIndex] = useState(0)

  const toggleModalIsOpened = useCallback((contentIndex: number) => {
    setModalContentIndex(contentIndex)
    setModalIsOpened(!modalIsOpened)
  }, [modalIsOpened])

  const closeModal = useCallback(() => {
    document.body.classList.remove('no-scroll')
    setModalIsOpened(false)
  }, [])

  const onFormSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { target } = e as unknown as {
      target: EventTarget & { [field: string]: { value: string } }
    }

    const modelKey = MODEL_KEYS[modalContentIndex]

    let success = false

    if (modelKey === 'authModels') {
      success = saveOrUpdateAuthModel(modelKey, {
        authTitle: target.modelName.value,
        authType: target.modelType.value as ADST.AuthType,
      }).success
    } else {
      success = saveOrUpdatePayloadModel(modelKey, {
        payloadTitle: target.modelName.value,
        contentType: target.modelType.value as ADST.ContentType,
      }).success
    }

    if (success) closeModal()
  }, [modalContentIndex])

  const MODAL_CONTENTS = [
    {
      title: 'Auth Model',
      content: (<AuthModalContents onFormSubmit={onFormSubmit} />),
    },
    {
      title: 'Request Model',
      content: (<RequestModalContents onFormSubmit={onFormSubmit} />),
    },
    {
      title: 'Response Model',
      content: (<ResponseModalContents onFormSubmit={onFormSubmit} />),
    },
  ]

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

        {models.authModels.map((model, idx) => (
          <AuthModelItemContainer
            key={idx}
            authTitle={model.authTitle ?? ''}
            authType={model.authType ?? 'Bearer Token'}
          />
        ))}

        <div className="model_item_head model_container_margin">
          <h3>Request Body</h3>

          <button className="path_group_add" onClick={() => toggleModalIsOpened(1)}>
            <Plus size={20} /> Add Model
          </button>
        </div>

        {models.requestModels.map((model, idx) => (
          <PayloadModelItemContainer
            key={idx}
            payloadTitle={model.payloadTitle ?? ''}
            contentType={model.contentType ?? 'Application/JSON'}
          />
        ))}

        <div className="model_item_head model_container_margin">
          <h3>Response Body</h3>

          <button className="path_group_add" onClick={() => toggleModalIsOpened(2)}>
            <Plus size={20} /> Add Model
          </button>
        </div>

        {models.responseModels.map((model, idx) => (
          <PayloadModelItemContainer
            key={idx}
            payloadTitle={model.payloadTitle ?? ''}
            contentType={model.contentType ?? 'Application/JSON'}
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
