import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Pages/Home';
import Touchpoints from './Pages/Touchpoints/Touchpoints';
import Media from './Pages/Media/Media';
import UserData from './Pages/UserData/UserData';
import ViewTouchpoint from './Pages/Touchpoints/ViewEditCreate/ViewTouchpoint';

import TouchpointLibrary from './Pages/Touchpoints/TPLibrary/TouchpointLibrary';
import ViewEditCreateTemplate from './Pages/Touchpoints/ViewEditCreate/ViewEditCreateTemplate';
import { arrayOfTemplates } from './Pages/Touchpoints/TPLibrary/TouchpointTable';

function App() {
  return (
    <div >
      <Layout>
        <Routes>
          <Route path='/Goldilocks-Suds-Website-Deploy' element={<Home />} />
          

          <Route path='/touchpoints' element={<Touchpoints />} />
          <Route path='/touchpoints/touchpoint-template-library' element={<TouchpointLibrary />} />
          <Route path='/touchpoints/touchpoint-template-library/edit-touchpoint' element={<ViewTouchpoint/>} />
          <Route path='/touchpoints/create-new' element={<ViewEditCreateTemplate />} />

          <Route path='/media' element={<Media />} />
          <Route path='/user-data' element={<UserData />} />
          
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
