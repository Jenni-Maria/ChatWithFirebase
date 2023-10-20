import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, ViewBase } from 'react-native';
import { firestrore, serverTimestamp } from './firebase/Config';
import { query, onSnapshot, addDoc, MESSAGES, collection } from './firebase/Config';
import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { convertFireBaseTimeStampToJS } from './helpers/Functions';
import { orderBy } from 'firebase/firestore';


export default function App() {
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState([])

  const save = async() => {
    const docRef = await addDoc(collection(firestrore, MESSAGES), {
      text: newMessage,
      created: serverTimestamp()
    }).catch(error => console.log(error))
    setNewMessage('')
    console.log('Message saved.')
    
  }

  useEffect(() => {
    const q = query(collection(firestrore,MESSAGES),orderBy('created','desc'))

    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const tempMessages =[]

      querySnapshot.forEach((doc) => {
        const messageObject = {
          id: doc.id,
          text: doc.data().text,
          created: convertFireBaseTimeStampToJS(doc.data().created)
        }
        tempMessages.push(messageObject)
      })
      setMessages(tempMessages)
    })
    return () => {
      unsubscribe()
    }
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView> 
        {
          messages.map((message) => (
          <View style={styles.message} key={message.id}>
            <Text style={styles.messageInfo}>{message.created}</Text>
            <Text>{message.text}</Text>
          </View>
          ))
      }
        <View style={styles.send}>
          <TextInput placeholder='Enter message...' value={newMessage} onChangeText={text => setNewMessage(text)} />
        </View>
        <View style={styles.sendButton}>
          <Button title='Send' onPress={save}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight:0,
    
  },
  message: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderColor: '#d1d1d1',
    borderWidth: 2,
    borderRadius: 10,
    marginLeft: 50,
    marginRight:10,
  },
  send: {
    backgroundColor: '#f2f2f2' ,
    flex: 1,
    alignItems: 'left',
    justifyContent: 'center',
    padding: 10,
  },
  sendButton: {
    flex: 1,
    paddingTop: 10,
  },
  messageInfo: {
    fontSize: 9,
  },

});
