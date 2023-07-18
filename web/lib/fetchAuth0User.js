export async function fetchAuth0User(auth0, req) {
  try {
    let session = await auth0.getSession(req)
    let profile = null;

    if (session.user) {
      profile = session.user;
    } else {
      console.log("No user profile in session")
      throw new Error("No user profile in session.")
    }

    return profile
  } catch (error) {
    console.error(error);
    throw error
  }
}


export async function fetchAuth0UserId(auth0, req) {
  try {
    let profile = await fetchAuth0User(auth0, req)
    if (profile.user_id) {
      return profile.user_id
    }
    if (profile.sub) {
      return profile.sub
    }
    console.log("No user ID present on auth token")
    throw new Error("No user ID present on auth token")
  } catch (error) {
    console.error(error);
    throw error
  }
}