import React from 'react'
import styles from './styles.module.css'
import { useState, useEffect } from 'react';

// Here is the default icon (an svg arrow), you are free to replace it with any svg file.

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

// Here is an empty Options array, you can replace it with any array you want, as long as it follows the
// following format : you have to make an array of objects (each object matching with an option),
// each object must have a "value" property and a "label property". The value will be the unique key of
// every option rendered in your dropdown, the label will be the option text displayed.

// export const Options = []

// Possible example :

export const Options = [
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
  { value: "red", label: "Red" },
  { value: "yellow", label: "Yellow" },
  { value: "orange", label: "Orange" },
  { value: "pink", label: "Pink" },
  { value: "purple", label: "Purple" },
  { value: "grey", label: "Grey" },
]

// Here is the component to be rendered, it takes two props : placeHolder and options (the options array).

export const Dropdown = ({ placeHolder, options }) => {

  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  // The following useEffect allows the user to click anywhere on the page to close the dropdown on 
  // every render.

  useEffect(() => {
    const handler = () => setShowMenu(false)

    window.addEventListener("click", handler)
    return () => {
      window.removeEventListener("click", handler)
    }
  })

  // The following function allows to toggle the menu from shown to hidden and vice versa.
  // Of course, the Options array must be full.

  const handleInputclick = (e) => {
    e.stopPropagation()
    if (Options.length !== 0) {
      setShowMenu(!showMenu)
    }
  }

  // The following function displays a placeHolder, either the label value of the selected option,
  // or the default placeHolder if none is selected.

  const getDisplay = () => {
    if (selectedValue) {
      return selectedValue.label
    }
    return placeHolder;
  };

  // The two following functions allow to get the selected value equal to the option value clicked (if any),
  // this allows to get in the state the precise option you have clicked and to give it a singular 
  // className, so the option previously clicked will be highlighted.

  const onItemClick = (option) => {
    setSelectedValue(option)
  }

  const isSelected = (option) => {
    if (!selectedValue) {
      return false
    }
    console.log(selectedValue)
    return selectedValue.value === option.value
  }

  return (
    <div>
      <div className={styles.dropdownContainer}>
        <div onClick={handleInputclick} className={styles.dropdownInput}>

          {/* The two following div aren't styled yet but you can totally create selectors
          in a CSS file for them. The first is the placeHolder, the second is the icon container */}

          <div className="dropdown-selected-value">{getDisplay()}</div>
          <div className="dropdown-tool">
            <Icon />
          </div>
        </div>
      </div>
      {showMenu && (
        <div className={styles.shownMenu}>
          <div onClick={handleInputclick} className={styles.dropdownInput}>
            <div className={styles.dropdownMenu}>
              {options.map((option) => (
                <div
                  onClick={() => onItemClick(option)}
                  key={option.value}
                  className={isSelected(option) ? styles.dropdownItemSelected : styles.dropdownItem}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )

};