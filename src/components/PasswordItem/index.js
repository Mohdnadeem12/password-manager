import './index.css'

const bgColor = ['yellow', 'green', 'orange', 'lightGreen', 'red']

const PasswordItem = props => {
  const {passwordDetails, deletePassword, showStatus} = props
  const {website, name, password, id} = passwordDetails
  const index = Math.floor(Math.random() * 5)
  const letter = website.slice(0, 1).toUpperCase()
  const colors = bgColor[index]

  const deleteButton = () => {
    deletePassword(id)
  }

  return (
    <li className="items-container">
      <div className={` ${colors} initial-container`}>
        <p>{letter}</p>
      </div>
      <div className="website-details">
        <p className="details">{website}</p>
        <p className="details">{name}</p>
        {showStatus ? (
          <p className="details">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="star-img"
          />
        )}
      </div>
      <button
        type="button"
        className="delete-button"
        onClick={deleteButton}
        testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          className="delete-logo"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
