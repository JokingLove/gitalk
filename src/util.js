import axios from 'axios'

export const queryParse = (search = window.location.search) => {
  if (!search) return {}
  const queryString = search[0] === '?' ? search.substring(1) : search
  const query = {}
  queryString
    .split('&')
    .forEach(queryStr => {
      const [key, value] = queryStr.split('=')
      /* istanbul ignore else */
      if (key) query[decodeURIComponent(key)] = decodeURIComponent(value)
    })

  return query
}

export const queryStringify = query => {
  const queryString = Object.keys(query)
    .map(key => `${key}=${encodeURIComponent(query[key] || '')}`)
    .join('&')
  return queryString
}

export const axiosJSON = axios.create({
  headers: {
    'Accept': 'application/json'
  }
})

export const axiosGithub = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/json'
  }
})

export const getMetaContent = (name, content) => {
  /* istanbul ignore next */
  content || (content = 'content')
  /* istanbul ignore next */
  const el = window.document.querySelector(`meta[name='${name}']`)
  /* istanbul ignore next */
  return el && el.getAttribute(content)
}

export const formatErrorMsg = err => {
  let msg = 'Error: '
  if (err.response && err.response.data && err.response.data.message) {
    msg += `${err.response.data.message}. `
    err.response.data.errors && (msg += err.response.data.errors.map(e => e.message).join(', '))
  } else {
    msg += err.message
  }
  return msg
}

export const hasClassInParent = (element, ...className) => {
  /* istanbul ignore next */
  let yes = false
  /* istanbul ignore next */
  if (typeof element.className === 'undefined') return false
  /* istanbul ignore next */
  const classes = element.className.split(' ')
  /* istanbul ignore next */
  className.forEach((c, i) => {
    /* istanbul ignore next */
    yes = yes || (classes.indexOf(c) >= 0)
  })
  /* istanbul ignore next */
  if (yes) return yes
  /* istanbul ignore next */
  return element.parentNode && hasClassInParent(element.parentNode, className)
}


// 输入框获取光标
// export const getCursorPosition = element => {
//   let cursorPos = 0
//   if (document.selection) { // IE
//     const selectRange = document.selection.createRange()
//     selectRange.moveStart('character', -element.value.length)
//     cursorPos = selectRange.text.length
//   } else if (element.selectionStart || element.selectionStart === '0') {
//     cursorPos = element.selectionStart
//   }
//   return cursorPos
// }

export const getCursorPosition = obj => {
  let cursorIndex = 0
  if (document.selection) {
    // IE Support
    obj.focus()
    const range = document.selection.createRange()
    range.moveStart('character', -obj.value.length)
    cursorIndex = range.text.length
  } else if (obj.selectionStart || obj.selectionStart === 0) {
    // another support
    cursorIndex = obj.selectionStart
  }
  return cursorIndex
}

export const setCaretPosition = (textDom, pos) => {
  if (textDom.setSelectionRange) {
    // IE Support
    textDom.focus()
    textDom.setSelectionRange(pos, pos)
  } else if (textDom.createTextRange) {
    // Firefox support
    const range = textDom.createTextRange()
    range.collapse(true)
    range.moveEnd('character', pos)
    range.moveStart('character', pos)
    range.select()
  }
}

export const getEmojiComments = (comment, emojiValue, position) => {
  if (comment) {
    if (comment.length > position) {
      return comment.substring(0, position) + emojiValue + comment.substring(position, comment.length)
    }
    return comment + emojiValue
  }
  return emojiValue
}


/**
* 在光标后插入文本
* 参数：
*     textDom  [JavaScript DOM String] 当前对象
*     value  [String]  要插入的文本
*/
export const insertAfterText = (textDom, value) => {
  let selectRange
  if (document.selection) {
    // IE Support
    textDom.focus()
    selectRange = document.selection.createRange()
    selectRange.text = value
    textDom.focus()
  } else if (textDom.selectionStart || textDom.selectionStart === '0') {
    // Firefox support
    const startPos = textDom.selectionStart
    const endPos = textDom.selectionEnd
    const scrollTop = textDom.scrollTop
    textDom.value = textDom.value.substring(0, startPos) + value + textDom.value.substring(endPos, textDom.value.length)
    textDom.focus()
    textDom.selectionStart = startPos + value.length
    textDom.selectionEnd = startPos + value.length
    textDom.scrollTop = scrollTop
  } else {
    textDom.value += value
    textDom.focus()
  }
}
