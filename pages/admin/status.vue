<!-- eslint-disable vue/valid-v-slot -->
<!-- eslint-disable vue/v-slot-style -->
<template>
  <v-container style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
    <v-row>
      <v-col class="d-flex justify-center align-center">
        <h1>Status de Empréstimo</h1>
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
                placeholder="ID do Livro"
                label="ID do Livro"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-autocomplete
                v-model="idAutor"
                :items="autores"
                item-text="nome"
                item-value="id"
              />
            </v-col>
            <v-col>
              <v-autocomplete
                v-model="idCategoria"
                :items="categorias"
                item-text="nome"
                item-value="id"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="titulo"
                outlined
                color="green"
                placeholder="Título do Livro"
                label="Título do Livro"
              >
              </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="sinopse"
                outlined
                color="green"
                placeholder="Sinopse"
                label="Sinopse"
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
      dialog: false,
      items: [],
      categorias: [],
      autores: [],
      disponiveis: [],
      status: [],
      usuarios: [],
      id: null,
      idCategoria: null,
      idUsuario: null,
      idAutor: null,
      titulo: null,
      sinopse: null,
      headers: [
        {
          text: 'id',
          value: 'id',
          align: 'center',
        },
        {
          text: 'titulo',
          value: 'titulo',
          align: 'center',
        },
        {
          text: 'status',
          value: 'status',
          align: 'center',
        },
        {
          text: 'idUsuario',
          value: 'idUsuario',
          align: 'center',
        },
        {
          text: 'idCategoria',
          value: 'idCategoria',
          align: 'center',
        },
        {
          text: 'idAutor',
          value: 'idAutor',
          align: 'center',
        },
        { text: '', value: 'actions', filterable: false },
      ],
    }
  },
  async created() {
    await this.getAllBooks()
    await this.getAllAuthors()
    await this.getAllCategories()
    await this.getAvailableBooks()
    await this.getStatusBooks()
    await this.getAllUsers()
  },

  methods: {
    update(item) {
      this.titulo = item.titulo
      this.status = item.status
      this.id = item.id
      this.idAutor = item.idAutor
      this.idUsuario = item.idUsuario
      this.idCategoria = item.idCategoria
      this.dialog = true
    },

    async getAvailableBooks() {
      try {
        const response = await this.$api.get('/livros/disponiveis')
        this.disponiveis = response.data
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.')
      }
    },

    async getStatusBooks() {
      try {
        const request = {
          titulo: this.titulo,
          status: this.status,
          idAutor: this.idAutor,
          idUsuario: this.idUsuario,
          idCategoria: this.idCategoria
        }
        if (this.id) {
          await this.$api.patch(`/livros/status/${this.id}`, request)
          this.$toast.success('Dado editado com êxito.')
        } else {
          await this.$api.post(`/livros/status`, request)
          this.$toast.success('Dado adicionado com êxito.')
        }
        this.titulo = null
        this.status = null
        this.id = null
        this.dialog = false
        await this.getAllBooks()
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.')
      }
    },

    async getAllBooks() {
      try {
        const response = await this.$api.get('/livros')
        this.items = response.data
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.')
      }
    },

    async getAllCategories() {
        try {
          const response = await this.$api.get('/categorias')
          this.categorias = response.data
        } catch (error) {
          return this.$toast.warning('Ocorreu um erro.')
        }
      },
  
    async getAllUsers() {
      try {
        const response = await this.$api.get('/usuarios')
        this.usuarios = response.data
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.')
      }
    },      
  
    async getAllAuthors() {
      try {
        const response = await this.$api.get('/autores')
        this.autores = response.data
      } catch (error) {
        return this.$toast.warning('Ocorreu um erro.')
      }
    },
  },
}
</script>

<style></style>