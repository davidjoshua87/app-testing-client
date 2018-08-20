<template>
  <div class="container">
    <div class="col-md-3"></div>
    <div class="col-md-6">
      <h3 class="text-center">Profile</h3>
      <hr>
      <div class="formProfile">
        <div class="formBody">
          <div class="form-group">
            <label>Name</label>
            <input id="name" class="form-control" type="text" v-model="name">
          </div>
          <div class="form-group">
            <label>Email</label>
            <input id="email" class="form-control" type="email" v-model="email">
          </div>
          <div class="form-group">
            <label>Phone</label>
            <input id="phone" class="form-control" type="tel" v-model="phone">
          </div>
          <div class="form-group">
            <label>Password:</label>
            <input v-model="password" class="form-control" id="password" type="password" placeholder="Your Password">
            <p>Your password is "abc12345" if you login using Facebook and reset your password right now</p>
          </div>
          <div>
            <label>Confirm Password</label>
            <input v-model="confirm" class="form-control" type="password" placeholder="Confirm Password">
          </div>
          <br>
          <div class="form-group">
            <button v-on:click="updateUser" type="submit" class="btn btn-default">
              <b>Update</b>
            </button>
          </div>
          <div class="form-group">
            <button v-on:click="changePassword" type="submit" class="btn btn-default">
              <b>Change Password</b>
            </button>
          </div>
          <div class="form-group">
            <button v-on:click="back" type="submit" class="btn btn-default">
              <b>Cancel</b>
            </button>
          </div>
        </div>
      </div>
      <hr>
    </div>
    <div class="col-md-3"></div>
  </div>
</template>

<script>
import swal from 'sweetalert'

export default {
  name: 'profile',
  data () {
    return {
      name: localStorage.getItem('name'),
      phone: localStorage.getItem('phone'),
      email: localStorage.getItem('email'),
      password: '',
      confirm: ''
    }
  },
  created () {
    this.$store.dispatch('getAllTasks', localStorage.getItem('token'))
    let fbToken = localStorage.getItem('fb')
    let token = localStorage.getItem('token')
    if (token !== null) {
      if (fbToken === '1') {
        this.$store.commit('userLoginFB')
      }
      this.$store.commit('userLoggedIn')
    } else {
      this.$router.push('/')
    }
  },
  methods: {
    back () {
      this.$router.push('/home')
    },
    changePassword () {
      this.$router.push('/change-password')
    },
    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          alert('Form Submitted!')
          return
        }
        alert('Correct them errors!')
      })
    },
    updateUser () {
      let userData = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        password: this.password,
        token: localStorage.getItem('token')
      }
      if (this.name === '') {
        swal('Name must be filled!', {
          icon: 'warning'
        })
      } else if (this.email === '') {
        swal('Email must be filled!', {
          icon: 'warning'
        })
      } else if (this.phone === '') {
        swal('Phone must be filled!', {
          icon: 'warning'
        })
      } else if (this.password === '') {
        swal('Password must be filled!', {
          icon: 'warning'
        })
      } else if (this.password !== this.confirm) {
        swal('Password and confirm password is not the same!', {
          icon: 'warning'
        })
      } else {
        this.$store.dispatch('updateProfile', userData)
      }
    }
  }
}
</script>

<style scoped>
  .container {
    margin: 70px auto;
  }

  .text-center {
    font-family: 'Bungee Inline', cursive;
    font-size: 40px;
    margin-top: 0;
  }

  label {
    text-align: left;
    display: block;
    margin-bottom: .5rem;
  }

  .col-md-2 {
    font-size: 16px;
    margin: 0 auto;
  }

  .col-md-6 {
    position: center;
    margin: 0 auto;
    background-color: #f0ffff;
    padding: 60px;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .btn-default {
    width: 100%;
    background-color: #4267b2;
    color: white;
  }

  .btn-default:hover {
    background-color: #00008b;
  }

  .btn-default:active {
    background-color: #e0eeee;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }

  .btn-primary {
    background-color: #4267b2;
  }

  .btn-primary:hover {
    background-color: #00008b;
  }

  .btn-primary:active {
    background-color: #e0eeee;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }

  .form-group {
    text-align: center;
  }

  @media (min-width: 1200px) {
    .container {
      width: 970px;
    }
  }

  .swal-text {
    text-align: center;
  }
</style>
