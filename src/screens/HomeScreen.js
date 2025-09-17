import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  Alert,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { ThemeContext } from "../../App";

let nextId = 1;

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [editingTask, setEditingTask] = useState(null); // tarefa que está sendo editada
  const [editedName, setEditedName] = useState(""); // novo nome
  const { theme } = useContext(ThemeContext);

  const handleAddTask = () => {
    if (!taskName.trim()) {
      Alert.alert("Erro", "O nome da tarefa é obrigatório.");
      return;
    }

    const newTask = { id: nextId++, name: taskName, favorite: false };
    setTasks([...tasks, newTask]);
    setTaskName("");
  };

  const handleDeleteTask = (id) => {
  Alert.alert(
    "Confirmar",
    "Deseja excluir esta tarefa?",
    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        },
      },
    ],
    { cancelable: true }
  );
};



  const handleEditTask = (task) => {
    setEditingTask(task);
    setEditedName(task.name);
  };

  const saveEditedTask = () => {
    if (!editedName.trim()) {
      Alert.alert("Erro", "O nome da tarefa não pode ser vazio.");
      return;
    }
    setTasks(
      tasks.map((t) =>
        t.id === editingTask.id ? { ...t, name: editedName } : t
      )
    );
    setEditingTask(null);
    setEditedName("");
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={[styles.taskText, { color: theme.textColor }]}>
        {item.name}
      </Text>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Button
          title="Detalhes"
          onPress={() => navigation.navigate("Details", { id: item.id })}
        />
        <Button title="Editar" onPress={() => handleEditTask(item)} />
        <Button
          title="Excluir"
          color="red"
          onPress={() => handleDeleteTask(item.id)}
        />
      </View>
    </View>
  );

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Text style={[styles.title, { color: theme.textColor }]}>
        Lista de Tarefas
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da tarefa"
        value={taskName}
        onChangeText={setTaskName}
        accessibilityLabel="Campo para digitar o nome da tarefa"
      />
      <Button
        title="Adicionar Tarefa"
        onPress={handleAddTask}
        accessibilityLabel="Botão para adicionar tarefa"
      />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={{ marginTop: 20 }}
      />
      <Button
        title="Ir para Configurações"
        onPress={() => navigation.navigate("Config")}
      />

      {/* Modal de Edição */}
      <Modal visible={!!editingTask} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Editar Tarefa</Text>
            <TextInput
              style={styles.input}
              value={editedName}
              onChangeText={setEditedName}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TouchableOpacity onPress={() => setEditingTask(null)}>
                <Text style={{ color: "red", fontSize: 16 }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={saveEditedTask}>
                <Text style={{ color: "blue", fontSize: 16 }}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, marginBottom: 10 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  taskText: { fontSize: 16 },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
});
