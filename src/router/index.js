import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SignUpPage from '../pages/sign-up'
import LoginPage from '../pages/login'
import TeacherIndex from '../pages/teacher-index'
import Classroom from '../pages/teacher/classroom'
import Assignment from '../pages/teacher/assignment'
import StudentIndex from '../pages/student-index'
import AssignmentList from '../pages/student/assignment-list'
import StuAssignment from '../pages/student/assignment'
import Check from '../pages/teacher/check'
import CheckDetail from '../pages/teacher/check-detail'
import Sheet from '../pages/teacher/sheet'
import StuHome from '../pages/student/student-home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/sign',
      name: 'SignUpPage',
      component: SignUpPage,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
      alias: '/'
    },
    {
      path: '/teacher',
      component: TeacherIndex,
      children: [{
        path: 'classroom',
        name: 'Classroom',
        component: Classroom
      }, {
        path: 'assignment',
        name: 'Assignment',
        component: Assignment
      }, {
        path: 'check',
        name: 'Check',
        component: Check
      }, {
        path: 'check-detail',
        name: 'CheckDetail',
        component: CheckDetail
      }, {
        path: 'sheet',
        name: 'Sheet',
        component: Sheet
      }]
    },
    {
      path: '/student',
      component: StudentIndex,
      children: [{
        path: 'assignment',
        name: 'Assignment',
        component: StuAssignment
      }, {
        path: 'home',
        name: 'StuHome',
        component: StuHome
      }]
    }
  ]
})
