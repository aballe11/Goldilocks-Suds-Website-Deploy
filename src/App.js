import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Pages/Home';
import Touchpoints from './Pages/Touchpoints/Touchpoints';
import Media from './Pages/Media/Media';
import UserData from './Pages/UserData/UserData';
import ViewTouchpoint from './Pages/Touchpoints/ViewEditCreate/ViewTouchpoint';
import ImageUploader from './Pages/Touchpoints/ViewEditCreate/Forms/MCI/ImageUploader'

import TouchpointLibrary from './Pages/Touchpoints/TPLibrary/TouchpointLibrary';
import ViewEditCreateTemplate from './Pages/Touchpoints/ViewEditCreate/ViewEditCreateTemplate';

function App() {
  return (
    <div >
      <Layout>
        <Routes>
          <Route path='/Goldilocks-Suds-Website-Deploy' element={<Home />} />
          

          <Route path='/Goldilocks-Suds-Website-Deploy/touchpoint-template-library' element={<TouchpointLibrary />} />
          <Route path='/Goldilocks-Suds-Website-Deploy/touchpoint-template-library/edit-touchpoint' element={<ViewTouchpoint/>} />
          <Route path='/Goldilocks-Suds-Website-Deploy/touchpoint-template-library/create-new' element={<ViewEditCreateTemplate />} />
          <Route path='/Goldilocks-Suds-Website-Deploy/touchpoint-template-library/upload-images' element={<ImageUploader />} />

          <Route path='/Goldilocks-Suds-Website-Deploy/media' element={<Media />} />
          <Route path='/Goldilocks-Suds-Website-Deploy/user-data' element={<UserData />} />
          
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
