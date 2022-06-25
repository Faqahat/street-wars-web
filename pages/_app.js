import '../styles/globals.css'
import logo from "../img/logo.png"
import hero1 from "../public/static/hero1.jpg"
import hero2 from "../public/static/hero2.jpg"
import hero3 from "../public/static/hero3.jpg"
import hero4 from "../public/static/hero4.jpg"
import caution from "../img/caution.png"
import onlineIcon from "../img/onlineIcon.png"
import loadingIcon from "../public/static/warning.png"
import Image from 'next/image'
import { useState ,useEffect, useRef  } from "react";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import 'tippy.js/themes/light.css';
import Link from 'next/link';    
import Head from 'next/head';
import { BsArrowRight as RightIcon } from 'react-icons/bs';
import { BiCopy as CopyIcon } from 'react-icons/bi';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Tooltip, Button, Grid } from "@nextui-org/react";

function MyApp({ Component, pageProps }) {
  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  

  
  let [bg,setBg] = useState(0)
  let [info,setInfo] = useState(false)
  let [isLoaded, setIsLoaded] = useState(true)


  const selectRef = useRef(null);


 const fetchInfo = () =>{
  fetch("/api/info")
  .then(data => data.json())
  .then(obj =>
{   
   if(obj.maxplayers) 
   {
    setInfo(obj)
    return setIsLoaded(true)
   }
   else   return setIsLoaded(false) 
   
  }
 )
 .catch(function(error) {
    //console.log(error)

    setIsLoaded(false)
    
 })
 }

useEffect(()=>{
  fetchInfo();
  const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
   fetchInfo();
   
  }, 10000)

  return () => clearInterval(intervalId); //This is important
},[])
 useEffect(() => setBg(randomIntFromInterval(1,4)),[])

  return (
<div className="cursor-default h-screen">
    <Head>
  
    
    <title>Los Santos Street Wars</title>
    </Head>

  <div className="grid md:grid-cols-2 lg:grid-cols-2 h-full">
  
    <div className="lg:col-span-1">
    <img src="/static/logo.png" alt=""    className='h-24 mx-auto mt-6 lg:hidden md:mb-5'   /> 
        <div className="bg-white   ">
   
          <div className="lg:max-w-xl">
        
            <div className="sm:ml-20 md:ml-8 md:flex  lg:show text-center">
   
         
              <button className=" lg:hidden bg-black text-white text-xl font-bold border-white  p-3  sm:w-44 sm:mr-20 md:text-center md:w-36   md:mr-1 lg:w-72 lg:mr-10  h-14 mt-8">
                Join Discord
              </button>
              <Tippy content="Coming Soon">
              <button className="lg:hidden bg-white  border-2 border-black font-bold text-black text-xl w-28 sm:p-4 ml-10 mb-4 md:p-0  md:w-20 md:mb-0 md:ml-4 md:mr-6 md:mt-8 lg:w-28 lg:mb-0 lg:ml-0 lg:p-4 lg:mr-0 lg:mt-8  h-14 ">
                UCP
              </button>
              </Tippy>
            </div>
          <div className=" md:hidden min-h-[50%] ">
            <Image src={bg == 1 ? hero1 : bg == 2 ? hero2 : bg == 3 ? hero3 : bg == 4 ? hero4 : hero1} alt="" placeholder='blur' className=" grayscale  min-h-[50%]"/> { /* Phone View */ }
          </div>

              <div className='hidden  lg:block  h-24 absolute w-24 ml-20 mt-3'> {/* LG Logo */}
                  <Image src={logo} alt=""   layout="responsive" className=" "  />
              </div>

     
         
          <div      className="px-6 mt-12  max-w-md  sm:max-w-xl lg:px-0 lg:py-24 lg:max-w-full  lg:ml-20">

        
            
            
               
              
              <div className="border-solid border-2 bg-[#FFFAEB] border-[#FFC400]  flex items-center p-2 sm:mt-8  md:mt-12 lg:mt-1 lg:w-auto md:mb-6 ">
                <div className='w-10' ><Image src={caution} alt="" /></div> <span className="text-xs ml-2">We are currently in process of restructuring the server and community</span>
                
              </div>
              <div>
                <h1
                className="mt-6 text-4xl font-bold font-futura text-black sm:mt-0 sm:text-4xl  md:text-4xl md:font-extrabold md:mt-5 lg:text-6xl lg:mt-10 ">
              
                Los Santos 
              </h1>
              </div>
              
              <div>
                <p className="mt-0 text-4xl ml-10 font-bold font-futura text-black sm:mt-8  sm:text-4xl md:text-4xl md:font-extrabold md:mt-1 md:ml-20 lg:text-6xl lg:mt-2 lg:ml-24 ">
                  Street Wars</p>
              </div>
                
                <br/>
                
              
            
              <p className="mt-2 text-black font-timesnewroman sm:mt-4 sm:text-l md:mt-6 text-justify">
                LS Street Wars is a gang wars game server on OpemMP formerly (SA:MP).
                Los Santos Street Wars is, and always, will be a community first and a game server second. 
                We are dedicated to fostering an environment with a member-centric approach where all players
                have equal potential for in game success and community recognition. Operating since 2011 LS Street Wars is one of the few remaining Gang Wars Server on SA:MP.
                We plan to keep the server running for now and in the near future. We are closely following OpenMP development and in process of migrating our server to OpenMP. Join our discord server to stay updated.
              </p>
              <p>

              </p>
              <div className='flex'>
              <div className="mt-4 sm:mt-6  ">
              <div className='md:flex'>
              <Tippy content="Connect to The Server">
                <Link  href="samp://217.182.46.69:7777" >
                    <button
                              className="  py-4   mb-5 px-6 cursor-pointer  hover:bg-[#644d8a]  bg-[#6C5C86] font-semibold font-grotesk  text-2xl text-white  sm:text-base md:text-2xl md:mb-4 lg:mt-6   ">
             

                    <span className=' flex justify-center items-center lg:text-lg md:text-sm sm:text-xs align-middle '>Connect Now <RightIcon className='ml-2 '/></span> 
                    

                    </button>

                  
                    
                </Link>
              </Tippy>

              <div className='flex  justify-left items-center '>
              <span className='text-gray-400 mx-6'>or</span>  
              
              
              <Tooltip
                  content={"Copied"}
                  trigger="click"
                  color="invert"
                 
                >
              <CopyToClipboard text="217.182.46.69:7777">

                  
                    <span ref={selectRef} className=' flex  underline decoration-dotted  underline-offset-4 text-gray-400 cursor-pointer hover:text-gray-700'>
                      Copy IP address <CopyIcon  className='ml-1 mt-1 ' />
                    </span>
                  
          
             </CopyToClipboard> 
             </Tooltip> 
                 
      
              
              </div>
              </div>

                <div className="flex  items-center  mt-3 ml-3 pb-4 md:mt-3  md:ml-1 lg:mt-4 lg:ml-3 ">
             
                  
              
                {isLoaded ? 
                      <span className= "w-4"> <Image  src={onlineIcon}   /></span> //yellow
                    : <span className= "w-4"> <Image  src={loadingIcon}    /></span> //green
                }
                
                {info?.maxplayers ?  <span className=' flex -mt-[5px]' >
                    <p className="text-gray-600    text-xs  md:ml-1   ml-2  ">Server is Online.</p> 
                  
                       <p className= "text-gray-600   ml-1 text-xs  md:ml-1  md:text-xs lg:ml-1  lg:text-xs ">
                        <span className="font-bold text-black"> {info?.online  + " / " + info?.maxplayers}</span> Players Online
                      </p> 
                       </span>  
                        :<></>}
                   <span className="text-gray-500 md:text-right hidden md:flex md:ml-32 md:text-xs md:mt-8 lg:hidden ">v16.8</span>
                    </div>
                   
                
                

              
              </div>
              
              </div>
            
            </div>
          </div>
          
        </div>
    </div>
    <div 
 
    className="h-full w-full relative grayscale" 
    
    // onClick={() => {
    //   setBg(randomIntFromInterval(1,4))
    // }}
    >

  <Image 
            src={bg === 1 ? hero1 : bg === 2 ? hero2 : bg === 3 ? hero3  : bg=== 4 ? hero4 : hero4  }
            layout="fill"
            objectPosition="center"
            objectFit="cover"
            className=' -z-50'
            quality={70}
            placeholder="blur"
     />
      <div className=" hidden ml-[60%] mr-[20px] lg:flex object-right-top transform">

         <Link  href="https://discord.gg/Zt6HnHbwRc" >
        
        <button className="btn bg-black hover:bg-gray-700 text-white text-xl font-bold font-grotesk border-white  lg:w-60 lg:mr-10 h-14 mt-8">
         Join Discord
        </button>
        
        </Link>
        <Tippy content= "Coming Soon" trigger='click' 
        >
        <button className="btn bg-white  border-2 border-black font-bold font-grotesk text-black text-xl  lg:w-28 lg:mr-0 lg:mt-8  h-14 ">
          UCP
        </button>
        </Tippy>
      </div>
    
   
    </div>
  </div>
</div>
  )
}

export default MyApp
