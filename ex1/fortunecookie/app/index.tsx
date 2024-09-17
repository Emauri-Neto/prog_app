import { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import cookieClosed from "../assets/closed-cookie.png";
import cookieOpen from "../assets/open-cookie.png";

const txt = [
  "Você terá um dia incrível!",
  "A sorte está ao seu favor.",
  "Prepare-se para uma surpresa.",
  "Seu esforço será recompensado.",
  "Um novo caminho se abrirá para você.",
  "A felicidade está a caminho.",
  "Você encontrará algo que perdeu.",
  "Um amigo inesperado fará contato.",
];

export default function Index() {
  const [isOpen, setIsOpen] = useState<number>(-1);
  const [text, setText] = useState("");

  function openCookie(i: number) {
    const rdmIdx = Math.floor(Math.random() * txt.length);
    setText(txt[rdmIdx])
    setIsOpen(i);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Clique em um biscoito para abri-lo!</Text>
      <View style={styles.grid}>
        {txt.map((txt, index) => (
          <TouchableOpacity key={index} onPress={() => openCookie(index)}>
            <Image
              source={isOpen === index ? cookieOpen : cookieClosed}
              style={styles.image}
            />
          </TouchableOpacity>
        ))}
      </View>
      {isOpen !== null && (
        <Text style={styles.fortuneText}>{text}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontWeight: "700",
    fontSize: 24,
    alignSelf: "center",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#0F0F0F"
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 16,
  },
  image: {
    width: 75,
    height: 75,
    margin: 10,
  },
  fortuneText: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontWeight: "500",
    fontSize: 18,
    alignSelf: "center",
    textAlign: "center",
  },
});
