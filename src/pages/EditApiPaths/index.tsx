import React from 'react'

import { PageTitle } from '../../components/PageTitle'
import { Button } from '../../components/Button'
import { ArrowDown, ArrowRight, Edit, Plus, Trash } from '../../components/Icons'
import './styles.css'

export const EditApiPaths: React.FC = () => {
  return (
    <div className="api_paths_container">
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

        <div className="path_item_container get_method_border">
          <div className="path_item_header">
            <strong className="path_method get_method_color">GET</strong>

            <span className="path_route">/users</span>

            <p className="path_description">List all users</p>

            <ArrowRight className="get_method_color" size={18} />
          </div>
        </div>


        <div className="path_item_container post_method_border">
          <div className="path_item_header">
            <strong className="path_method post_method_color">POST</strong>

            <span className="path_route">/users</span>

            <p className="path_description">Create user</p>

            <ArrowRight className="post_method_color" size={18} />
          </div>
        </div>


        <div className="path_item_container put_method_border">
          <div className="path_item_header">
            <strong className="path_method put_method_color">PUT</strong>

            <span className="path_route">/users/{'{id}'}</span>

            <p className="path_description">Update user</p>

            <ArrowDown className="put_method_color" size={18} />
          </div>

          <div className="path_content_body">
            <div className="path_edit_delete_options">
              <button className="path_item_edit">
                <Edit size={20} /> Edit
              </button>

              <button className="path_item_delete">
                <Trash size={20} /> Delete
              </button>
            </div>

            <div className="path_item_section ignore_margin_top">
              <h4 className="path_item_section_title">Authentication</h4>

              <div className="path_item_specification_container">
                <div className="path_item_specification">
                  <strong className="put_method_color">Customer Authentication</strong>

                  <span>(Bearer Token)</span>
                </div>
              </div>
            </div>

            <div className="path_item_section">
              <h4 className="path_item_section_title">Route Params</h4>

              <div className="path_item_specification_container">
                <div className="path_item_specification">
                  <strong className="put_method_color">id (integer)</strong>

                  <span>User ID to be updated</span>
                </div>
              </div>
            </div>

            <div className="path_item_section">
              <h4 className="path_item_section_title">Query Params</h4>

              <div className="path_item_specification_container">
                <div className="path_item_specification">
                  <strong className="put_method_color">example (boolean)</strong>

                  <span>Example of query param</span>
                </div>

                <div className="path_item_specification">
                  <strong className="put_method_color">example (boolean)</strong>

                  <span>Example of query param</span>
                </div>
              </div>
            </div>


            <div className="path_item_section">
              <h4 className="path_item_section_title">Request Body</h4>

              <div className="path_item_specification_container">
                <button className="path_item_specification">
                  <strong className="put_method_color">My Request Model #1</strong>

                  <ArrowRight className="path_specification_arrow put_method_color" size={18} />
                </button>

                <button className="path_item_specification">
                  <strong className="put_method_color">My Request Model #2</strong>

                  <ArrowDown className="path_specification_arrow put_method_color" size={18} />
                </button>

                <div className="path_item_specification_accordion_content">
                  <span>Application/JSON</span>
                </div>
              </div>
            </div>

            <div className="path_item_section">
              <h4 className="path_item_section_title">Responses</h4>

              <div className="path_item_specification_container">
                <button className="path_item_specification">
                  <strong className="put_method_color">400 My Response Model #1</strong>

                  <ArrowDown className="path_specification_arrow put_method_color" size={18} />
                </button>

                <div className="path_item_specification_accordion_content">
                  <span>Application/JSON</span>
                </div>

                <button className="path_item_specification">
                  <strong className="put_method_color">404 My Response Model #2</strong>

                  <ArrowRight className="path_specification_arrow put_method_color" size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
