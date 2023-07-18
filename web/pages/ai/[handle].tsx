import React from 'react'
import AIAppLayout from '../../components/ai/layout'
import AiProjects from "../../components/ai/constants"
import { useRouter } from 'next/router'

export default function StoryRecommendations() {

  const router = useRouter()
  const {handle} = router.query

  let project: any = null;

  for (let item of AiProjects) {
    if (item.handle == handle) {
      project = item
    }
  }

  if (project == null) {
    return <div>404</div>
  }  

  return (
    <AIAppLayout 
      title={project.title}
      author={project.personName}
      story={project.intro}
      usesTitle={project.usesTitle}
      steamshipPackage={project.steamshipPackage}
      handle={project.handle}
      usesDescription={project.usesDescription}
    />
  )
}