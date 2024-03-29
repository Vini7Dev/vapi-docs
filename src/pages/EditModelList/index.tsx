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
import * as T from './types'
import './styles.css'

const MODEL_KEYS: Array<keyof ADST.ModelsType> = ['authModels', 'requestModels', 'responseModels']

export const EditModelList: React.FC = () => {
  const {
    models: { authModels, requestModels, responseModels },
    saveOrUpdateAuthModel,
    saveOrUpdatePayloadModel,
  } = useApiDocStorage()

  const [modalIsOpened, setModalIsOpened] = useState(false)
  const [modalContentIndex, setModalContentIndex] = useState(0)
  const [modelToEdit, setModelToEdit] = useState<T.ModelToEdit>()

  const toggleModalIsOpened = useCallback((contentIndex: number) => {
    setModalContentIndex(contentIndex)
    setModalIsOpened(!modalIsOpened)
  }, [modalIsOpened])

  const closeModal = useCallback(() => {
    document.body.classList.remove('no-scroll')
    setModalIsOpened(false)
  }, [])

  const onClickInEdit = useCallback((
    contentIndex: number,
    payload: ADST.AuthModelType | ADST.PayloadModelType,
  ) => {
    setModelToEdit(payload)

    toggleModalIsOpened(contentIndex)
  }, [])

  const onFormSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { target } = e as unknown as {
      target: EventTarget & { [field: string]: { value: string } }
    }

    const modelKey = MODEL_KEYS[modalContentIndex]

    let success = false

    if (modelKey === 'authModels') {
      success = saveOrUpdateAuthModel(
        modelKey,
        {
          id: target.id.value,
          title: target.modelName.value,
          description: target.modelDescription.value,
          type: target.modelType.value as ADST.type,
        }
      ).success
    } else {
      success = saveOrUpdatePayloadModel(
        modelKey,
        {
          id: target.id.value,
          title: target.modelName.value,
          contentType: target.modelType.value as ADST.ContentType,
        }
      ).success
    }

    if (success) {
      closeModal()
      setModelToEdit(undefined)
    }
  }, [modalContentIndex])

  const MODAL_CONTENTS = [
    {
      title: 'Auth Model',
      content: (<AuthModalContents modelToEdit={modelToEdit} onFormSubmit={onFormSubmit} />),
    },
    {
      title: 'Request Model',
      content: (<RequestModalContents modelToEdit={modelToEdit} onFormSubmit={onFormSubmit} />),
    },
    {
      title: 'Response Model',
      content: (<ResponseModalContents modelToEdit={modelToEdit} onFormSubmit={onFormSubmit} />),
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

        {authModels.map((model, idx) => (
          <AuthModelItemContainer
            key={idx}
            id={model.id}
            title={model.title ?? ''}
            type={model.type ?? 'Bearer Token'}
            onClickInEdit={() => onClickInEdit(0, model)}
          />
        ))}

        <div className="model_item_head model_container_margin">
          <h3>Request Body</h3>

          <button className="path_group_add" onClick={() => toggleModalIsOpened(1)}>
            <Plus size={20} /> Add Model
          </button>
        </div>

        {requestModels.map((model, idx) => (
          <PayloadModelItemContainer
            key={idx}
            id={model.id}
            modelGroup="requestModels"
            title={model.title ?? ''}
            contentType={model.contentType ?? 'Application/JSON'}
            onClickInEdit={() => onClickInEdit(1, model)}
          />
        ))}

        <div className="model_item_head model_container_margin">
          <h3>Response Body</h3>

          <button className="path_group_add" onClick={() => toggleModalIsOpened(2)}>
            <Plus size={20} /> Add Model
          </button>
        </div>

        {responseModels.map((model, idx) => (
          <PayloadModelItemContainer
            key={idx}
            id={model.id}
            modelGroup="responseModels"
            title={model.title ?? ''}
            contentType={model.contentType ?? 'Application/JSON'}
            onClickInEdit={() => onClickInEdit(2, model)}
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
