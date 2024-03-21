// This file defines a React Context which keeps track of the authenticated session.

import React, { createContext, ReactNode, useEffect, useState } from "react"

interface Context {
  project: string
  setProject: (project: string) => void
}

export const ProjectContext = createContext<Context>({
  setProject: () => {},
  project: "zen-northcutt-e1j153agmu",
})

interface Props {
  children: ReactNode
}

export default ({ children }: Props) => {
  const [project, setProject] = useState("playground")

  return (
    <ProjectContext.Provider
      value={{
        // Helpers to set the global Ory Project for this app.
        project,
        setProject: (project: string) => {
          setProject(project)
        },
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
