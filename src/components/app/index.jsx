import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import Tag from 'components/tag'
import Input from 'components/input'
import SearchIcon from 'assets/icons/search.svg'
import popupWindow from 'utils/popupWindow'

export default class App extends Component {
  static propTypes = {
    extension: PropTypes.object.isRequired,
  }

  static childContextTypes = {
    extension: PropTypes.object.isRequired,
  }

  getChildContext = () => ({
    extension: this.props.extension,
  })

  state = {
    tags: []
  }

  componentDidMount() {
    const fieldValue = this.props.extension.field.getValue()

    fieldValue && this.setState({
      tags: fieldValue.split('; ')
    })
    popupWindow('https://d2ih136zgu7ccp.cloudfront.net/login', 'Авторизация', 400, 380);
  }

  render() {
    const { tags } = this.state

    return (
      <div className={style.FormField}>
        <div className={style.TagContainer}>
          {tags.map((item) =>
            <Tag key={item} removable onRemoveClick={(event) => console.log(event)}>{item}</Tag>
          )}
          <Tag add onAdd={(event) => console.log(event)} />
        </div>
        <Input icon={SearchIcon} placeholder='Искать термин' />
      </div>
    )
  }
}
