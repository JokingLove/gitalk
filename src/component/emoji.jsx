import React from 'react'

export default ({ className, onClick, list }) => (
  <div className={`gt-emoji-card ${className}`}>
    {
      list.map(item =>
        (
        <a className={`gt-emoji`} onClick={() => this.onClick(this)}>
          <span className="gt-action-text">item</span>
        </a>
        )
      )
    }
  </div>
)
