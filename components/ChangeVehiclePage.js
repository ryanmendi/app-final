import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { firestore } from '../firebase';
import { collection, doc, updateDoc } from "firebase/firestore";

export default function ChangeVehicle({ navigation, route }) {
    const id = route.params.id;

    const [nomeVeiculo, setNomeVeiculo] = useState(route.params.nomeVeiculo);
    const [marcaVeiculo, setMarcaVeiculo] = useState(route.params.marcaVeiculo);
    const [corVeiculo, setCorVeiculo] = useState(route.params.corVeiculo);
    const [anoFabricacao, setAnoFabricacao] = useState(route.params.anoFabricacao);

    async function changeVehicle() {
        try {
            await updateDoc(doc(firestore, "tblVeiculo", id), {
                nomeVeiculo,
                marcaVeiculo,
                corVeiculo,
                anoFabricacao
            });
            Alert.alert("Aviso", "Veículo alterado com sucesso.");
            navigation.navigate("Home");
        } catch (error) {
            console.error("Erro ao alterar: ", error);
            Alert.alert("Erro", "Erro ao alterar. Por favor, tente novamente.");
        }
    }

    return (
        <ImageBackground style={styles.background} resizeMode="cover" source={require('../assets/fundo4.jpg')}>
            <View style={styles.container}>
                <Text style={styles.title}>Alterar dados do veículo</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.input}
                        value={nomeVeiculo}
                        placeholder="Veículo"
                        onChangeText={setNomeVeiculo}
                    />
                    <TextInput
                        style={styles.input}
                        value={marcaVeiculo}
                        placeholder="Marca"
                        onChangeText={setMarcaVeiculo}
                    />
                    <TextInput
                        style={styles.input}
                        value={corVeiculo}
                        placeholder="Cor"
                        onChangeText={setCorVeiculo}
                    />
                    <TextInput
                        style={styles.input}
                        value={anoFabricacao}
                        placeholder="Ano de Fabricação"
                        onChangeText={setAnoFabricacao}
                    />
                    <TouchableOpacity style={styles.buttonPrimary} onPress={changeVehicle}>
                        <Text style={styles.buttonText}>Alterar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonSecondary}
                        onPress={() => navigation.navigate("Home")}
                    >
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        color: '#333',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    inputGroup: {
        width: '100%',
        alignItems: 'center',
    },
    input: {
        width: '90%',
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderColor: '#DDD',
        borderWidth: 1,
        fontSize: 16,
    },
    buttonPrimary: {
        width: '90%',
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonSecondary: {
        width: '90%',
        backgroundColor: '#6C757D',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
