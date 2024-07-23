import React, { useCallback, useState } from 'react'

import {
  PathDataModalContents,
  PathGroupModalContents,
} from './components/ModalContents'
import { Plus } from '../../components/Icons'
import { Button } from '../../components/Button'
import { PageTitle } from '../../components/PageTitle'
import { PathGroupContainer } from './components/PathGroupContainer'
import { Modal } from '../../components/Modal'
import { useApiDocStorage } from '../../hooks/ApiDocStorage'
import * as T from './types'
import './styles.css'
import { PathFormProvider } from '../../hooks/PathFormContext'

const MODAL_CONTENTS: T.ModalContentsProps[] = [
  {
    title: 'Path Group',
    component: ({ id, closeModal }: T.ModalContentComponentProps) => (
      <PathGroupModalContents id={id} closeModal={closeModal} />
    ),
  },
  {
    title: 'Path Data',
    component: ({ id, closeModal }: T.ModalContentComponentProps) => (
      <PathFormProvider>
        <PathDataModalContents id={id} closeModal={closeModal} />
      </PathFormProvider>
    ),
  },
]

export const EditApiPathList: React.FC = () => {
  const { apiPathGroups } = useApiDocStorage()

  const [editingId, setEditingId] = useState<string>()
  const [modalIsOpened, setModalIsOpened] = useState(false)
  const [modalContentIndex, setModalContentIndex] = useState(0)

  const toggleModalIsOpened = useCallback((contentIndex: number) => {
    setModalContentIndex(contentIndex)
    setModalIsOpened(!modalIsOpened)
  }, [modalIsOpened])

  const closeModal = useCallback(() => {
    document.body.classList.remove('no-scroll')
    setModalIsOpened(false)
    setEditingId(undefined)
  }, [])

  const onAddEditPathGroup = useCallback((id?: string) => {
    setEditingId(id)
    toggleModalIsOpened(0)
  }, [])

  return (
    <div className="edit_api_path_list_container">
      <div className="page_content_max_width">
        <PageTitle title="API Paths" />

        <Button
          text="Create Path Group"
          type="button"
          className="create_group_button"
          onClick={() => onAddEditPathGroup()}
          Icon={<Plus size={24} />}
        />

        {apiPathGroups.map((pathGroup, idx) => (
          <PathGroupContainer
            key={idx}
            id={pathGroup.id ?? ''}
            pathGroupName={pathGroup.groupName}
            apiPaths={pathGroup.apiPaths}
            onAddOrEditPathGroup={() => onAddEditPathGroup(pathGroup.id)}
            onAddOrEditPath={() => toggleModalIsOpened(1)}
          />
        ))}
      </div>

      {
        modalIsOpened && (
          <Modal
            title={MODAL_CONTENTS[modalContentIndex].title}
            onClose={closeModal}
          >
            {
              MODAL_CONTENTS[modalContentIndex].component({
                id: editingId,
                closeModal,
              })
            }
          </Modal>
        )
      }
    </div>
  )
}
