import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Pages/Home';
import MediaLibrary from './Pages/Media/MediaLibrary';
import UserData from './Pages/UserData/UserData';
import VECForm from './Pages/Touchpoints/ViewEditCreate/VECForm';
import ViewTouchpoint from './Pages/Touchpoints/ViewEditCreate/ViewTouchpoint';
import ImageUploader from './Pages/Touchpoints/ViewEditCreate/Forms/MCI/ImageUploader'
import EditVideo from './Pages/Media/VideoEditor/EditVideo';
import TouchpointLibrary from './Pages/Touchpoints/TPLibrary/TouchpointLibrary';

function App() {

  //Function that establishes all the possible web routes, and what files each will run.
    return (
    <div >
      
      <Layout>
        <Routes>
          <Route path='/Goldilocks-Suds-Website-Deploy' element={<Home />} />
          

          <Route path='/Goldilocks-Suds-Website-Deploy/touchpoint-template-library' element={<TouchpointLibrary />} />
          <Route path='/Goldilocks-Suds-Website-Deploy/touchpoint-template-library/edit-touchpoint' element={<ViewTouchpoint/>} />
          <Route path='/Goldilocks-Suds-Website-Deploy/touchpoint-template-library/create-new' element={<VECForm />} />
          <Route path='/Goldilocks-Suds-Website-Deploy/touchpoint-template-library/upload-images' element={<ImageUploader />} />

          <Route path='/Goldilocks-Suds-Website-Deploy/media' element={<MediaLibrary />} />
          <Route path='/Goldilocks-Suds-Website-Deploy/media/edit-video' element={<EditVideo />} />

          <Route path='/Goldilocks-Suds-Website-Deploy/user-data' element={<UserData />} />
          
        </Routes>
      </Layout>
    </div>
  );
}export default App;
