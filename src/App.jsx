import './App.css'
import {useState ,useEffect} from 'react'
import {storage , firestoreDB} from './firebase'
import {v4} from 'uuid'
import {ref, uploadBytes, getDownloadURL, listAll} from 'firebase/storage'
import { addDoc, arrayUnion, collection, doc, setDoc, updateDoc } from "firebase/firestore"; 


function App() {


  const [image, setImage] = useState(null)
  const [folderName, setFolderName] = useState('')
  const [desc , setDesc] = useState('')
  const [rating , setRating] = useState('')
  const [country , setCountry] = useState('')
  const [imageName , setImageName] = useState('')


  const handleUpload = () => {
    if (folderName === '') {
      alert('Please select a folder')
    return undefined
  }
    if (image === null) {
      alert('Please select an image')
    return undefined
    }


    const imageRef = ref(storage, `${folderName}/${imageName}/${imageName + v4()}`);

    uploadBytes(imageRef, image).then((response) => {
      alert('Uploaded a blob or file!', response);
      handleDataUpdate();
    });


    // setTimeout(() => {document.location.reload();}, 5000);

    
  }

  const handleDataUpdate = () =>{
    // const imageName = image.name.split('.')[0]
    const imagePath = ref(storage, `${folderName}/${imageName}`);
    listAll(imagePath).then((res) => {
    res.items.forEach((item) => {
      getDownloadURL(item).then((url) => {


        const docRef =  setDoc(doc(firestoreDB, folderName , imageName ), {
          name: imageName ,
          country: country,
          url: arrayUnion(url),
          rating: rating,
          description: desc
        }).catch((error) => {
          console.log(error);
        })

      });
    })
  }).catch((error) => {
    console.log(error);
  })
    
  }
  
  const reload = () => {
    document.location.reload();
  }

  return (
    <div className='App'>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <h2>Select folder</h2>
          <input type='radio' name='folder' value='popular' onChange={(event)=> setFolderName(event.target.value)} /><span>Popular</span>
          <input type='radio' name='folder' value='explore' onChange={(event)=> setFolderName(event.target.value)} /><span>Explore</span>

          <input type='radio' name='folder' value='cities' onChange={(event)=> setFolderName(event.target.value)} /><span>Cities</span>
          <input type='radio' name='folder' value='beaches' onChange={(event)=> setFolderName(event.target.value)} /><span>Beaches</span>
          <input type='radio' name='folder' value='national_parks' onChange={(event)=> setFolderName(event.target.value)} /><span>National Parks</span>
          <input type='radio' name='folder' value='hikes' onChange={(event)=> setFolderName(event.target.value)} /><span>Hikes</span>

          <div style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <input type='text'  placeholder='Image Name' onChange={(event)=> setImageName(event.target.value)} />
          <input type='text' placeholder='Country' onChange={(event)=> setCountry(event.target.value)} />
          <input type='number' placeholder='rating' onChange={(event)=> setRating(event.target.value)} />
          <input type='text' placeholder='description' onChange={(event)=> setDesc(event.target.value)} />
          </div>
        </div>
        <div>
          <input type='file' placeholder='Upload' onChange={(event)=> setImage(event.target.files[0])} />
          <button onClick={handleUpload}>Upload</button>
          <button type="button" onClick={reload}>
   Reload Page
</button>
        </div>
    </div>
  )
}

export default App
