import React, {useState} from 'react'
import { Scroll, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'



const SampleOverlay = ({sample,opacity})=>{


  console.log(opacity)

  return (
    <div style={{opacity:opacity}} className="overlay-section">
      <div className="overlay-section-content">
        <h3 className="sample-title">{sample.title}</h3>
        <h5 className="sample-description">{sample.description}</h5>

        <ul className="technology-list">
          {sample.technology.map((tech,idx)=>
            <li key={idx}>{tech}</li>
          )}
        </ul>
       

      </div>
    </div>
  )
}

const Overlay = () => {
  const [opacityOne,setOpacityOne] = useState(1)
  const [opacityTwo,setOpacityTwo] = useState(0)
  const [opacityThree,setOpacityThree] = useState(0)
  const [opacityFour,setOpacityFour] = useState(0);
  const [opacityFive,setOpacityFive] = useState(0);
  const scroll = useScroll();
  const [sampleData,setSampleData]=useState([
    {id:1,title:"My Gallery",technology:[],description:"Welcome to my gallery",link:"https://jgreen721dev.com"},
    {id:2,title:"RedBull Ad",technology:["CSS","JS"],description:"Flashy carousel ad for my favorite afternoon pick-me up. Featuring pleasing modern animations and color blends.",link:"https://jgreen721dev.com"},
    {id:3,title:"Desserts Shopping Cart",technology:["CSS","JS"],description:"Flashy carousel ad for my favorite afternoon pick-me up. Featuring pleasing modern animations and color blends.",link:"https://jgreen721dev.com"},
    {id:4,title:"Frontend Quiz",technology:["CSS","JS","gsap"],description:"Flashy carousel ad for my favorite afternoon pick-me up. Featuring pleasing modern animations and color blends.",link:"https://jgreen721dev.com"},
    {id:5,title:"Hangman Game",technology:["React","CSS"],description:"Flashy carousel ad for my favorite afternoon pick-me up. Featuring pleasing modern animations and color blends.",link:"https://jgreen721dev.com"},
  ]);



  useFrame(()=>{
    // console.log('overlay scroll!!!')
    setOpacityOne(scroll.range(0/4,1/4));
    setOpacityTwo(scroll.range(1/5,1/5));
    setOpacityThree(scroll.range(2/5,1/5));
    setOpacityFour(scroll.range(3/5,1/5));
    setOpacityFive(scroll.range(4/5,1/5));
    // console.log(scroll.range(2/4,1/4));
    // console.log(scroll.range(3/4,1/4));
    // console.log(scroll.range(4/4,1/4));
    // console.log(opacityOne);
  })

  return (
    <Scroll html>
      {sampleData.map((sampleItem,idx)=>(
        <SampleOverlay key={sampleItem.id} opacity={idx == 0 ? opacityOne : idx == 1 ? opacityTwo : idx == 2 ? opacityThree : idx == 3 ? opacityFour : opacityFive } sample={sampleItem}/>
      ))}
    </Scroll>
  )
}

export default Overlay