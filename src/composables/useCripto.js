import {ref, onMounted, computed} from 'vue'


export default function useCripto(){
    const criptoMonedas= ref([])
    const cotizacion= ref({})
    const carga=ref(false)

    const monedas = ref([
        { codigo: 'USD', texto: 'Dolar de Estados Unidos'},
        { codigo: 'MXN', texto: 'Peso Mexicano'},
        { codigo: 'EUR', texto: 'Euro'},
        { codigo: 'GBP', texto: 'Libra Esterlina'},
    ])

    onMounted(()=>{
        fetch('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD')
            .then(respuesta => respuesta.json())
            .then(data=>{
            criptoMonedas.value= data.Data
            })
    })

    const procesarCotizacion= async (cotizar)=>{
        carga.value=!carga.value
        const {criptoMoneda, moneda}= cotizar
      
        const url=`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`
        const respuesta= await fetch(url)
        const data= await respuesta.json()
      
        cotizacion.value= data.DISPLAY[criptoMoneda][moneda]
        carga.value=!carga.value
      
      
    }
    const mostrarResultado= computed(()=>{
    return Object.values(cotizacion.value).length >0
    })
      
    return{
        monedas,
        criptoMonedas,
        cotizacion,
        carga,
        procesarCotizacion,
        mostrarResultado
    }
}