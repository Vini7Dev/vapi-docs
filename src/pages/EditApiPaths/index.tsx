import React from 'react'

import { PageTitle } from '../../components/PageTitle'
import { Button } from '../../components/Button'
import { Edit, Plus, Trash } from '../../components/Icons'
import './styles.css'
import { PathItemContrainer } from './PathItemContrainer'

export const EditApiPaths: React.FC = () => {
  return (
    <div className="api_paths_container">
      <div className="page_content_max_width">
        <PageTitle title="API Paths" />

        <Button
          text="Create Path Group"
          type="button"
          className="create_group_button"
          Icon={<Plus size={24} />}
        />

        <div className="path_group_container">
          <div className="path_group_header">
            <h3 className="path_group_name">Users</h3>

            <button className="path_group_edit">
              <Edit size={20} /> Edit
            </button>

            <button className="path_group_delete">
              <Trash size={20} /> Delete
            </button>
          </div>

          <PathItemContrainer
            method="get"
            pathRoute="/users"
            pathDescription="List all users"
          />

          <PathItemContrainer
            method="post"
            pathRoute="/users"
            pathDescription="Create user"
          />

          <PathItemContrainer
            method="put"
            pathRoute="/users/{id}"
            pathDescription="Update user"
          />
        </div>
      </div>
    </div>
  )
}
