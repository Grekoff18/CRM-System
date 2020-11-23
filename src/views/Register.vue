<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
        <div class="card-content">
            <span class="card-title">Домашняя бухгалтерия</span>
              	<div class="input-field">
										<input
											id="email"
											type="text"
											v-model.trim="email"
											:class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
										>
										<label for="email">Email</label>
										<small
											class="helper-text invalid"
											v-if="$v.email.$dirty && !$v.email.required">Enter your email
										</small>
										<small
											class="helper-text invalid"
											v-else-if="$v.email.$dirty && !$v.email.email">Please enter correct email
										</small>
            		</div>

								<div class="input-field">
										<input
											id="password"
											type="password"
											v-model.trim="password"
											:class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
										>
										<label for="password">Пароль</label>
										<small
											class="helper-text invalid"
											v-if="$v.password.$dirty && !$v.password.required">Enter your password
										</small>
										<small
											class="helper-text invalid"
											v-else-if="$v.password.$dirty && !$v.password.minLength">Password must be at least {{$v.password.$params.minLength.min}} characters. Now - {{password.length}}
										</small>
								</div>

								<div class="input-field">
										<input
										 	id="name"
											type="text" 
											v-model.trim="name"
											:class="{invalid: $v.name.$dirty && $v.name.required}">
										<label for="name">Имя</label>
										<small
										 	class="helper-text invalid"
										 	v-if="$v.name.$dirty && !$v.name.required">Enter your name
										</small>
								</div>

								<p>
										<label>
												<input
													type="checkbox"
													v-model="agree"
												/>
												<span>С правилами согласен</span>
										</label>
								</p>
        </div>

        <div class="card-action">
            <div>
                <button class="btn waves-effect waves-light auth-submit" type="submit">
                    Зарегистрироваться
                    <i class="material-icons right">send</i>
                </button>
            </div>
            
            <p class="center">Уже есть аккаунт?<router-link to="/login">Войти!</router-link></p>
        </div>
    </form>
</template>

<script>
// import vuelidate api for validate our form
import {email, required, minLength} from "vuelidate/lib/validators"

export default {
	name: "register",

	data () {
    return {
      email: "",
			password: "",
			name: "",
			agree: false,
    }
	},
	
	// Configuring checks for our inputs
  validations: {
    email: {email, required},
		password: {required, minLength: minLength(6)},
		name: {required}, 
		agree: {checked: value => value}
	},

	methods: {
		// Form validation
		async submitHandler() {
			if (this.$v.$invalid) {
				this.$v.$touch()
				return
			}
			
			// If the form is valid, save the form data
			const formData = {
				email: this.email,
				password: this.password,
				name: this.name,	
			}

			try {
				await this.$store.dispatch("register", formData)
				this.$router.push("/")	
			} catch (e) {}
		}
	}
}
</script>