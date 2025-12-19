"use client";
import Link from "next/link";
import styles from "../scss/blogs.module.scss";
import { Accordion } from "react-bootstrap";
import TextComponent from "../UI/TextComponent";

export default function TableOfContentPost({ itemObj }) {  
   return ( 
      <>    
         {itemObj.length > 0 &&
            <Accordion defaultActiveKey="0">
               <Accordion.Item eventKey="0">
                  <Accordion.Header as={'h5'}>Table of Containts</Accordion.Header>
                  <Accordion.Body>
                     <ol className={styles.blogs__links}>
                     {itemObj.map(function(data) {
                        return (                 
                           <li key={data.id}>                                          
                              <a href={"#id-0"+data.id}>{data.shortdesc}</a>
                           </li>
                        )
                     })}
                     </ol>
                  </Accordion.Body>
               </Accordion.Item>
            </Accordion>
         }

         
         {itemObj.map(function(data) {
            return (
               <article id={"id-0"+data.id} key={data.id}>
                  <h2>{data.shortdesc}</h2>
                  <TextComponent itemObj={data.fulldesc} />
               </article>
            )
         })}
      </>
   );
}