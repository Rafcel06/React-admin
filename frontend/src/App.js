import './App.css';
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthGuard from './gaurd/AuthGuard.jsx';





//  Components route

const HomePage = lazy(() => import('./components/Home.jsx'));
const LoginPage = lazy(() => import('./components/Login.jsx'));
const LoaderPage = lazy(() => import('./components/Loader.jsx'));
const AuthLoaderPage = lazy(() => import('./components/Authloader.jsx'));
const ForgotEmailPage = lazy(() => import('./components/ForgotEmail.jsx'));
const PageNotFoundPage = lazy(() => import('./components/PageNotFound.jsx'));
const ResetPasswordPage = lazy(() => import('./components/ResetPassword.jsx'))


// chatComponent route


const ClientChat = lazy(() => import('./components/chatRoomComponents/ClientChat.jsx'))

// Authenticated route

const DashboardPage = lazy(() => import('./components/Dashboard.jsx'))
const AnalyticsPage = lazy(() => import('./components/Users.jsx'))
const ReportPage = lazy(() => import('./components/Report.jsx'))

function App() {
  return (
    
       <Routes>
            <Route path='/' element={
              <Suspense fallback={<LoaderPage/>}>
                  <LoginPage />
              </Suspense>
          }/>

        

            <Route path='/home' element={
              <Suspense fallback={<LoaderPage/>}>
                         <AuthGuard>
                              <HomePage/>
                        </AuthGuard>
              </Suspense>
          }> 

          
              <Route path='' element={
                   <Suspense fallback={<AuthLoaderPage/>}>
                     <DashboardPage/>
                   </Suspense>}/>

             <Route path='Users' element={
                   <Suspense fallback={<AuthLoaderPage/>}>
                    <AnalyticsPage/>
                   </Suspense>}/>

            <Route path='Report' element={
                   <Suspense fallback={<AuthLoaderPage/>}>
                    <ReportPage/>
                   </Suspense>}/>
          


          </Route>
     
          <Route/>

            <Route path='/forgot-password' element={
               <Suspense fallback={<LoaderPage/>}>
                   <ForgotEmailPage/>
             </Suspense>}/>

             
            <Route path='/reset-password' element={
              <Suspense fallback={<LoaderPage/>}>
                      <ResetPasswordPage/>
            </Suspense>}/>


            <Route path='/client-chat' element={
               <Suspense fallback={<LoaderPage/>}>
                       <ClientChat/>
               </Suspense>
            }/>

              <Route path='*' element={
               <Suspense fallback={<LoaderPage/>}>
                   <PageNotFoundPage/>
             </Suspense>}/>
       </Routes>
  );
};


export default App;
