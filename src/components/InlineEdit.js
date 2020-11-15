import { useState, useEffect, useRef } from 'react'
import { useKeyPress, useOnClickOutside } from 'hooks'

import 'assets/styles/InlineEdit.css'

/**
 * Inline edit component.
 *
 * Heavily borrowed from:
 * https://joelmturner.com/blog/inline-text-edit-react-hooks
 *
 * @param {Object} props
 * @param {Object} ref
 */
function InlineEdit(props, ref) {
  const [ isInputActive, setIsInputActive]  = useState(false)
  const [ inputValue, setInputValue ] = useState(props.text)

  const wrapperRef = useRef(null)
  const textRef = useRef(null)
  const inputRef = useRef(null)

  const enter = useKeyPress('Enter')
  const esc = useKeyPress('Escape')

  // check to see if the user clicked outside of this component
  useOnClickOutside(wrapperRef, () => {
    if (isInputActive) {
      props.onSetText(inputValue)
      setIsInputActive(false)
    }
  })

  // focus the cursor in the input field on edit start
  useEffect(() => {
    if (isInputActive) {
      inputRef.current.focus()
    }
  }, [isInputActive])

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (isInputActive) {
      // if Enter is pressed, save the text and case the editor
      if (enter) {
        props.onSetText(inputValue)
        setIsInputActive(false)
      }
      // if Escape is pressed, revert the text and close the editor
      if (esc) {
        setInputValue(props.text)
        setIsInputActive(false)
      }
    }
  }, [enter, esc]) // watch the Enter and Escape key presses

  return (
    <span className="inline-text" ref={wrapperRef}>
      <span
        ref={textRef}
        onClick={() => setIsInputActive(true)}
        className={`inline-text_copy inline-text_copy--${!isInputActive ? "active" : "hidden"}`}
      >
        {props.text}
      </span>
      <input
        ref={inputRef}
        value={inputValue}
        placeholder="What needs to be done?"
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
        className={`inline-text_input inline-text_input--${isInputActive ? "active" : "hidden"}`}
      />
    </span>
  )
}
export default InlineEdit
