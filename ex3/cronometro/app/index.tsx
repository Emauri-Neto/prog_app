import { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function Index() {
  const [time, setTime] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const ref = useRef<any>(null);

  function start() {
    setIsRunning(true);
    setIsPaused(false);
  }

  function pause() {
    setIsPaused(true);
    setIsRunning(false);
  }

  // reiniciar em teoria é desligar e religar, mas acho que o intuito era parar entao ele zera e deixa parado em 0
  function restart() {
    setIsPaused(false);
    setIsRunning(false);
    setTime(0);
  }

  function formatTime(time: number): string {
    const min = Math.floor(time / 60000);
    const sec = Math.floor((time % 60000) / 1000);
    const milSec = Math.floor((time % 1000) / 10);

    return `${String(min).padStart(2, "0")}:${String(sec).padStart(
      2,
      "0"
    )}:${String(milSec).padStart(2, "0")}`;
  }

  useEffect(() => {
    if (isRunning) {
      ref.current = setInterval(() => {
        setTime((prevTempo) => prevTempo + 10);
      }, 10);
    } else {
      clearInterval(ref.current);
    }

    return () => clearInterval(ref.current);
  }, [isRunning]);

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formatTime(time)}</Text>
      <View style={styles.wrapper}>
        {!isPaused && !isRunning ? (
          <TouchableOpacity style={styles.btn} onPress={start}>
            <Text style={styles.btnTxt}>Começar</Text>
          </TouchableOpacity>
        ) : isPaused ? (
          <TouchableOpacity style={styles.btn} onPress={start}>
            <Text style={styles.btnTxt}>Retomar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#FF6666" }]}
            onPress={pause}
          >
            <Text style={styles.btnTxt}>Pausar</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.btn} onPress={restart}>
          <Text style={styles.btnTxt}>Reiniciar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  time: {
    fontSize: 36,
    fontWeight: "700",
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 32,
    borderTopWidth: 2,
    gap: 8,
  },
  btn: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#007BFF",
  },
  btnTxt: {
    color: "#fff",
    fontSize: 24,
  },
});
