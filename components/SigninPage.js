import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ImageBackground } from "react-native";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

export default function Signin({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const cadastrarUsuario = () => {
        if (senha !== confirmarSenha) {
            Alert.alert("Erro", "As senhas não coincidem!");
            return;
        }

        createUserWithEmailAndPassword(auth, email, senha)
            .then(userCredential => {
                const user = userCredential.user;

                sendEmailVerification(user)
                    .then(() => {
                        Alert.alert("Sucesso", "Usuário cadastrado com sucesso! Verifique seu e-mail para confirmar o cadastro.");
                        navigation.navigate("Login");
                    })
                    .catch(error => {
                        Alert.alert("Erro", `Erro ao enviar e-mail de verificação: ${error.message}`);
                    });
            })
            .catch(error => {
                Alert.alert("Erro", `Erro ao cadastrar: ${error.message}`);
            });
    };

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.background} source={require("../assets/fundo 2.png")}>
                <View style={styles.content}>
                    <Text style={styles.title}>Cadastro</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Digite seu email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        onChangeText={setSenha}
                        value={senha}
                        placeholder="Digite sua senha"
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        onChangeText={setConfirmarSenha}
                        value={confirmarSenha}
                        placeholder="Confirme sua senha"
                    />
                    <TouchableOpacity style={styles.buttonPrimary} onPress={cadastrarUsuario}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.buttonText}>Voltar ao Login</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        width: "90%",
        padding: 20,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        borderRadius: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#FFF",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        padding: 15,
        marginVertical: 10,
        backgroundColor: "#FFF",
        borderRadius: 10,
        fontSize: 16,
    },
    buttonPrimary: {
        width: "100%",
        padding: 15,
        backgroundColor: "#28A745",
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 10,
    },
    buttonSecondary: {
        width: "100%",
        padding: 15,
        backgroundColor: "#6C757D",
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});
