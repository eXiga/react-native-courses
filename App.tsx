import { createNavigationContainer, createStackNavigator } from 'react-navigation'
import { Login } from './src/components/login/Login'
import { Product } from './src/components/product/Product'
import { Products } from './src/components/products/Products'

// For some reasons, TS can't import part or react-navigation properly. VSCode shows this file
// as broken and says that there is no defaultNavigationOptions property. Anyway, it works.
const rootStack = createStackNavigator({
  Login: Login,
  Products: Products,
  Product: Product
}, {
  initialRouteName: "Login",
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#F5FCFF'
    },
    headerTitleStyle: {
      fontFamily: 'vincHand',
      fontSize: 30
    }
  }
})

export default createNavigationContainer(rootStack)