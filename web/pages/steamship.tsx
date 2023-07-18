import Head from '../components/utility/site/Head'
import Layout from '../components/layout'
import Header from '../components/utility/site/Header'
import React from 'react'

/**
 * @brief Route handler for writingatlas.com/steamship
 *
 * @constructor
 */
export default function Steamship() {
  return (
    <Layout user={null} loading={false}>
      <Head title="Steamship Language AI Fellowship at Writing Atlas" />
      <Header showBooks={false} showAuthor={false} showBook={false} />
      <div className="bg-white">
          <div className="relative overflow-hidden bg-white py-16">
              <div className="relative px-4 sm:px-6 lg:px-8">
                  <div className="mx-auto max-w-prose text-lg">
                      <h1>
                          <span className="block text-center text-lg font-semibold text-indigo-600">Rolling Deadline: <br/> We will begin reviewing applications on a rolling basis starting December 9.</span><br/>
                          <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              Steamship Language AI Fellowship for Writing Atlas
            </span>
                      </h1>
                      <p className="mt-8 text-xl leading-8 text-gray-500 text-center">
                          <b>Calling all tech creatives! Apply for a spot to create and publish at the intersection of AI, art, and literature.</b>
                      </p>
                  </div>
                  <div className="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
                      <p><a href="https://www.steamship.com/">Steamship</a> is a platform for low-code Language AI development, partnered with Writing Atlas on a fellowship program to explore the intersection of tech and literature.
                          You’ll join a two-month-long fellowship in which we’ll coach you through building new features for Writing Atlas. This is an ideal opportunity for poets and writers with some coding proficiency, and coders with some poetry and writing proficiency.</p>

                      <p>Multi-talented, multi-hyphenate creatives are encouraged to apply.
                          We’ve planned each feature for a smooth development experience, and the results will be something you can show off in production while helping innovate in the broader world of publishing and literature.</p>
                  </div>

                  <div className="mt-4 sm:mt-0 sm:ml-3 text-center">
                    <a href="https://airtable.com/shr33hD9aXYV8jdzW" className="mt-10 inline-block px-10 rounded-md border border-transparent px-5 py-3 bg-indigo-500 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10">
                        Apply Now
                    </a>
                  </div>
                      
                  <div className="prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
                      <h2>Candidates</h2>
                      <p>We’re looking up to four fellows.</p>
                      <p>Fellows should be proficient Python programmers who have developed outside of a coursework context. We don’t need you to be a data scientist or ML expert (that’s the point!). Proficient Python and git is all you need to be able to thrive in this role.</p>
                      <p>Hobby projects, graduate research, internships, and professional experience are all sufficient. You should be familiar with Git workflow (pull requests) and good Python coding practices.</p>

                      <h2>Example Projects</h2>
                      <ul>
                          <li><b>AI Cover Art Generator</b><br />
                          You’ll build a tool that takes a story summary and automatically generates a book cover image. You’ll use a combination of technologies: entity recognition, prompt engineering, and image generation — as well as whatever you come up with. The output will be a web demo that anyone can use, and an API that can generate cover art for Writing Atlas.
                          </li>
                          <li><b>Story Summarizer</b><br />
                              You’ll build a web tool and API that accepts a story title and summary, and classifies it along a number of dimensions: genre, setting, character, and general tags. We’ll offer this API on the Writing Atlas website for anyone to use, and apply it to our own collection of stories to assist with our own labeling process.
                          </li>
                          <li><b>Story Search Engine</b><br />
                              You’ll build a search engine that enables people to enter queries like “Mystery book that takes place in Europe” and get back a list of relevant short stories from the Writing Atlas corpus. The output will be a web demo that anyone can use and an API that the Writing Atlas web site will incorporate.
                          </li>
                          <li><b>Bring your own project!</b><br />
                              When you look at the Writing Atlas data, do you come up with your own ideas? Let us know and we'll consider it!
                          </li>

                      </ul>

                      <h2>Compensation</h2>
                      <p>Fellows will receive $5,000 along a series of milestones:</p>
                      <ul className="ml-6">
                          <li>$250 for attending 3 seminar sessions and weekly project coaching sessions.</li>
                          <li>$1,000 for a prototype that accepts data and returns a pre-loaded response</li>
                          <li>$2,000 for a working, code-reviewed package (we will work with and coach you!)</li>
                          <li>$1,750 for a blog post and demo video (we will help edit your blog post).</li>
                      </ul>

                      <h2>Process</h2>
                      <p>The fellowship will be done over two months. We’ll meet via Zoom once a week and chat as needed in a shared Discord channel. We’ll divide up the projects among the fellows, and each project will have detailed coaching for how to implement it — with the creation and creative elements left to you.</p>

                      <h2 >Equity, Diversity and Inclusion</h2>
                      <p>We actively recruit and encourage applications from individuals from historically underrepresented communities in technology and media to apply, including women, people of color and/or from underrepresented cultural communities, veterans, people with disabilities and those who identify as LGBTQ+.</p>

                      <h2 >About</h2>
                      <p><b><a href={"https://www.steamship.com"}>Steamship</a></b> is building Heroku for Language AI — the fastest way to add language understanding to a product. Steamship lets developers build low-code Python packages that do things like search video streams, answer questions, classify content, or extract information from PDFs. We auto-scale these packages in the cloud so that their users never have to manage the infrastructure that makes it work.</p>
                      <p>We're backed by the top VCs in the industry, care deeply about developer tools, and are remote friendly.</p>
                    <p><a href="https://writingatlas.com/">Writing Atlas</a> is a project of <b><a href="https://www.plympton.com/">Plympton</a></b>, a literary studio. We do a range of innovative literary projects like Recovering the Classics, which pairs crowdsourced cover designs for great books in the public domain; run a writing residency in Downtown Las Vegas with the Writer’s Block bookstore; produce a VR film of George Saunders Man Booker Prize-winning novel, Lincoln in the Bardo, for The New York Times; and powered the Subway Library in New York City. As part of our work with Amazon Original Stories we have published authors including Margaret Atwood, Chimamanda Ngozi Adichie, Curtis Sittenfeld, Min Jin Lee, Tom Perrotta, Roxane Gay, Lauren Groff and Cheryl Strayed.</p>

                      <h2 >FAQs</h2>

                      <h3 >So what is Steamship exactly?</h3>
                      <p>Steamship is a platform for rapidly building and sharing services that process natural language. Think of it as a Zapier between all things AI.</p>

                      <h3 >So what is Writing Atlas?</h3>
                      <p>Writing Atlas is an ever-growing catalog of short stories with summaries, tags, and loglines. It was designed with a few populations in mind — movie producers and screenwriters; as well as machine learning folks who need structured data.</p>

                      <h3>Do I need to know NLP to do the fellowship?</h3>
                      <p>You’ll need to be a good Python developer and interested in natural language processing, but you do not need to have any prior NLP experience.</p>

                      <h3>I have a day job. How much time will this take? Can I do this while working full-time given the Zoom meetings?</h3>
                      <p>We’ve designed these projects to be “after-work” / “weekend-hacker” project-sized, and they were chosen to target what our platform makes easy to build. We’ll start you off with solid templates and coach you through any tricky spots, so you can use your time building instead of scratching your head.</p>

                      <h3>I’m a student, would I have enough experience to use Steamship?</h3>
                      <p>Students are great! Our only requirement is your Python abilities (see below question).</p>

                      <h3>How good do my Python skills have to be? I have experience in other programming languages, but my Python skills are kind of rusty.</h3>
                      <p>For this fellowship, we’re looking for programmers who are very comfortable with Python. Among the skills you’ll need are:</p>

                      <ul className="ml-6">
                          <li>Writing Python3 with types</li>
                          <li>Writing pytest tests</li>
                          <li>GitHub workflow (using PRs)</li>
                          <li>Standard Python coding</li>
                      </ul>
                      <p>If you’ve done an internship, or had equivalent outside-of-class experience, our guess is you’ll be fine. The reason for this requirement is that we want to hit the ground running building the projects we’ve planned, and to do that we need to assume Python knowledge.</p>

                      <h3 >Once I learn Steamship, what good will it do me?</h3>
                      <p>Steamship makes it easy to build and share software packages that store and process natural language data in the cloud. Steamship package doesn’t just “run models” – they can store data, run many models, query their results, and run logic. Imagine if you publish language AI libraries that managed their own cloud stack automatically – that’s what Steamship provides.</p>

                      <h3 >Steamship looks cool. What if I want to do another NLP project? Will you have fellowships for that?</h3>
                      <p>Absolutely — Steamship is a growing startup, with some incredible (yet unannounced) backers, building the platform we think is going to become a standard delivery vehicle for language AI packages. If you’re interested in continuing work with us after the fellowship, we’re open to a wide range of options.</p>
                  </div>
              </div>
          </div>
      </div>
    </Layout>
  )
}
