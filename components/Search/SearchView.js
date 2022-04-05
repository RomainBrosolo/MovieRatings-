import React, { Component, useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  FlatList,
  Image,
} from "react-native";

export default function SearchView() {
  const apiKey = "http://www.omdbapi.com/?i=tt3896198&apikey=ac3c3801";
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {},
  });

  const search = () =>
    axios(apiKey + "&s=" + state.s).then(({ data }) => {
      let results = data.Search;

      setState((prevState) => {
        return { ...prevState, results: results };
      });
      console.log(state.results);
    });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TITRE</Text>
      <TextInput
        style={styles.search}
        placeholder="Entrez un nom"
        onChangeText={(text) =>
          setState((prevState) => {
            return { ...prevState, s: text };
          })
        }
        onSubmitEditing={search}
        value={state.s}
      />
      <Button style={styles.btnSearch} title="Search" onPress={search} />

      <FlatList
        data={state.results}
        renderItem={(result) => (
          <View style={styles.result}>
            <Image
              source={{ uri: result.item.Poster }}
              style={{
                width: "100%",
                height: 300,
              }}
              resizeMode="cover"
            />
            <Text style={styles.heading}> {result.item.Title}</Text>
          </View>
        )}
        keyExtractor={(result) => result.imdbID}
      />
    </View>
  );
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
  title: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  search: {
    fontSize: 20,
    fontWeight: "300",
    padding: 20,
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginBottom: 40,
  },
  result: {
    flex: 1,
    width: "100%",
    marginBottom: 20,
  },
  heading: {
    color: "#FFF",
    backgroundColor: "#445565",
    padding: 20,
    fontSize: 18,
    fontWeight: "700",
  },
  btnSearch: {
    marginBottom: 20,
  },
});
