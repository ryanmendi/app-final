import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, ImageBackground } from "react-native";
import { auth } from "../firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth"; 

export default function Login({ navigation, route }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        if (route?.params?.clearFields) {
            setEmail('');
            setSenha('');
        }
    }, [route?.params]);

    function logar() {
        signInWithEmailAndPassword(auth, email, senha)
            .then(userCredential => {
                const user = userCredential.user;

                if (!user.emailVerified) {
                    Alert.alert("Atenção", "Por favor, verifique seu e-mail antes de fazer login.");
                    return;
                }
                navigation.navigate('Routes', { email });
            })
            .catch(error => {
                Alert.alert("Erro", error.message);
            });
    }

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.background} source={require("../assets/fundo.jpg")}>
                <View style={styles.content}>
                    <Text style={styles.title}>Login</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Digite o email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        onChangeText={setSenha}
                        value={senha}
                        placeholder="Digite a senha"
                    />
                    <TouchableOpacity style={styles.loginButton} onPress={logar}>
                        <Text style={styles.loginButtonText}>Logar</Text>
                    </TouchableOpacity>

                    <View style={styles.linkContainer}>
                        <Text style={styles.linkText}>Primeiro acesso?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                            <Text style={styles.linkButton}> Clique aqui</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.linkContainer}>
                        <Text style={styles.linkText}>Esqueceu a senha?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPass')}>
                            <Text style={styles.linkButton}> Clique aqui</Text>
                        </TouchableOpacity>
                    </View>
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
        alignItems: "center",
        padding: 20,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        borderRadius: 10,
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
    loginButton: {
        width: "100%",
        padding: 15,
        backgroundColor: "#28A745",
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 10,
    },
    loginButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    linkContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },
    linkText: {
        color: "#FFF",
        fontSize: 14,
    },
    linkButton: {
        color: "#007BFF",
        fontSize: 14,
        marginLeft: 5,
        textDecorationLine: "underline",
    },
});
