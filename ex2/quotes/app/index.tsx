import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import bgImg from "../assets/quotes.png";
import { quotes } from "./quotes";
import { useState } from "react";

export default function Index() {
  const author = Object.keys(quotes);
  const [authorI, setAuthorI] = useState<number>(0);

  const [idx, setIdx] = useState<number>(0);

  const currAuthor = author[authorI];
  const currQuote = quotes[currAuthor].quotes[idx];
  const currImg = quotes[currAuthor].image;

  function onPress() {
    const nextQuoteIndex = (idx + 1) % quotes[currAuthor].quotes.length;
    setIdx(nextQuoteIndex);

    if (nextQuoteIndex === 0) {
      const nextAuthorIndex = (authorI + 1) % author.length;
      setAuthorI(nextAuthorIndex);
    }
  }

  function normalizeStr(str: string) {
    return str
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.img} source={bgImg} />
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Quote 🦎</Text>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image style={styles.authorImg} source={currImg} />
      </View>

      <View>
        <Text style={styles.authorName}>{normalizeStr(currAuthor.replace("_", " "))}</Text>
      </View>

      <View style={styles.quoteContainer}>
        <Text style={styles.quote}>{currQuote}</Text>
      </View>

      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Próximo&rarr;</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#0F0F0F",
    marginBottom: 2,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  textWrapper: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    fontStyle: "italic",
    textAlign: "center",
    color: "white",
  },

  authorImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  quoteContainer: {
    width: "100%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  quote: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#333",
    textAlign: "center",
    maxWidth: "90%",
  },
  button: {
    width: "60%",
    padding: 8,
    alignSelf: "center",
    backgroundColor: "#007BFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
  },
  authorName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
    textAlign: "center",
  },
});
