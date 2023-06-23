<template>
  <v-container class="d-flex justify-center align-center">
    <v-row style="padding: 10%; margin-top: 50px; justify-content: center">
      <v-col
        style="
          display: flex;
          flex-direction: column;
          align-self: center;
          width: 100%;
          max-width: 340px;
        "
      >
        <h1 style="margin-bottom: 24px; font-size: 42px; line-height: 64px">
          Faça seu login na plataforma
        </h1>
      </v-col>
      <v-col>
        <v-form style="display: flex; flex-direction: column">
          <v-row>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Email"
              required
              outlined
              prepend-inner-icon="mdi mdi-email"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              :counter="10"
              label="Password"
              required
              outlined
              prepend-inner-icon="mdi mdi-lock"
            ></v-text-field>
          </v-row>
          <v-row>
            <a
              href="http://localhost:3000/login"
              style="font-size: 14px; color: blueviolet"
              >Esqueci minha senha</a
            >
          </v-row>
          <v-row>
            <v-btn
              block
              style="
                color: white;
                background-color: blueviolet;
                height: 50px;
                font-size: 16px;
                margin-top: 20px
              "
            >
              Entrar
            </v-btn>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    password: '',
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) => v.length <= 10 || 'Password must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'Email is required',
      (v) => /.+@.+/.test(v) || 'Email must be valid',
    ],
  }),
}
</script>

<style></style>
