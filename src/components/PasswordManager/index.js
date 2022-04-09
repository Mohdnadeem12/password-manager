import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import PasswordItem from '../PasswordItem'

import './index.css'

class PasswordManager extends Component {
  state = {
    passwordList: [],
    website: '',
    username: '',
    password: '',
    searchInput: '',
    isChecked: false,
  }

  onChangeInputs = event => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  onClickStatus = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  onAddButton = event => {
    event.preventDefault()
    const {username, website, password} = this.state
    const newPassword = {
      id: uuid(),
      name: username,
      website,
      password,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      username: '',
      website: '',
      password: '',
    }))
  }

  deletePassword = id => {
    const {passwordList} = this.state

    const filteredPassword = passwordList.filter(
      eachPassword => eachPassword.id !== id,
    )

    this.setState({passwordList: filteredPassword})
  }

  getPasswordList = () => {
    const {passwordList, searchInput} = this.state

    const updatedPassword = passwordList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return updatedPassword
  }

  render() {
    const {
      passwordList,
      website,
      username,
      password,
      searchInput,
      isChecked,
    } = this.state

    const updatedPasswordList = this.getPasswordList()
    return (
      <div className="app-container">
        <div className="responsive-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png "
            className="app-logo"
            alt="app logo"
          />
          <div className="password-container">
            <form className="password-manager" onSubmit={this.onAddButton}>
              <h1 className="form-heading">Add New Password</h1>
              <div className="input-container">
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="input-logo"
                  />
                </div>
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={this.onChangeInputs}
                  className="input"
                  placeholder="Enter Website"
                />
              </div>
              <div className="input-container">
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="input-logo"
                  />
                </div>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Username"
                  name="username"
                  value={username}
                  onChange={this.onChangeInputs}
                />
              </div>
              <div className="input-container">
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                    alt="password"
                    className="input-logo"
                  />
                </div>
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Password"
                  name="password"
                  value={password}
                  onChange={this.onChangeInputs}
                />
              </div>
              <div className="button-container">
                <button className="button" type="submit">
                  Add
                </button>
              </div>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              className="password-logo"
              alt="password manager"
            />
          </div>
          <div className="password-list-container">
            <div className="bottom-heading-container">
              <div className="heading-container">
                <h1 className="form-heading">Your Passwords</h1>
                <p className="count">{passwordList.length}</p>
              </div>
              <div className="search-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                  alt="search"
                  className="search-logo"
                />
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  name="searchInput"
                  value={searchInput}
                  onChange={this.onChangeInputs}
                />
              </div>
            </div>
            <hr />
            <div className="button-container">
              <input
                type="checkbox"
                id="checkBox"
                className="checkbox"
                onChange={this.onClickStatus}
              />
              <label htmlFor="checkBox" className="label-text">
                Show Passwords
              </label>
            </div>
            <div className="list-items-container">
              {updatedPasswordList.length === 0 ? (
                <div className="no-password-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                    className="image"
                  />
                  <p className="no-password-text">No Passwords</p>
                </div>
              ) : (
                <ul className="list-container">
                  {updatedPasswordList.map(eachPassword => (
                    <PasswordItem
                      key={eachPassword.id}
                      passwordDetails={eachPassword}
                      deletePassword={this.deletePassword}
                      showStatus={isChecked}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
