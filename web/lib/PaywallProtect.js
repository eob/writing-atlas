import objectPath from "object-path"
import {UserPlanFault} from '../common/stripe/StripePlans'

export default async function PaywallProtect(obj, keypath, {requiredPlan, userPlans}) {
  let fault = await UserPlanFault({requiredPlan, userPlans});
  if (fault == null) {
    return obj
  }
  objectPath.set(obj, keypath, fault)
  return obj
}