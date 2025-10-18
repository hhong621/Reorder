import { useState } from 'react'
import ListItem from './components/ListItem'
import Section from './components/Section'
import './App.css'

function App() {

  const initialData = [
    {
      id: "section-1",
      title: "Section 1",
      icon: "chess_bishop",
      items: [
        {id: "li-1", text: "List Item A"},
        {id: "li-2", text: "List Item B"},
        {id: "li-3", text: "List Item C"},
        {id: "li-4", text: "List Item D"}
      ]
    },
    {
      id: "section-2",
      title: "Section 2",
      icon: "chess_knight",
      items: [
        {id: "li-5", text: "List Item E"},
        {id: "li-6", text: "List Item F"},
        {id: "li-7", text: "List Item G"},
        {id: "li-8", text: "List Item H"}
      ]
    },
    {
      id: "section-3",
      title: "Section 3",
      icon: "chess_pawn",
      items: [
        {id: "li-9",  text: "List Item I"},
        {id: "li-10", text: "List Item J"},
        {id: "li-11", text: "List Item K"},
        {id: "li-12", text: "List Item L"}
      ]
    }
  ];

  const sections = ( data ) => {
    return (
      <div className='section-list'>
        {data.map(section => (
          <Section
            id = {section.id}
            key = {section.id}
            title = {section.title}
            icon = {section.icon}
            items = {section.items.map(item => (
              <ListItem id={item.id} key={item.id} text={item.text}/>
            ))}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      {sections(initialData)}
    </>
  )
}

export default App
