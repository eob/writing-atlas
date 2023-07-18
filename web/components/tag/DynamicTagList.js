import Head from '../utility/site/Head'
import Header from '../utility/site/Header'
import Layout from '../layout'
import useApi from '../../lib/use-api';
import UnknownError from '../utility/indicators/Error'
import { ListHeader as TagHeader } from '@heavyfoundry/hf-react'
import BookRow from '../book/BookRow'
import LoadingIndicator from '../utility/indicators/Loading'


export default function DynamicTagList({user, kind, handle}) {
  const { response, error, isLoading } = useApi(`/api/v1/${kind}/${handle}`);
  let body = null;
  let name = null;
  let description = null;
  let file_tags = null;

  let categoryHeader = kind == "COLLECTION" ? "Collection" : "Tag"

  if (isLoading) {
    body = (<LoadingIndicator />)
  } else if (error) {
    body = (<UnknownError message={`[${error.code}] ${error.error}`} />)
  } else if ((typeof response == 'undefined') || (typeof response.data == 'undefined')) {
    body = (<UnknownError message="Missing collection result from server." />)
  } else {
    name = response.data.name
    description = response.data.description
    file_tags = response.data.file_tags
    let files = file_tags.map(x => x.file);
    if (files.length == 0) {
      body = "No stories found";
    } else {
      body = files.map((file) => {
        return <BookRow book={file} />
      })
    }
  }
  
  return (
    <Layout user={user} loading={isLoading}>
      <Head title={name} />
      <Header />
      <TagHeader supertitle={categoryHeader} title={name} subtitle={description} />
      <div className="relative bg-white pb-20 px-4 sm:px-6 lg:pb-28 lg:px-8">
        <div className="relative max-w-3xl mx-auto">
          {body}          
        </div>
      </div>
    </Layout>
  );
}