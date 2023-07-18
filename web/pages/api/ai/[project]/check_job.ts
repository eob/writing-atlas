import type { NextApiRequest, NextApiResponse } from 'next'
import {getTask} from '@steamship/steamship-nextjs'
import { workspaceMaker } from '../../../../components/ai/constants';
import { Steamship, Task } from '@steamship/client';

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
    packageHandle,
 } = req.body as any;

 if (!packageHandle) { return errorResponse("Please include a Package Handle.") }

  const { taskId } = req.body as any;
  const workspace = workspaceMaker(packageHandle)
  if (!taskId) { return errorResponse("Please enter a taskId.") }

  console.log(packageHandle)
  if (packageHandle == "sil-hard-coded-package") {
    // Special case for Sil's
    const client = new Steamship({
      apiKey: process.env.SIL_KEY,
      workspace: 'sil'
    })
    let task = new Task(client, {taskId})
    await task.check()
    res.json(task)
  }

  const outer_task = await getTask({taskId, workspace});
  console.log(outer_task)
  return res.json(outer_task)
}