import {react, useState, useEffect} from 'react';
import Card from '../../../../../Components/UI/Card';
import classes from '../../../../../Components/UI/Card.module.css';
import {storage} from "../../../../Firebase";
import { listAll, ref, getDownloadURL } from 'firebase/storage';



function Gallery(){

      const imageListRef = ref(storage, "Touchpoint Template Images/Suds/");
      const [imageList, setImageList] = useState([]);
      useEffect(() => {
            listAll(imageListRef).then((response) => {
                  response.items.forEach((item) => {
                        getDownloadURL(item).then((url) => {
                              setImageList((prev) => [...prev, url]);
                        })
                  });
            });
      }, []);

      return(
            <div className = {classes.card}>
                  {console.log(imageList)}
                  {imageList.map((url) => {
                        return <img src={url}/>;
                  })}
            
            </div>
      );
} export default Gallery;