import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import './App.css';
import NotFound from './components/NotFound';
import Home from './components/Home';
import UserD from './components/UserD';
import CheckStatus from './components/CheckStatus';
import Register from './components/Register';
import Login from './components/Login';
import AdminDashBoard from './components/AdminDashBoard';
import AdminCheckStatus from './components/AdminCheckStatus';
import ApplyConferences from './components/ApplyConferences';
import ReviewerDashBoard from './components/Reviewer/ReviewerDashBoard';
import ReviewerPeer from './components/Reviewer/ReviewerPeer';
import ReviewerCamera from './components/Reviewer/ReviewerCamera';
import ReviewerPresentation from './components/Reviewer/ReviewerPresentation';
import ThankYouPage from './components/ThankYouPage';
// import Footer from './components/Footer';
import PublisherDashboard from './components/Publisher/PublisherDashboard';
import PublishedPaper from './components/Publisher/PublishedPaper';
import VerdictStage from './components/Publisher/VerdictStage';
import PublisherReviewerPeer from './components/Publisher/PublisherReviewerPeer';
import PublisherReviewerCamera from './components/Publisher/PublisherReviewerCamera';
import PublisherReviewerPresentation from './components/Publisher/PublisherReviewerPresentation';
import ProtectedRoute from './components/route/ProtectedRoute';
import AdminMisDash from './components/AdminMisDash';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/user" element={<ProtectedRoute Component={UserD} />} />
          <Route path="/user/applyconferences" element={<ProtectedRoute Component={ApplyConferences} />} />
          <Route path="/user/checkstatus" element={<ProtectedRoute Component={CheckStatus} />} />
          <Route path="/user/applyconferences/thankyoupage" element={<ProtectedRoute Component={ThankYouPage} />} />
          <Route path="/reviewerdashboard" element={<ProtectedRoute Component={ReviewerDashBoard} />} />
          <Route path="/reviewerdashboard/reviewerscreening/reviewerpeer" element={<ProtectedRoute Component={ReviewerPeer} />} />
          <Route path="/reviewerdashboard/reviewerscreening/reviewercamera" element={<ProtectedRoute Component={ReviewerCamera} />} />
          <Route path="/reviewerdashboard/reviewerscreening/reviewerpresentation" element={<ProtectedRoute Component={ReviewerPresentation} />} />
          <Route path="/admin" element={<ProtectedRoute Component={AdminDashBoard} />} />
          <Route path="/admin/admincheckstatus" element={<ProtectedRoute Component={AdminCheckStatus} />} />
          <Route path="/admin/mis" element={<ProtectedRoute Component={AdminMisDash} />} />


          <Route path="/publisherdashboard" element={<ProtectedRoute Component={PublisherDashboard} />} />
          <Route path="/publisherdashboard/publishedpaper" element={<ProtectedRoute Component={PublishedPaper} />} />
          <Route path="/publisherdashboard/verdictstage" element={<ProtectedRoute Component={VerdictStage} />} />
          <Route path="/publisherdashboard/verdictstage/publisherreviewerpeer" element={<ProtectedRoute Component={PublisherReviewerPeer} />} />
          <Route path="publisherdashboard/verdictstage/publisherreviewercamera" element={<ProtectedRoute Component={PublisherReviewerCamera} />} />
          <Route path="/publisherdashboard/verdictstage/publisherreviewerpresentation" element={<ProtectedRoute Component={PublisherReviewerPresentation} />} >
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

