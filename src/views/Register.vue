<template>
  <div class="container">
    <div class="col-md-3"></div>
    <div class="col-md-6">
      <h3 class="text-center">Todo</h3>
      <hr>
      <div class="form-group">
        <label>Name</label>
        <input id="name" class="form-control" type="text" placeholder="Jonh Doe" v-model="name">
      </div>
      <div class="form-group">
        <label>Email</label>
        <input id="email" class="form-control" type="email" placeholder="jonhdoe@mail.com" v-model="email">
      </div>
      <div class="form-group">
        <label>Phone</label>
        <input id="phone" class="form-control" type="tel" placeholder="081234567890" v-model="phone">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" placeholder="Min 8 alphanumeric characters" v-model="password">
      </div>
      <div>
        <label>Confirm Password</label>
        <input type="password" class="form-control" placeholder="Min 8 alphanumeric characters" v-model="confirm">
      </div>
      <br>
      <div class="form-group">
        <button v-on:click="register" type="submit" class="btn btn-default">
          <b>Register</b>
        </button>
      </div>
      <hr>
      <p class="text-foot">
        Have an account?
        <router-link to="/" class="btn btn-link">Log in</router-link>
      </p>
    </div>
    <div class="col-md-3"></div>
  </div>
</template>

<script>
import swal from 'sweetalert'

export default {
  name: 'register',
  data () {
    return {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirm: ''
    }
  },
  methods: {
    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          alert('Form Submitted!')
          return
        }
        alert('Correct them errors!')
      })
    },
    register () {
      let userData = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        password: this.password
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
        this.$store.dispatch('registerNewUser', userData)
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
