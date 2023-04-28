import React from 'react'
import { 
	View
} from 'react-native'
import {
	Box,
	Button,
	Heading,
	Input,
	FormControl,
	Text
} from 'native-base'
import styles from './../styles/styles.scss'
import ShareMenu, { ShareMenuReactView } from 'react-native-share-menu'
import YoutubePlayer from 'react-native-youtube-iframe'

const YT=()=>{
	
	const [id,setID]=React.useState('')
	const [url,setURL]=React.useState('')
	const [err,setErr]=React.useState(0)
	
	const getID=()=>{
		if(url.length==0)
			return
		else{
			setErr(0)
			let index=url.lastIndexOf('=')
			if(index<0)
			   index=url.lastIndexOf('/')
			setID(url.substr(index+1))}
	}

	const clearFields=()=>{
		setURL('')
		setID('')
		setErr(0)}
	
       const handleShare=(item)=>{
       	if(item){
	   const {data}=item   
	   setURL(data)
	console.log("URL "+url)
       	getID()}
       }

	React.useEffect(() => {
    		ShareMenu.getInitialShare(handleShare)
  	}, [])
	
	React.useEffect(() => {
		 const listener=ShareMenu.addNewShareListener(handleShare)
		 return ()=>{ listener.remove() } //Clean-up,RN recommend it in warning

	 }, []);



        return(
		<View style={styles.YT}>
		{
		 id==''?
		   (<Box h='250' alignSelf='center' w='90%' m='2.5%'>
		      <Heading m='auto' fontSize='xl'>{"Welcome to YTStreamer"}</Heading>
		      <Text alignSelf='center' fontSize='md'>{"Enter YT URL to begin!"}</Text>
		   </Box>):
		   (<Box alignItems='center' mt='15px'>
	              <YoutubePlayer        
	   	      height={300} 
		      width={'95%'}
	   	      videoId={id}
		      onError={(error)=>setErr(error)}/>
		   </Box>)
		}
		   <FormControl style={styles.inputBox} isInvalid={err}>
		      <Input  value={url} w='85%' variant='filled' alignSelf='center' 
		      onChangeText={(text)=>setURL(text)}/>
		      <FormControl.ErrorMessage alignSelf='center'>
		         {`${err}, try later or with a different url`}
		      </FormControl.ErrorMessage>
		      <Button.Group size='sm' alignSelf='center' mt='10px'>
		         <Button variant='outline' w='40%' onPress={()=>getID()}>{"Play Video"}</Button>
		         <Button variant='outline' w='40%' onPress={()=>clearFields()}>{"Reset "}</Button>
		      </Button.Group>
		   </FormControl>
		</View>)
}

export default YT
