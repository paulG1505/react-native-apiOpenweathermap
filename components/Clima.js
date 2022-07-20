import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const Clima = ({ resultado }) => {

    const { name, main } = resultado;
    if (!name) return null;

    //el api devuleve en grados kelvin por lo que transformamos
    const kelvin = 273.15;

    //icono
    const uriIcon = `http://openweathermap.org/img/w/${resultado.weather[0].icon}.png`


    return (
        <View style={styles.clima}>
            <Text style={[styles.text, styles.actual]}>{parseInt(main.temp - kelvin, 10)}
                <Text style={styles.temperatura}>
                    &#x2103;
                </Text>
                <Image
                    style={{ width: 60, height: 50 }}
                    source={{ uri: uriIcon }}
                />
            </Text>
            <View style={styles.temperaturas}>
                <Text style={styles.text}> Min{' '}
                    <Text style={styles.temperatura}>
                        {parseInt(main.temp_min - kelvin, 10)} &#x2103;
                    </Text>
                </Text>
                <Text style={styles.text}> Max {' '}
                    <Text style={styles.temperatura}>
                        {parseInt(main.temp_max - kelvin, 10)} &#x2103;
                    </Text>
                </Text>
            </View>
        </View>

    );

}


const styles = StyleSheet.create({
    clima: {
        marginBottom: 20,
    },
    text: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
        marginRight: 10
    },
    actual: {
        fontSize: 70,
        marginRight: 0,
        fontWeight: 'bold'
    },
    temperatura: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    temperaturas: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
})

export default Clima;