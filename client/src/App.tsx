import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import theme from './assets/theme';
import { persistor, store } from './util/redux/store';
import NotFoundPage from './NotFound/NotFoundPage';
import HomePage from './Home/HomePage';
import AboutThisProjectPage from './Home/AboutThisProjectPage';
import AdminDashboardPage from './AdminDashboard/AdminDashboardPage';
import EditResource from './components/EditResource';
import EditQuestion from './components/EditQuestion';
import {
  UnauthenticatedRoutesWrapper,
  ProtectedRoutesWrapper,
  DynamicRedirect,
  AdminRoutesWrapper,
} from './util/routes';
import VerifyAccountPage from './Authentication/VerifyAccountPage';
import RegisterPage from './Authentication/RegisterPage';
import LoginPage from './Authentication/LoginPage';
import EmailResetPasswordPage from './Authentication/EmailResetPasswordPage';
import ResetPasswordPage from './Authentication/ResetPasswordPage';
import QuestionPage from './Question/QuestionPage';

function App() {
  /* const testa = {
    id: 'A123',
    text: 'answer',
    resultantQuestionId: '1234',
  } as IAnswer;
  const testq = {
    id: '123',
    text: 'hi',
    isQuestion: true,
    resultantAnswers: [testa],
  } as IQuestion; */

  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
              <CssBaseline>
                <Routes>
                  {/* Routes accessed only if user is not authenticated */}
                  <Route element={<UnauthenticatedRoutesWrapper />}>
                    <Route path="/login" element={<QuestionPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                      path="/verify-account/:token"
                      element={<VerifyAccountPage />}
                    />
                    <Route
                      path="/email-reset"
                      element={<EmailResetPasswordPage />}
                    />
                    <Route
                      path="/reset-password/:token"
                      element={<ResetPasswordPage />}
                    />
                    {/* <Route element={<AdminRoutesWrapper />}> */}
                    <Route path="/users" element={<AdminDashboardPage />} />
                    {/* </Route> */}
                    <Route path="/editResource" element={<EditResource />} />
                    <Route path="/editQuestion" element={<EditQuestion />} />
                  </Route>
                  {/* Routes accessed only if user is authenticated */}
                  {/* <Route element={<AdminRoutesWrapper />}> */}
                  <Route element={<ProtectedRoutesWrapper />}>
                    {/* <Route path="/users" element={<AdminDashboardPage />} /> */}
                  </Route>

                  {/* Route which redirects to a different page depending on if the user is an authenticated or not by utilizing the DynamicRedirect component */}
                  <Route
                    path="/admin-dashboard"
                    element={<AdminDashboardPage />}
                  />
                  {/* Route which redirects to a different page depending on if the user is an authenticated or not by utilizing the DynamicRedirect component */}
                  <Route
                    path="/"
                    element={
                      <DynamicRedirect
                        unAuthPath="/home"
                        authPath="/admin-dashboard"
                      />
                    }
                  />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/about" element={<AboutThisProjectPage />} />
                  <Route path="/question" element={<QuestionPage />} />

                  {/* Route which is accessed if no other route is matched */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </CssBaseline>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
