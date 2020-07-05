import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  projectId: 'expensior-app',
  databaseURL: 'https://expensior-app.firebaseio.com',
};
firebase.initializeApp(config);

const db = firebase.firestore();

const tagsCollection = db.collection('tags');
const pilesCollection = db.collection('piles');
const entriesCollection = db.collection('entries');

export const store = {
  tags: [],
  piles: [],
  entries: [],
  addTag: (data) => {
    const tag = {
      createdAt: new Date(),
      name: data.name,
    };
    return tagsCollection.add(tag)
      .catch(e => console.error('error inserting', tag, e));
  },
  addPile: (data) => {
    const pile = {
      createdAt: new Date(),
      name: data.name,
    };
    return pilesCollection.add(pile)
      .catch(e => console.error('error inserting', tag, e));
  },
  addEntry: (data) => {
    const entry = {
      createdAt: new Date(),
      amount: parseFloat(data.amount),
      description: data.description,
      date: data.date,
      tag_ids: data.tags.map(tag => tag.id),
      pile_id: data.pile,
    };
    return entriesCollection.add(entry)
      .catch(e => console.error('error inserting', entry, e));
  },
};

tagsCollection
  .orderBy('name')
  .onSnapshot((docs) => {
    const tags = [];
    docs.forEach((doc) => {
      const tag = doc.data();
      tag.id = doc.id;
      tags.push(tag);
    });
    console.log('Received Tags feed:', tags);
    store.tags = tags;
  });

pilesCollection
  .orderBy('name')
  .onSnapshot((docs) => {
    const piles = [];
    docs.forEach((doc) => {
      const pile = doc.data();
      pile.id = doc.id;
      piles.push(pile);
    });
    console.log('Received Piles feed:', piles);
    store.piles = piles;
  });

entriesCollection
  .orderBy('date', 'desc')
  .onSnapshot((docs) => {
    const entries = [];
    docs.forEach((doc) => {
      const entry = doc.data();
      entry.id = doc.id;
      entries.push(entry);
    });
    console.log('Received Entries feed:', entries);
    store.entries = entries;
  });
