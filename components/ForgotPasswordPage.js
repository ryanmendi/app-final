import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase"; 

export default function ForgotPassPage({ navigation }) {
  const [email, setEmail] = useState("");

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Email Enviado",
        "Verifique sua caixa de entrada para redefinir sua senha.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ],
        { cancelable: false }
      );
    } catch (error) { 
      console.error("Erro ao enviar o email de redefinição:", error.code);

      let errorMessage;
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "Usuário não encontrado. Verifique o email.";
          break;
        case "auth/invalid-email":
          errorMessage = "Email inválido. Verifique o formato.";
          break;
        default:
          errorMessage = "Ocorreu um erro. Tente novamente.";
      }

      Alert.alert("Erro", errorMessage);
    }
  };

  return (
    <ImageBackground style={styles.background} resizeMode="cover" source={require("../assets/fundo3.png")}>
      <View style={styles.container}>
        <Text style={styles.title}>Recuperar Senha</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Insira seu email"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.buttonPrimary} onPress={handlePasswordReset}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>Voltar ao Login</Text>
        </TouchableOpacity>
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
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "90%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    fontSize: 16,
  },
  buttonPrimary: {
    width: "90%",
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkText: {
    color: "#007BFF",
    fontSize: 14,
    marginTop: 15,
    textDecorationLine: "underline",
  },
});
