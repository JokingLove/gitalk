import React from 'react'

export default ({ show, className, onClick, dataList }) => (
  <div id="emojiCon" className={`gt-emoji-card ${className}`} style={{ display: (show) ? 'block' : 'none' }}>
    {
      Object.keys(dataList).map(item => (<a href="javascript:void(0)" className="gt-emoji-a">
        <span className="gt-emoji-symbol" data={item} onClick={onClick} >{dataList[item]}</span>
      </a>))
    }
  </div>
)
