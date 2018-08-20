import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'
import router from './router'

Vue.use(Vuex)

const baseURL = 'https://immense-ravine-38119.herokuapp.com'
// const baseURL = 'http://localhost:3000'

export default new Vuex.Store({
  state: {
    isLogin: false,
    // notFbLogin: true,
    tasks: [],
    weather: {},
    result: {}
  },
  mutations: {
    userLoginFB (state) {
      state.isLogin = true
      // state.notFbLogin = false
    },
    userLoggedIn (state) {
      state.isLogin = true
    },
    userLoggedOut (state) {
      state.isLogin = false
      // state.notFbLogin = true
    },
    setTodo (state, todoList) {
      state.tasks = todoList.data.list
    },
    setWeather (state, weatherData) {
      state.weather = weatherData.data.data
    },
    setResult (state, resultData) {
      state.result = resultData.data
    }
  },
  actions: {
    loginUser ({
      commit
    }, userData) {
      let email = userData.email
      let password = userData.password
      axios.post(`${baseURL}/index/login`, {
        email,
        password
      })
        .then(function (response) {
          if (response.data.message !== 'Success login') {
            swal(response.data.message, {
              icon: 'warning'
            })
          } else {
            swal(response.data.message, {
              icon: 'success'
            })
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('name', response.data.name)
            localStorage.setItem('email', response.data.email)
            localStorage.setItem('phone', response.data.phone)
            localStorage.setItem('fb', 0)
            commit('userLoggedIn')
            router.push('/home')
          }
        })
        .catch(function (err) {
          swal({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'warning'
          })
        })
    },
    registerNewUser ({
      dispatch
    }, userData) {
      let name = userData.name
      let email = userData.email
      let phone = userData.phone
      let password = userData.password
      axios.post(`${baseURL}/index/register`, {
        name,
        email,
        phone,
        password
      })
        .then(function (response) {
          swal({
            title: 'Success',
            text: response.data.message,
            icon: 'success'
          })
          dispatch('loginAfterRegister', userData)
        })
        .catch(function (err) {
          swal({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'warning'
          })
        })
    },
    loginAfterRegister ({
      commit
    }, userData) {
      let email = userData.email
      let password = userData.password
      axios.post(`${baseURL}/index/login`, {
        email,
        password
      })
        .then(function (response) {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('name', response.data.name)
          localStorage.setItem('email', response.data.email)
          localStorage.setItem('phone', response.data.phone)
          commit('userLoggedIn')
          router.push('/home')
        })
        .catch(function (err) {
          swal({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'warning'
          })
        })
    },
    loginFB ({
      commit
    }, profile) {
      let firstname = profile.name.split(' ')
      let name = firstname[0]
      let email = profile.email || `${name}@mail.com`
      let phone = profile.phone || '081234567890'
      let fbId = profile.id
      axios.post(`${baseURL}/index/loginfb`, {
        name,
        email,
        phone,
        fbId
      })
        .then(function (response) {
          swal({
            title: 'Success',
            text: response.data.message,
            icon: 'success'
          })
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('name', response.data.name)
          localStorage.setItem('email', response.data.email)
          localStorage.setItem('phone', response.data.phone)
          localStorage.setItem('fb', 1)
          commit('userLoginFB')
          router.push('/home')
        })
        .catch(function (err) {
          swal({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'warning'
          })
        })
    },
    getAllTasks ({
      commit
    }, token) {
      axios.get(`${baseURL}/todo/show`, {
        headers: {
          token
        }
      })
        .then(function (todoList) {
          commit('setTodo', todoList)
        })
        .catch(function (err) {
          swal({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'warning'
          })
        })
    },
    getCurrentWeather ({
      commit
    }) {
      axios.get(`${baseURL}/weather/show-weather`)
        .then(function (weatherData) {
          commit('setWeather', weatherData)
        })
        .catch(function (err) {
          swal({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'warning'
          })
        })
    },
    getSearchWeather ({
      commit
    }, inputData) {
      axios.post(`${baseURL}/weather/search`, inputData)
        .then(function (resultData) {
          commit('setResult', resultData)
        })
        .catch(function (err) {
          swal({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'warning'
          })
        })
    },
    addNewtask ({
      dispatch
    }, taskDetail) {
      let todo = taskDetail.task
      let token = taskDetail.token
      axios.post(`${baseURL}/todo/add`, {
        todo
      }, {
        headers: {
          token
        }
      })
        .then(function (response) {
          swal(response.data.message, {
            icon: 'success'
          })
          dispatch('getAllTasks', token)
        })
        .catch(function (err) {
          swal({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'warning'
          })
        })
    },
    finishTask ({
      dispatch
    }, taskDetail) {
      let token = taskDetail.token
      axios.put(`${baseURL}/todo/finish/${taskDetail.taskId}`, {}, {
        headers: {
          token
        }
      })
        .then(function (response) {
          swal(response.data.message, {
            icon: 'success'
          })
          dispatch('getAllTasks', token)
        })
        .catch(function (err) {
          swal({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'warning'
          })
        })
    },
    deleteTask ({
      dispatch
    }, taskDetail) {
      let token = taskDetail.token
      axios.delete(`${baseURL}/todo/delete/${taskDetail.taskId}`, {
        headers: {
          token
        }
      })
        .then(function (response) {
          swal(response.data.message, {
            icon: 'success'
          })
          dispatch('getAllTasks', token)
        })
        .catch(function (err) {
          swal({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'warning'
          })
        })
    },
    updateTask ({
      dispatch
    }, taskDetail) {
      let todo = taskDetail.task
      let token = taskDetail.token
      axios.put(`${baseURL}/todo/update/${taskDetail.taskId}`, {
        todo
      }, {
        headers: {
          token
        }
      })
        .then(function (response) {
          swal(response.data.message, {
            icon: 'success'
          })
          dispatch('getAllTasks', token)
        })
        .catch(function (err) {
          swal({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'warning'
          })
        })
    },
    getTaskByStatus ({
      commit
    }, taskDetail) {
      let token = taskDetail.token
      axios.get(`${baseURL}/todo/show/${taskDetail.status}`, {
        headers: {
          token
        }
      })
        .then(function (taskData) {
          commit('setTodo', taskData)
        })
        .catch(function (err) {
          swal({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'warning'
          })
        })
    },
    updateProfile ({
      commit
    }, userData) {
      let name = userData.name
      let email = userData.email
      let phone = userData.phone
      let password = userData.password
      let token = userData.token
      axios.put(`${baseURL}/user/update-user`, {
        name,
        email,
        phone,
        password
      }, {
        headers: {
          token
        }
      })
        .then(function (response) {
          let message = response.data.message
          if (message !== 'Successfully updated your profile') {
            swal(message, {
              icon: 'warning'
            })
          } else {
            swal(message, {
              icon: 'success'
            })
            localStorage.removeItem('name')
            localStorage.removeItem('email')
            localStorage.removeItem('phone')
            localStorage.setItem('name', userData.name)
            localStorage.setItem('email', userData.email)
            localStorage.setItem('phone', userData.phone)
            router.push('/home')
          }
        })
        .catch(function (err) {
          swal({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'warning'
          })
        })
    },
    changePassword ({
      commit
    }, userData) {
      let name = localStorage.getItem('name')
      let email = localStorage.getItem('email')
      let phone = localStorage.getItem('phone')
      let oldPassword = userData.oldPassword
      let newPassword = userData.newPassword
      let token = userData.token
      axios.put(`${baseURL}/user//change-password`, {
        name,
        email,
        phone,
        oldPassword,
        newPassword
      }, {
        headers: {
          token
        }
      })
        .then(function (response) {
          let message = response.data.message
          if (message !== 'Successfully changed your password') {
            swal(message, {
              icon: 'warning'
            })
          } else {
            swal(message, {
              icon: 'success'
            })
            router.push('/home')
          }
        })
        .catch(function (err) {
          swal({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'warning'
          })
        })
    }
  }
})
