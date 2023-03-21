import React from 'react';
import './App.css';
import { auth, db } from './firebase/init';
import {collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc,  } from 'firebase/firestore' 
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useState } from 'react';


function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true)

  async function updatePost() {
    const hardcodedId = "YKSaWRmii4ygzaGgdS4y"
    const postRef = doc(db, "posts", hardcodedId)
    const post = await getPostById(hardcodedId)
    console.log(post)
    const newPost = {
      ...post,
      title: "Land a 400k job"
    }
    console.log(newPost)
   updateDoc(postRef, newPost);

  }

  function deletePost() {
    const hardcodedId = "YKSaWRmii4ygzaGgdS4y"
    const postRef = doc(db, "posts", hardcodedId);
    deleteDoc(postRef)
  }

  function createPost() {
    const post = {
      title: "finish interview section",
      description: "Do Finish FS",
      uid: user.uid,
    }
    addDoc(collection(db,"posts"), post)
  }

  async function getAllPosts() {
    const {docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map((elem) => ({ ...elem.data(), id: elem.id }));
    console.log(posts)
  }

  async function getPostById(id) {
    const postRef = doc(db, "posts", id)
    const postSnap = await getDoc(postRef);
    return postSnap.data()
  }

  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    );
    const {docs } = await getDocs(postCollectionRef);
    console.log(docs.map(doc => doc.data()));
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false)
      console.log(user)
      if (user) {
        setUser(user)
      }
    })
  }, [])

  function register() {
    console.log('register');
    createUserWithEmailAndPassword(auth, 'email@email.com', 'test1234')
      .then((user) => {
        console.log(user)
        
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function login() {
    signInWithEmailAndPassword(auth, 'email@email.com', 'test1234')
      .then(({user}) => {
        console.log(user)
        setUser(user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function logout () {
    signOut(auth) 
    setUser({});
  }


  return (
    <div className="App">
      <button onClick={register}>register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Log out</button>
      {loading ? 'loading...' : user.email}
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPosts}>Get all post</button>
      <button onClick={getPostById}>Get post by id</button>
      <button onClick={getPostByUid}>Get post by uid</button>
      <button onClick={updatePost}>update post</button>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}

export default App;
