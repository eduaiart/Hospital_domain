import React, { useEffect, useState } from 'react';
import { Button, FlatList, SafeAreaView, Text, TextInput, View } from 'react-native';
import Constants from 'expo-constants';

const API_BASE_URL = Constants.expoConfig?.extra?.apiBaseUrl || 'http://localhost:8000';

export default function App() {
  const [patients, setPatients] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [note, setNote] = useState('');
  const [summary, setSummary] = useState('');

  const refresh = async () => {
    const res = await fetch(`${API_BASE_URL}/api/v1/patients/`);
    const data = await res.json();
    setPatients(data);
  };

  useEffect(() => {
    refresh();
  }, []);

  const create = async () => {
    await fetch(`${API_BASE_URL}/api/v1/patients/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ first_name: firstName, last_name: lastName })
    });
    setFirstName('');
    setLastName('');
    refresh();
  };

  const summarize = async () => {
    const res = await fetch(`${API_BASE_URL}/api/v1/ai/summarize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: note })
    });
    const data = await res.json();
    setSummary(data.summary);
  };

  return (
    <SafeAreaView style={{ padding: 16, gap: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>HMS Mobile</Text>

      <View style={{ gap: 8 }}>
        <Text>Patients</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TextInput placeholder="First name" value={firstName} onChangeText={setFirstName} style={{ borderWidth: 1, padding: 8, flex: 1 }} />
          <TextInput placeholder="Last name" value={lastName} onChangeText={setLastName} style={{ borderWidth: 1, padding: 8, flex: 1 }} />
          <Button title="Create" onPress={create} />
        </View>
        <FlatList data={patients} keyExtractor={(item) => item.id} renderItem={({ item }) => (
          <Text>{item.first_name} {item.last_name}</Text>
        )} />
      </View>

      <View style={{ gap: 8 }}>
        <Text>AI Summarize</Text>
        <TextInput placeholder="Enter text" value={note} onChangeText={setNote} style={{ borderWidth: 1, padding: 8 }} multiline numberOfLines={4} />
        <Button title="Summarize" onPress={summarize} />
        {summary ? <Text selectable>{summary}</Text> : null}
      </View>
    </SafeAreaView>
  );
}