import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ScrollView } from 'react-native';

const URL = "https://opendata.zoneatlas.com/oulu/objects.json";

export default function Api() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState();
  const [titles, setTitles] = useState([]);
  const [categories, setCategories] = useState([]);
  
  useEffect(()=> {
    let tmpTitles = [...titles];
    let tmpCategories = [...categories];
    fetch(URL)
      .then(response => response.json())
      .then ((json) => {
        let jsonLength = Object.keys(json).length;
        for (let i = 0; i < jsonLength; i++) {
          if (!tmpTitles.includes(json[i].title)) {
            tmpTitles.push(json[i].title)
          }
          if (!tmpCategories.includes(json[i].Categories[0].title)) {
            tmpCategories.push(json[i].Categories[0].title)
          }
        }
        setTitles(tmpTitles);
        setCategories(tmpCategories);
        setError(null);
        setIsLoading(false);
      },(error) => {
        setError("Error retrieving activity!");
        setIsLoading(false);
        console.log(error);
      })
  },[refresh])

  if (isLoading) {
    return <View style={styles.container}><ActivityIndicator size="large"/></View>
  } else if (error) {
    return <View style={styles.container}><Text>{error}</Text></View>
  } else {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.heading}>Kohteet</Text>
          {titles.map((item, index) => (
            <Text key={index}>{item}</Text>
          ))}
          <Text style={styles.heading}>Kategoriat</Text>
          {categories.map((item, index) => (
            <Text key={index}>{item}</Text>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
  },  
  activity: {
    marginBottom: 10,
  }
});