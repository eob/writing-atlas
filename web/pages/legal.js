import Head from '../components/utility/site/Head'
import Header from '../components/utility/site/Header'
import {TP_P, TitledPage} from '../components/utility/panels/TitledPage'
import Layout from '../components/layout'

export async function getStaticProps() {
  return {
    props: {
    }
  };
}

export default function Home({ books }) {
  return (
    <div>Hi</div>
  )
}
