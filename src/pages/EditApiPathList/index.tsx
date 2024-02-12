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
import { PathFormProvider } from '../../hooks/PathFormContext'
import { useApiDocStorage } from '../../hooks/ApiDocStorage'
import * as T from './types'
import './styles.css'

const MODAL_CONTENTS: T.ModalContentsProps[] = [
  {
    title: 'Path Group',
    component: ({ index, closeModal }: T.ModalContentComponentProps) => (
      <PathGroupModalContents index={index} closeModal={closeModal} />
    ),
  },
  {
    title: 'Path Data',
    component: ({ index, closeModal }: T.ModalContentComponentProps) => (
      <PathFormProvider>
        <PathDataModalContents index={index} closeModal={closeModal} />
      </PathFormProvider>
    ),
  },
]

export const EditApiPathList: React.FC = () => {
  const { apiPathGroups } = useApiDocStorage()

  const [editingIndex, setEditingIndex] = useState<number>()
  const [modalIsOpened, setModalIsOpened] = useState(false)
  const [modalContentIndex, setModalContentIndex] = useState(0)

  const toggleModalIsOpened = useCallback((contentIndex: number) => {
    setModalContentIndex(contentIndex)
    setModalIsOpened(!modalIsOpened)
  }, [modalIsOpened])

  const closeModal = useCallback(() => {
    document.body.classList.remove('no-scroll')
    setModalIsOpened(false)
    setEditingIndex(undefined)
  }, [])

  const onAddEditPathGroup = useCallback((index?: number) => {
    setEditingIndex(index)
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
            index={idx}
            pathGroupName={pathGroup.groupName}
            apiPaths={pathGroup.apiPaths}
            onAddOrEditPathGroup={() => onAddEditPathGroup(idx)}
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
                index: editingIndex,
                closeModal,
              })
            }
          </Modal>
        )
      }
    </div>
  )
}
