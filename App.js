import React, { useState, useEffect } from 'react';
import {
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Formulario from './components/Formulario';
import Clima from './components/Clima';


const App = () => {

  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  })

  const { ciudad, pais } = busqueda

  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});

  const [color, setColor] = useState("rgb(71,149,212)");



  useEffect(() => {

    const consultarClima = async () => {
      if (consultar) {
        const appId = 'a429b84eb318028c6f8e3045d829696b';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
        try {
          const resp = await fetch(url);
          const resultado = await resp.json();
          setResultado(resultado)
          setConsultar(false)
          cambiarColor(resultado);
        } catch (error) {
          mostrarAlerta();
        }
      }
    }
    consultarClima();
  }, [consultar])


  const mostrarAlerta = () => {
    Alert.alert('Error', 'No se obtiene resultado', [{ text: 'OK' }])
  }
  const ocultarTeclado = () => {
    Keyboard.dismiss()
  }

  const cambiarColor = (resultado) => {

    if (resultado.main.temp - 273.15 < 10) {
      setColor("#07396b")
    } else if (resultado.main.temp - 273.15 > 20) {
      setColor("#c65314")
    } else {
      setColor("rgb(71,149,212)")
    }
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>

        <View style={[styles.app, { backgroundColor: color }]}>
          <View style={styles.contenido}>
            <Clima
              resultado={resultado}
            />
            <Formulario
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              setConsultar={setConsultar}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "rgb(71,149,212)",
    justifyContent: "center",
  },
  contenido: {
    marginHorizontal: '3%'
  }
});

export default App;
