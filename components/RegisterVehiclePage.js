import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ImageBackground } from "react-native";
import { firestore, auth } from '../firebase'; 
import { collection, addDoc } from "firebase/firestore";

export default function RegisterVehicle({ navigation }) {
  const [nomeVeiculo, setNomeVeiculo] = useState("");
  const [marcaVeiculo, setMarcaVeiculo] = useState("");
  const [corVeiculo, setCorVeiculo] = useState("");
  const [anoFabricacao, setAnoFabricacao] = useState("");

  const handleAddVehicle = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("Usuário não autenticado!");
        Alert.alert("Erro", "Você precisa estar logado para cadastrar um veículo.");
        return;
      }

      await addDoc(collection(firestore, 'tblVeiculo'), {
        nomeVeiculo,
        marcaVeiculo,
        corVeiculo,
        anoFabricacao,
        userId: user.uid,
      });

      Alert.alert("Sucesso", "Veículo cadastrado com sucesso!");
      navigation.goBack();  
    } catch (error) {
      console.error("Erro ao cadastrar veículo: ", error);
      Alert.alert("Erro", "Ocorreu um erro ao cadastrar o veículo. Tente novamente.");
    }
  };

  return (
    <ImageBackground style={styles.background} resizeMode="cover" source={require('../assets/fundo4.jpg')}>
      <View style={styles.container}>
        <Text style={styles.title}>Cadastrar Veículo</Text>
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Nome do Veículo"
            value={nomeVeiculo}
            onChangeText={setNomeVeiculo}
          />
          <TextInput
            style={styles.input}
            placeholder="Marca do Veículo"
            value={marcaVeiculo}
            onChangeText={setMarcaVeiculo}
          />
          <TextInput
            style={styles.input}
            placeholder="Cor do Veículo"
            value={corVeiculo}
            onChangeText={setCorVeiculo}
          />
          <TextInput
            style={styles.input}
            placeholder="Ano de Fabricação"
            value={anoFabricacao}
            onChangeText={setAnoFabricacao}
          />

          <TouchableOpacity style={styles.buttonPrimary} onPress={handleAddVehicle}>
            <Text style={styles.buttonText}>Cadastrar</Text>
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
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: "90%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    fontSize: 16,
  },
  buttonPrimary: {
    width: "90%",
    backgroundColor: "#28A745",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonSecondary: {
    width: "90%",
    backgroundColor: "#6C757D",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
