import React from 'react'
import css from "../NotesPage.module.css"

interface Props {
  children: React.ReactNode
  sidebar?: React.ReactNode
}

const NoteListLayout = ({ children, sidebar }: Props) => {
  return (
    <div className={css.filterLayout}>
      {sidebar}
      <div className={css.mainContent}>
        {children}
      </div>
    </div>
  )
}

export default NoteListLayout