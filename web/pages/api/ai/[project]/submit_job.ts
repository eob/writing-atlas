import type { NextApiRequest, NextApiResponse } from 'next'
import { getSteamshipClient, getSteamshipPackage } from '@steamship/steamship-nextjs'
import {PluginInstance, Steamship, Task, TaskStatus} from "@steamship/client";
import AiProjects, { workspaceMaker } from '../../../../components/ai/constants';

const decode = (str: string):string => Buffer.from(str, 'base64').toString('binary');

/*
 * Returns a Task<ImageResults> object
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const errorResponse = (message: string) => {
    return res.json({ 
      state: 'failed', 
      statusMessage: message
    })
  }

  /*
   * This is the input structure for processing a job.
   */
  const {
     title,
     description,
     packageHandle,
     handle,
  } = req.body as any;

  let project: any = null;

  for (let item of AiProjects) {
    if (item.handle == handle) {
      project = item
    }
  }

  if (!project) { return errorResponse("Unable to find that project.") }

  if (!title && project.usesTitle) { return errorResponse("Please enter a title.") }
  if (!description  && project.usesDescription) { return errorResponse("Please enter a description.") }
  if (!packageHandle) { return errorResponse("Please include a Package Handle.") }
  if (!handle) { return errorResponse("Please include a handle.") }

  const {steamshipWorkspace, steamshipInstance, steamshipVersion, steamshipPackage} = project;
  const steamshipMethod = project.steamshipMethod || "generate";

  if (!steamshipWorkspace) { return errorResponse("steamshipWorkspace missing")}
  if (!steamshipInstance) { return errorResponse("steamshipInstance missing.") }
  if (!steamshipVersion) { return errorResponse("steamshipVersion missing.") }
  if (!steamshipPackage) { return errorResponse("steamshipPackage missing.") }

  try {
    const workspace = workspaceMaker(packageHandle)

    let steamshipArguments = {}
    let resp: Task<any>;

    if (project.handle == "story-recommendations") {
      const client = getSteamshipClient({workspace: steamshipWorkspace})
      steamshipArguments = {query: description}
      let pkg = await client.use(
        steamshipPackage,
        steamshipInstance,
        {},
        steamshipVersion,
        true
      )
      // Invoke a method on the package defined in steamship/api.py. Full syntax: pkg.invoke("method", {args}, "POST" | "GET")
      // Since we use invokeAsync here, the result will be a task that we can poll. This guarantees the Vercel function
      // can return quickly without having the paid plan.
      resp = await pkg.invokeAsync(steamshipMethod, steamshipArguments)
    } else if (project.handle == "tag-prediction") {
      const client = new Steamship({
        apiKey: process.env.SIL_KEY,
        workspace: steamshipWorkspace
      })
      let pkg = await client.use(
        steamshipPackage,
        steamshipInstance,
        {},
        steamshipVersion,
        true
      )

      steamshipArguments = {summary: description}
      resp = {
        state: "succeeded",
        output: (await pkg.invoke(steamshipMethod, steamshipArguments) as any).data
      } as any
    }

    console.log(resp)
    return res.json({...resp})
  } catch (ex) {
    console.log(ex)
    const awaitedEx = (await ex) as any;

    if (awaitedEx?.response?.data?.status?.statusMessage) {
      return res.json({ state: 'failed', statusMessage: awaitedEx?.response?.data?.status?.statusMessage })
    }

    console.log(typeof awaitedEx)
    console.log(awaitedEx)

    return res.json({ state: 'failed', statusMessage: `There was an error responding to your message.` })
  }
}


