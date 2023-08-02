
<script setup>
import Spinner from '../components/Spinner.vue'

const prop= defineProps({
    cotizacion:{
        type:Object,
        required:true
    },
    carga:{
        type:Boolean,
        required:true
    }
})

</script>

<template>
    <div class="contenedor-resultado" >
        <h2>Cotizacion</h2>
        <Spinner v-if="carga"/>
        <div class="resultado" v-else>
          <img
            :src="'https://cryptocompare.com/'+cotizacion.IMAGEURL" alt="Imagen cripto">
          <div>
            <p>El precio es de: <span>{{ cotizacion.PRICE }}</span></p>
            <p>El precio mas alto del dia es de: <span>{{ cotizacion.HIGHDAY }}</span></p>
            <p>El precio mas alto del dia es de: <span>{{ cotizacion.HIGHDAY }}</span></p>
            <p>El precio mas bajo del dia es de: <span>{{ cotizacion.LOWDAY }}</span></p>
            <p>varicación en las ultimas 24 horas: <span>{{ cotizacion.CHANGEPCT24HOUR }} %</span></p>
            <p>Ultima Actualización: <span>{{ cotizacion.LASTUPDATE }}</span></p>
          </div>
        </div>
      </div>
</template>
