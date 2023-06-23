<!-- eslint-disable vue/valid-v-slot -->
<!-- eslint-disable vue/v-slot-style -->
<template>
  <v-container style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
    <v-row>
      <v-col class="d-flex justify-center align-center">
        <h1>Cadastro de Usuários</h1>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center align-center">
      <v-btn fab small color="green" @click="dialog = true">
        <v-icon> mdi-plus </v-icon>
      </v-btn>
    </v-row>
    <v-row style="padding-top: 20px;" class="d-flex justify-center align-center">
      <v-card width="900">
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="items" :search="search">
          <template v-slot:item.actions="{ item }">
            <v-icon small color="green" @click="update(item)">
              mdi-pencil
            </v-icon>
            <v-icon small color="red" @click="destroy(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          <v-row>
            <v-col cols="1">
              <v-text-field
                v-model="id"
                outlined
                disabled
                color="green"
                placeholder="ID do Usuário"
                label="ID do Usuário"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="nomeUsuario"
                outlined
                color="green"
                placeholder="Nome do Usuário"
                label="Nome do Usuário"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="cpfCnpj"
                outlined
                color="green"
                placeholder="CPF do Usuário"
                label="CPF do Usuário"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="email"
                outlined
                color="green"
                placeholder="Email do Usuário"
                label="Email do Usuário"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="telefone"
                outlined
                color="green"
                placeholder="Telefone do Usuário"
                label="Telefone do Usuário"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" @click="persist"> Salvar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      search: null,
      items: [],
      dialog: false,
      nomeUsuario: null,
      id: null,
      cpfCnpj: null,
      telefone: null,
      email: null,
      headers: [
        {
          text: 'ID',
          value: 'id',
          align: 'center',
        },
        {
          text: 'Nome completo',
          value: 'nome',
          align: 'center',
        },
        {
          text: 'CPF',
          value: 'cpfCnpj',
          align: 'center',
        },
        {
          text: 'Email',
          value: 'email',
          align: 'center',
        },
        {
          text: 'Telefone',
          value: 'telefone',
          align: 'center',
        },
        { text: 'Ações', value: 'actions', style: 'center', filterable: false },
      ],
    }
  },
  async created() {
    await this.getAllUsers()
  },

  methods: {
    update(item) {
      this.nomeUsuario = item.nome
      this.cpfCnpj = item.cpfCnpj
      this.telefone = item.telefone
      this.id = item.id
      this.email = item.email
      this.dialog = true
    },

    async persist() {
      try {
        const request = {
          nome: this.nomeUsuario,
          email: this.email,
          cpfCnpj: this.cpfCnpj,
          telefone: this.telefone
        }
        if (this.id) {
          await this.$api.patch(`/usuarios/${this.id}`, request)
          this.$toast.success('Dado editado com êxito.')
        } else {
          await this.$api.post(`/usuarios/`, request)
          this.$toast.success('Dado adicionado com êxito.')
        }
        this.nomeUsuario = null
        this.email = null
        this.cpfCnpj = null
        this.telefone = null
        this.id = null
        this.dialog = false
        await this.getAllUsers()
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.')
      }
    },

    async destroy(item){
      try {
        await this.$api.delete(`/usuarios/deletar/${item.id}`);
        await this.getAllUsers();
        this.$toast.success('Dado excluído com êxito.')
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.')
      }
    },

    async getAllUsers() {
      try {
        const response = await this.$api.get('/usuarios')
        this.items = response.data
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.')
      }
    },
  },
}
</script>

<style></style>
