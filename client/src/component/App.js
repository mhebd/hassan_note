import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../asset/css/style.css';
import { ArticleProvider } from '../context/article/ArticleProvider';
import { CategoryProvider } from '../context/category/CategoryProvider';
import { CommentProvider } from '../context/comment/ComentProvider';
import { PageProvider } from '../context/page/PageProvider';
import { SettingProvider } from '../context/setting/SettingProvider';
import { UserProvider } from '../context/user/UserProvider';
import setHeader from '../util/setHeader';
import Footer from './common/footer/Footer';
import Header from './common/header/Header';
import Notfound from './pages/404/Notfound';
import Article from './pages/article/Article';
import Category from './pages/category/Category';
import Articles from './pages/dashboard/article/Articles';
import Setting from './pages/dashboard/change-setting/Setting';
import CreatePage from './pages/dashboard/create-apge/CreatePage';
import CreateArticle from './pages/dashboard/create-article/CreateArticle';
import Pages from './pages/dashboard/page/Pages';
import Profile from './pages/dashboard/profile/Profile';
import Home from './pages/home/Home';
import Page from './pages/page/Page';
import Register from './pages/register/Register';
import Search from './pages/search/Search';
import PrivateRoute from './PrivateRoute';

// Set token in header
if (localStorage.token) setHeader(localStorage.token);

function App() {
  return (
    <SettingProvider>
      <UserProvider>
        <ArticleProvider>
          <PageProvider>
            <CategoryProvider>
              <CommentProvider>
                <Router>
                  <Header />
                  <main className="my-4">
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route exact path="/article/:slug" component={Article} />
                      <Route exact path="/page/:slug" component={Page} />
                      <Route exact path="/category/:id" component={Category} />
                      <Route exact path="/search" component={Search} />
                      <Route exact path="/register" component={Register} />
                      <PrivateRoute
                        exact
                        path="/dashboard/create-article"
                        component={CreateArticle}
                      />
                      <PrivateRoute exact path="/dashboard/create-page" component={CreatePage} />
                      <PrivateRoute exact path="/dashboard/change-setting" component={Setting} />
                      <Route exact path="/dashboard/articles" component={Articles} />
                      <PrivateRoute exact path="/dashboard/pages" component={Pages} />
                      <PrivateRoute exact path="/dashboard/profile" component={Profile} />
                      <Route exact component={Notfound} />
                    </Switch>
                  </main>
                  <Footer />
                </Router>
              </CommentProvider>
            </CategoryProvider>
          </PageProvider>
        </ArticleProvider>
      </UserProvider>
    </SettingProvider>
  );
}

export default App;
