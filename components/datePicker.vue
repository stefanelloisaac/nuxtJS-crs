<!-- eslint-disable vue/v-slot-style -->
<template>
  <div>
    <v-menu
      ref="menu"
      v-model="menu"
      :readonly="readOnly"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
        v-model="dateDvdd"
        readonly
        :label="titulo"
        prepend-icon="mdi-calendar"
        v-bind="attrs"
        v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        :readonly="readOnly"
        :active-picker.sync="activePicker"
        :max="
          new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10)
        "
        min="1950-01-01"
        @change="save"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    titulo: {
      required: true,
      type: String,
    },
    readOnly: {
      type: Boolean
    }
  },
  data: () => ({
    activePicker: null,
    date: null,
    menu: false,
    dateDvdd: null,
  }),
  watch: {
    date (evento) {
      const [ano, mes, dia] = evento.split('-')
      this.dateDvdd = `${dia}/${mes}/${ano}`
    }
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date)
      this.$emit('salvarData', date)
    },
  },
}
</script>
