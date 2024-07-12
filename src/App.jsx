import './App.css'
import { conf } from './conf/conf'

function App() {
  return (
    <>
      <ul>
        <li>{ conf.appwriteURL }</li>
        <li>{ conf.appwriteProjectID }</li>
        <li>{ conf.appwriteDatabaseID }</li>
        <li>{ conf.appwriteBlogsCollectionID }</li>
        <li>{ conf.appwriteBucketID }</li>
      </ul>
    </>
  )
}

export default App
