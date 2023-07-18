import Head from '../../components/utility/site/Head'
import Layout from '../../components/layout'
import Header from '../../components/utility/site/Header'
import React from 'react'
import AiProjects from '../../components/ai/constants'

/**
 * @brief Headshot of person
 *
 * @param name [String] name of person
 * @param photo [String] path to image in /web/public folder, if null, return null
 * @constructor
 */
function PersonImage({name, photo=null}) {
  if (photo) {
    return (
       <div className="h-0 aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
          <img className="object-cover shadow-lg rounded-lg " src={photo} alt={`Photo of ${name}`} />
       </div>
    );
  }
  return null;
}

/**
 * @brief Person component
 *
 * @param name [String] name of person
 * @param title [String] title for person, e.g., "CEO", can be null for no title
 * @param photo [String] path to image in /web/public folder, can be null for no photo
 * @param children [String] bio text
 * @param link [String] link
 * @constructor
 */
export function PersonAndProject({
  name, 
  title=null, 
  photo=null, 
  link=null,
  children
}) {
  return (
    <li>
      <div className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8 flex flex-col">
        <PersonImage name={name} photo={photo} />
        <div className={photo ? "sm:col-span-2" : "sm:col-span-3"}>
          <div className="space-y-4">
            <div className="text-lg leading-6 font-medium space-y-1">
              <h3>{name}</h3>
              <p className="text-indigo-600">{title}</p>
            </div>
            <div className="text-lg">
              <p className="text-gray-500">{children}</p>
            </div>
            <a
              type="button"
              href={link}
              className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              View Project
            </a>
          </div>
        </div>
      </div>
    </li>
  )
}

/**
 * List of people on the executive team
 *
 * @constructor
 */
function AiFellows() {
  return (
      <div>
        <ul className="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-12 lg:space-y-0">
          {AiProjects.map((project) => (
            <PersonAndProject name={project.personName} title={project.title} photo={project.photo} link={project.url || `/ai/${project.handle}`}>
              {project.personBio}
            </PersonAndProject>
          ))}
        </ul>
      </div>
  )
}


/**
 * @brief Route handler for writingatlas.com/ai
 *
 * @constructor
 */
export default function AI() {
  return (
    <Layout user={null} loading={false}>
      <Head title="AI x Literature Projects - Writing Atlas" />
      <Header showBooks={false} showAuthor={false} showBook={false} />
      <div className="bg-white">
        <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">AI x Literature @ Writing Atlas</h2>
            <p className="prose">
              Our first class of AI fellows built AI apps atop the Writing Atlas dataset and deployed as APIs on <a href="https://www.steamship.com">Steamship</a>.
              You can use them with the links below - or see the results woven into the rest of Writing Atlas.
            </p>
            <AiFellows />
          </div>
        </div>
      </div>
    </Layout>
  )
}