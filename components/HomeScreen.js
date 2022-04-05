import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  FlatList,
  SafeAreaView,
} from "react-native";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreating: false,
      name: "",
      description: "",
      note: 0,
      movies: [
        {
          name: "Transformers",
          description: "Un film très intéressant",
          note: 5,
        },
      ],
    };
  }

  setName = (text) => {
    this.setState({
      name: text,
    });
  };

  setDescription = (text) => {
    this.setState({
      description: text,
    });
  };

  setNote = (text) => {
    if (text >= 0 && text <= 5 && text.length <= 1) {
      this.setState({
        note: text,
      });
    }
  };

  submit = () => {
    if (
      this.state.name.length >= 1 &&
      this.state.description.length >= 1 &&
      this.state.note >= 0 &&
      this.state.note <= 5
    ) {
      let movie = {
        name: this.state.name,
        description: this.state.description,
        note: this.state.note,
      };
      let newMovies = [...this.state.movies, movie];
      this.setState((prevState) => ({
        isCreating: false,
        movies: newMovies,
      }));
    } else {
      alert("Erreur de saisie, Veuillez réessayer");
    }
  };

  showForm = () => {
    this.setState(() => ({
      isCreating: true,
    }));
  };
  showMovies = () => {
    this.setState(() => ({
      isCreating: false,
    }));
  };

  render() {
    const widget = this.state.isCreating ? (
      <View>
        <Text style={styles.label}>Nom :</Text>
        <TextInput
          style={styles.input}
          maxLength={20}
          onChangeText={this.setName}
        />
        <Text style={styles.label}>Description :</Text>
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={4}
          maxLength={50}
          onChangeText={this.setDescription}
        />
        <Text style={styles.label}>Note /5 :</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          maxLength={1}
          value={this.state.note}
          onChangeText={this.setNote}
        />
        <Button title="Ajouter" onPress={this.submit} />
      </View>
    ) : (
      <View>
        <Text style={styles.title}> Liste des films: </Text>
        <View style={styles.row}>
          <View>
            <Text style={styles.item}>Nom | Description | Note</Text>
          </View>
        </View>
        <SafeAreaView>
          <FlatList
            data={this.state.movies}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.item}>
                  {item.name} | {item.description} | {item.note}
                </Text>
              </View>
            )}
          />
        </SafeAreaView>
      </View>
    );
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Button
            style={styles.button}
            onPress={this.showForm}
            title="Ajouter un film"
          />
          <View style={styles.spacer}></View>
          <Button
            style={styles.button}
            onPress={this.showMovies}
            title="Liste des films"
          />
        </View>
        {widget}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#223343",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  row: {
    padding: 10,
    margin: 10,
    flexDirection: "row",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 20,
    color: "#000000",
    backgroundColor: "#445565",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  navButton: {
    color: "#445566",
  },
  input: {
    color: "#FFF",
    borderColor: "#FFF",
    borderWidth: 1,
    margin: 10,
  },
  title: {
    marginTop: 10,
    padding: 5,
    color: "#FFF",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  item: {
    padding: 5,
    color: "#FFF",
    textAlign: "center",
    fontSize: 20,
  },
  label: {
    marginTop: 10,
    padding: 5,
    color: "#FFF",
    textAlign: "center",
    fontSize: 20,
  },
  spacer: {
    padding: 10,
  },
  button: {
    textColor: "#000000",
  },
});
