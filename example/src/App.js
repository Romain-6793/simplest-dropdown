import React from 'react'

import { Dropdown, Options } from 'simplest-dropdown'
import 'simplest-dropdown/dist/index.css'

const App = () => {
  return (
    <>
      <Dropdown placeHolder="Select..." options={Options} />
    </>
  )

}

export default App