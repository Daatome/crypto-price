<script setup>
import {ref,reactive} from 'vue'
import Alerta from './components/Alerta.vue'
import Cotizacion from'./components/Cotizacion.vue'
import useCripto from './composables/useCripto'
const {monedas, criptoMonedas, cotizacion, carga, procesarCotizacion, mostrarResultado}= useCripto()

const cotizar= reactive({
  moneda:'',
  criptoMoneda:''
})

const error= ref('')

const cotizarCripto=()=>{

  if(Object.values(cotizar).includes('')){
    error.value='Todos los campos son obligatorios'
    return
  }
  error.value=''
  procesarCotizacion(cotizar)
}

</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>Criptomonedas</span></h1>
    <div class="contenido">
      <Alerta v-if="error">{{ error }}</Alerta>
      <form class="formulario"  @submit.prevent="cotizarCripto">
        <div class="campo">
          <label for="moneda">Moneda:</label>
          <select  id="moneda"
            v-model="cotizar.moneda"
          >
            <option value="">-- Selecciona --</option>
            <option v-for="moneda in monedas "
              :value="moneda.codigo"
            >
              {{ moneda.texto }}
            </option>
          </select>
          <select  id="cripto"
            v-model="cotizar.criptoMoneda"
          >
            <option value="">-- Selecciona --</option>
            <option  v-for="criptoMoneda in criptoMonedas"
              :value="criptoMoneda.CoinInfo.Name"
              >
              {{ criptoMoneda.CoinInfo.FullName }}
            </option>
          </select>
        </div>
        <input type="submit" value="Cotizar">
      </form>

      <Cotizacion
        v-if="mostrarResultado"
        :cotizacion="cotizacion"
        :carga="carga"
      />
    </div>
  </div>
</template>


