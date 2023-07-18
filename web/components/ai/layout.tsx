import Head from '../../components/utility/site/Head'
import Layout from '../../components/layout'
import Header from '../../components/utility/site/Header'
import React, { useEffect, useState } from 'react'
import Tag from '../tag/Tag'


const DEFAULT_DESCRIPTION = "A woman traveling to London to meet a long lost relative discovers she has the power to travel through time, but every time she does, she changes. Is her new gift worth the cost?"
const MAX_CHECKS = 100;
const STEPS = [
  "Searching through thousands of hand-curated short stories..",
  "Found one! Analyzing story to determine key features..",
  "Combining key features into a recommendation strategy..",
  "Generating a personalized recommendation, just for you ❤️..",
  "EEK! GPT is being slow today..",
  "Hand-writing your recommendation with an old quill pen..",
  "Shaking it like a Polaroid picture, so the ink will dry..",
]

interface RecommendationTagValue {
  topic: string;
  location: string;
  author: string;
  title: string;
  explanation: string;
  audience: string;
  slug: string
}

interface RecommendationTag {
  value: RecommendationTagValue
  text: string;
}

interface Recommendation {
  score?: number;
  tag: RecommendationTag
}

function StoryRec(props: Recommendation) {
  let v = props.tag?.value;

  if (!v) {
    return <div>?</div>
  }

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg mb-10">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          <a target="_blank" href={`/story/${v.slug}`}>{v.title}</a></h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">by {v.author}</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">Why the AI thinks you'll like it</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {v.explanation}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">AI's Estimate of Location</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{v.location}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">AI's Estimate of Audience</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{v.audience}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">AI's estimate of Topic</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{v.topic}</dd>
          </div>
        </dl>
      </div>
    </div>    
  )
}


interface Prediction {
  setting: string;
  character: string;
  genre: string;
  logline: string;
  tag: string;
  ifyoulike: string;
}

function Tags(x, kind?: string) {
  return x ? x.map((y) => 
    <Tag key={y} label={y} kind={kind} />
  ) : ''
}

function StoryPred(v: Prediction) {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg mb-10">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Predicted Tags
        </h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">Setting</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{Tags(v.setting)}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">Character</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{Tags(v.character)}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">Genre</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{Tags(v.genre, "GENRE")}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">Logline</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{v.logline ? v.logline.join(',') : ''}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">Tags</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{Tags(v.tag, "TAG")}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">If you like..</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{Tags(v.ifyoulike, "IFYOULIKE")}</dd>
          </div>
        </dl>
      </div>
    </div>    
  )
}

interface AIAppLayoutProps {
  title: string;
  story: any;
  handle: string;
  steamshipPackage: string;
  author: string;
  usesTitle?: boolean;
  usesDescription?: boolean;
}
export default function AIAppLayout(props: AIAppLayoutProps) {
  const {handle, title: theTitle, story, steamshipPackage, usesTitle, usesDescription} = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(DEFAULT_DESCRIPTION);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const [output, setOutput] = useState(null);
  const [error, setError] = useState(null);
  const [allowInput, setAllowInput] = useState(true);
  const [generatingJokes, setGeneratingJokes] = useState([]);
  const [checkCount, setCheckCount] = useState(0);
  
  useEffect(() => {
    const disabled = (isChecking === true) || (isGenerating === true)
    setAllowInput(!disabled)
  }, [isChecking, isGenerating])

  const generate = () => {
    if (!allowInput) {
      return;
    }
    setCheckCount(0);
    setIsGenerating(true);
    setOutput(null)
    setError(null);
    setTaskId(null);
    setIsChecking(false);

    const url = `/api/ai/${steamshipPackage}/submit_job`
    const data = { 
      title, 
      description, 
      handle: handle,
      packageHandle: steamshipPackage 
    }
    
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      if (data.state == "failed") {
        setError(data.statusMessage)
        setIsChecking(false);
        setIsGenerating(false);  
      } else if ((data.state == "succeeded") || (typeof data.state == "undefined")) {
        setIsGenerating(false);  
        setIsChecking(false);
        setOutput(data.output || data);
      } else {
        console.log(data)
        setTaskId(data.taskId)
        setIsGenerating(false); 
        setIsChecking(true) 

        check(data.taskId)
        const interval = 3500;
        for (let i = 0; i < STEPS.length; i++) {
          setTimeout(() => {
            setGeneratingJokes(STEPS.slice(0,i+1))
          }, interval*(i)) 
        }
      }
    })
    .catch(error => {
      setError(error)
      setTaskId(null);
      setOutput(null);
      setIsGenerating(false);
      setIsChecking(false);
    });
  }

  const check = async (_taskId: string) => {
    if (!_taskId) {
      setError("No Task ID found.");
      return;
    }
    const url = `/api/ai/${steamshipPackage}/check_job`
    const data = { taskId: _taskId, packageHandle: steamshipPackage }
    
    let result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    let task = await(result as any).json()

    if (task && task.state == "succeeded") {
      setTaskId(null);
      setOutput(null);
      setIsGenerating(false);
      setIsChecking(false);  
      const op = task.output;
      const j = JSON.parse(op);
      setOutput(j as Recommendation[])
    } else if (task && task.state == "failed") {
      setTaskId(null);
      setOutput(null);
      setIsGenerating(false);
      setOutput(null);
      setError(task.statusMessage)
    } else if (task && task.state == "running") {
      if (checkCount > MAX_CHECKS) {
        setError("Checked 100 times, but there was no result :(")
      } else {
        setCheckCount((c) => {
          return c + 1
        });
        setTimeout(() => {
          check(_taskId)
        }, 600)  
      }
    }
  }

  let _op = <></>
  if (output) {
    if (steamshipPackage == "story-recommendations") {
      _op = output.map((r) => <StoryRec {...r as any} />)
    } else if (output.text) {
      _op = <p>{output.text}</p>
    } else if (output.image_urls) {
      _op = <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {output.image_urls.map((url) => (
            <li key={url}>
              <img className="aspect-[3/2] w-full rounded-2xl object-cover" src={url} alt="" />
            </li>
          ))}
        </ul>
    } else if (steamshipPackage == "sil-hard-coded-package") {
      _op = 
        <StoryPred {...output as any} />
    }
  } 

  return (
    <Layout user={null} loading={false}>
      <Head title={theTitle} />
      <Header showBooks={false} showAuthor={false} showBook={false} />
      <div className="bg-white">
        <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12 mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{theTitle}</h2>
            {story}
          </div>

          <div className="prose mb-10">
            <h2>Input</h2>

            <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
              <div className="grid grid-cols-3 gap-6">
                  {(usesTitle) && (
                    <div className="col-span-3 sm:col-span-2">
                    <label htmlFor="company-website" className="block text-sm font-medium leading-6 text-gray-900">
                      Title
                    </label>
                    <div className="mt-2 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="company-website"
                        id="company-website"
                        onChange={(e) => {setTitle(e.target.value)}}
                        className="block w-full flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="A Murder in Four Parts"
                      />
                    </div>
                  </div>
                  )}
              </div>

              {(usesDescription) && (
                <div>
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                  {(steamshipPackage == "story-recommendations") ? "What do you like? We'll write you a recommendation." : "Story Description"}
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    onChange={(e) => {setDescription(e.target.value)}}
                    value={description}
                    className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                    placeholder={DEFAULT_DESCRIPTION}
                    disabled={(!(allowInput === true))}
                  />
                </div>
              </div>
              )}

            </div>

            <button
              type="button"
              disabled={(!(allowInput === true))}
              className="mt-10 rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={generate}
            >
              Generate
            </button>
          </div>
          {(isGenerating || isChecking) && (
            <div className="prose">
              <h2>Generating..</h2>
              <ul>
                {generatingJokes.map((j) => <li key={j}>{j}</li>)}
              </ul>
            </div>  
          )}
          {(error) && (
            <div className="prose">
              <h2>Error</h2>
              <p>{error}</p>
            </div>  
          )}
          {(output) && (
          <div className="prose">
            <h2>Output</h2>
            {_op}
          </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

