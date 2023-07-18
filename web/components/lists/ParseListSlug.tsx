/**
 * @file ParseListSlug.tsx
 * @brief Utility for parsing the URL arguments on a page that lists search results
 *
 * @author @eric-zhizu
 * @date June 2022
 */

/**
 * @brief Parse URL arguments "/listName/[page]/[orderBy]
 *
 * @pre The page that calls this function should be named [...slug] as per
 *      https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 * @param params [Object] which is passed into NextJS's getStaticProps function
 * @return [Object] parsed URL arg values
 */
export function parseListSlug(params) {
  let page = 1
  let orderBy = "mostPopular"
  if (params && params.slug) {
    page = params.slug.length >= 1 ? params.slug[0] : 1
    orderBy = params.slug.length >= 2 ? params.slug[1] : "mostPopular"
  }
  return { page, orderBy }
}