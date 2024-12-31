import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { TopicsComponent } from './components/topics/topics.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, 
    { path: 'topics', component: TopicsComponent }, 
    { path: 'posts', component: PostsComponent },
    { path: 'posts/:postId', component: PostDetailComponent }, 
    { path: 'topics/:topicId', component: TopicDetailComponent }, 
    { path: 'signup', component: SignupComponent }, 
    { path: 'login', component:  LoginComponent}, 
    { path: 'profile', component:  ProfileComponent}, 
];
