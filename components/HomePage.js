import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ImageBackground } from "react-native";
import { firestore, auth } from "../firebase";
import { collection, onSnapshot, query, where, deleteDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";

export default function Home({ navigation }) {
    const [veiculo, setVeiculo] = useState([]);

    async function deleteVeiculo(id) {
        try {
            await deleteDoc(doc(firestore, "tblVeiculo", id));
            Alert.alert("Veículo deletado.");
        } catch (error) {
            console.error("Erro ao deletar.", error);
        }
    }

    function confirmDelete(id) {
        Alert.alert(
            "Confirmação",
            "Tem certeza de que deseja excluir este veículo?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", onPress: () => deleteVeiculo(id) },
            ]
        );
    }

    function handleSignOut() {
        signOut(auth)
            .then(() => {
                navigation.replace("LoginStack");
            })
            .catch((error) => {
                Alert.alert("Erro", "Não foi possível fazer logout.");
                console.error("Erro ao fazer logout:", error);
            });
    }

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) {
            Alert.alert("Erro", "Usuário não autenticado.");
            return;
        }

        const q = query(collection(firestore, "tblVeiculo"), where("userId", "==", user.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const lista = [];
            querySnapshot.forEach((doc) => {
                lista.push({ ...doc.data(), id: doc.id });
            });
            setVeiculo(lista);
        });

        return () => unsubscribe();
    }, []);

    return (
        <ImageBackground style={styles.background} source={require("../assets/fundo3.png")}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                    <Text style={styles.signOutText}>Sair</Text>
                </TouchableOpacity>

                <Text style={styles.title}>Lista de Veículos</Text>

                <FlatList
                    data={veiculo}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.vehicleCard}>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("Change", {
                                        id: item.id,
                                        nomeVeiculo: item.nomeVeiculo,
                                        marcaVeiculo: item.marcaVeiculo,
                                        corVeiculo: item.corVeiculo,
                                        anoFabricacao: item.anoFabricacao,
                                    })
                                }
                            >
                                <View>
                                    <Text style={styles.vehicleTitle}>Veículo Cadastrado</Text>
                                    <Text>Veículo: {item.nomeVeiculo}</Text>
                                    <Text>Marca: {item.marcaVeiculo}</Text>
                                    <Text>Cor: {item.corVeiculo}</Text>
                                    <Text>Ano: {item.anoFabricacao}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => confirmDelete(item.id)}
                                style={styles.deleteButton}
                            >
                                <Text style={styles.deleteText}>X</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    signOutButton: {
        alignSelf: "flex-end",
        backgroundColor: "#FF5050",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    signOutText: {
        color: "#FFF",
        fontWeight: "bold",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 10,
        textAlign: "center",
    },
    vehicleCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 3,
    },
    vehicleTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    deleteButton: {
        backgroundColor: "#FF5050",
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
    },
    deleteText: {
        color: "#FFF",
        fontWeight: "bold",
    },
    addButton: {
        backgroundColor: "#28A745",
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        alignSelf: "center",
        marginTop: 10,
    },
    addButtonText: {
        color: "#FFF",
        fontSize: 24,
        fontWeight: "bold",
    },
});
