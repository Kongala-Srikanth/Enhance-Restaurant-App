import './index.css'

const MenuBar = props => {
  const {menuCategory, categoryId, categoryOption, onMenuBar} = props

  // console.log(menuCategory)
  const style =
    categoryId === categoryOption
      ? 'btn-hide highlight-text'
      : 'btn-hide normal-text'
  return (
    <div className="each-menu-bar">
      <button
        type="button"
        className={style}
        onClick={() => onMenuBar(categoryId)}
      >
        {menuCategory}
      </button>
    </div>
  )
}

export default MenuBar
