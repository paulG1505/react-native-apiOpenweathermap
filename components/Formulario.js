import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    View,
    Text,
    Animated,
    Alert,
} from 'react-native';
import { Picker } from '@react-native-community/picker';


const Formulario = ({ busqueda, setBusqueda,setConsultar }) => {

    const { pais, ciudad } = busqueda;

    const [animacionboton] = useState(new Animated.Value(1))

    const consultaClima = () => {
        if (pais.trim() === '' || ciudad.trim() === '') {
            mostrarAlerta();
            return;
        }
        setConsultar(true);
    }

    const mostrarAlerta = () => {
        Alert.alert('Error', 'Campos Obligatorios', [{ text: 'Entendido' }])
    }

    const animacionEntrada = () => {
        Animated.spring(animacionboton, {
            toValue: .7,
            duration: 500,
            useNativeDriver: true //esta linea es importante
        }).start();
    }

    const animacionSalida = () => {
        Animated.spring(animacionboton, {
            toValue: 1,
            friction: 1,//controla el rebote
            tension: 5,
            useNativeDriver: true
        }).start();
    }

    const estiloAnimacion = {
        transform: [{ scale: animacionboton }]
    }

    return (
        <>
            <View>
                <View>
                    <TextInput style={styles.input}
                        placeholder="Ciudad"
                        value={ciudad}
                        onChangeText={ciudad => setBusqueda({ ...busqueda, ciudad })}
                        placeholderTextColor={"#666"}
                    />
                </View>
                <View>
                    <Picker
                        selectedValue={pais}
                        itemStyle={{ height: 120, backgroundColor: "#FFF" }}
                        onValueChange={pais => setBusqueda({ ...busqueda, pais })}
                    >
                        <Picker.Item label="--Seleccione un pais" value="" />
                        <Picker.Item label="EEUU" value="US" />
                        <Picker.Item label="Ecuador" value="EC" />
                        <Picker.Item label="México" value="MX" />
                        <Picker.Item label="Argentica" value="AR" />
                        <Picker.Item label="Colombia" value="CO" />
                        <Picker.Item label="España" value="ES" />
                    </Picker>
                </View>
                <TouchableWithoutFeedback
                    onPressIn={() => animacionEntrada()}
                    onPress={() => consultaClima()}
                    onPressOut={() => animacionSalida()}
                >
                    <Animated.View

                        style={[styles.btnBuscar, estiloAnimacion]}>
                        <Text style={styles.textBuscar}>Buscar Clima </Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        padding: 10,
        height: 50,
        backgroundColor: "#FFF",
        fontSize: 20,
        marginBottom: 20,
        textAlign: "center",
    },
    btnBuscar: {
        marginTop: 50,
        backgroundColor: "#000",
        padding: 10,
        justifyContent: "center",
    },
    textBuscar: {
        color: "#FFF",
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 20,
    }
});

export default Formulario;
