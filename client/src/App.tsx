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
import EditResourcePage from './AdminDashboard/EditResourcePage';
import EditQuestionPage from './AdminDashboard/EditQuestionPage';
import EditDefinitionPage from './AdminDashboard/EditDefinitionPage';
import {
  UnauthenticatedRoutesWrapper,
  ProtectedRoutesWrapper,
  DynamicRedirect,
} from './util/routes';
import VerifyAccountPage from './Authentication/VerifyAccountPage';
import RegisterPage from './Authentication/RegisterPage';
import LoginPage from './Authentication/LoginPage';
import EmailResetPasswordPage from './Authentication/EmailResetPasswordPage';
import ResetPasswordPage from './Authentication/ResetPasswordPage';
import QuestionPage from './Question/QuestionPage';
import AllResourcesPage from './Home/AllResourcesPage';

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
                    <Route path="/login" element={<LoginPage />} />
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
                  </Route>

                  <Route path="/home" element={<HomePage />} />
                  <Route path="/question" element={<QuestionPage />} />
                  <Route path="/all-resources" element={<AllResourcesPage />} />
                  {/* Routes accessed only if user is authenticated */}
                  <Route element={<ProtectedRoutesWrapper />}>
                    <Route
                      path="/admin-dashboard"
                      element={<AdminDashboardPage />}
                    />
                    <Route path="/users" element={<AdminDashboardPage />} />
                    <Route
                      path="/edit-resource"
                      element={<EditResourcePage />}
                    />
                    <Route
                      path="/edit-question"
                      element={<EditQuestionPage />}
                    />
                    <Route
                      path="/edit-definition"
                      element={<EditDefinitionPage />}
                    />
                  </Route>

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
                  <Route path="/about" element={<AboutThisProjectPage />} />

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
