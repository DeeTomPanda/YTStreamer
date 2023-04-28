/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { NativeBaseProvider } from 'native-base';

const YTDStreamer=()=>{

	return(
		<NativeBaseProvider>
		   <App/>
		</NativeBaseProvider>
	)
}

AppRegistry.registerComponent(appName, () => YTDStreamer);
