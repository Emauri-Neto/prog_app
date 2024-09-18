import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function Index() {
  const [num, setNum] = useState<number>(0);
  const [total, setTotal] = useState<number>(0)

  function changeNum(n: number, op: "ADD" | "REMOVE"){
    if (op === "ADD") {
      setTotal(total + 1)
      return setNum(n + 1)
    }

    if (op === "REMOVE" && num != 0) return setNum(n - 1)

    return n
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Contador Restaurante</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.data}>Dados:</Text>
        <Text style={styles.dataTxt}>Entraram: {num}</Text>
        <Text> | </Text>
        <Text style={[styles.dataTxt, { color: "#007BFF" }]}>Entradas Total: {total}</Text>
      </View>
      <View style={styles.btnWrapper}>
        <TouchableOpacity style={styles.button} onPress={() => changeNum(num, "ADD")}>
          <Text style={styles.btnText}>Adicionar Entrada</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: "red"}]} onPress={() => changeNum(num, "REMOVE")}>
          <Text style={styles.btnText}>Registrar Saída</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    display: "flex",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#8F8F8F",
    paddingVertical: 24,
    backgroundColor: "#F8F8F8"
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
  },
  content: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 8,
    borderBottomWidth: 2,
    borderColor: "#8F8F8F",
    gap: 16,
    marginBottom: 16,
  },
  data: {
    fontSize: 24,
    fontWeight: "700",
    paddingHorizontal: 8,
    borderRightWidth: 2,
    borderColor: "#8F8F8F",
  },
  dataTxt: {
    color: "green",
    fontSize: 16,
  },
  btnWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16
  },
  button: {
    backgroundColor: "green",
    padding: 8,
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
  }
});
