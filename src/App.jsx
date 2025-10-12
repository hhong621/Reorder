import { useState } from 'react'
import ListItem from './components/ListItem'
import Section from './components/Section'
import './App.css'

function App() {

  const items = (
    <>
      <ListItem id = "li1" text = "List Item A"/>
      <ListItem id = "li2" text = "List Item B"/>
      <ListItem id = "li3" text = "List Item C"/>
      <ListItem id = "li4" text = "List Item D"/>
    </>  
  );

  return (
    <>
      <Section
        id = "1"
        items = {items}
        icon = "chess_bishop"
      />
    </>
  )
}

export default App
