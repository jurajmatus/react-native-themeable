import React, { Component } from 'react'
import { styles } from './styles'
import { Picker } from 'react-native'
import { Theme, Text, View, applyStyle } from 'react-native-themeable'

const redTheme = applyStyle(type => {
  if (type === Text) {
    return {
      color: 'black',
      fontSize: 16,
    }
  }
  if (type === View) {
    return {
      backgroundColor: 'red',
    }
  }
})

const blueTheme = applyStyle(type => {
  if (type === Text) {
    return {
      color: 'white',
      fontSize: 26,
    }
  }
  if (type === View) {
    return {
      backgroundColor: 'blue',
    }
  }
})

const greenTheme = applyStyle(type => {
  if (type === Text) {
    return {
      color: 'pink',
      fontSize: 33,
    }
  }
  if (type === View) {
    return {
      backgroundColor: 'green',
    }
  }
})

const themes = { redTheme, greenTheme, blueTheme }

export default class SwitchTheme extends Component {
  constructor(...args) {
    super(...args)
    this.state = { themeName: 'redTheme' }
    this.onValueChange = this.onValueChange.bind(this)
  }

  onValueChange(themeName) {
    this.setState({ themeName })
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.description}>
          In this example you can switch theme dynamically by clicking picker:
        </Text>

        <Theme apply={themes[this.state.themeName]}>

          <Picker onValueChange={this.onValueChange} selectedValue={this.state.themeName} style={{width: 100}}>
            <Picker.Item label='red' value='redTheme' />
            <Picker.Item label='green' value='greenTheme' />
            <Picker.Item label='blue' value='blueTheme' />
          </Picker>

          <View style={{padding: 10}}>
            <Text>Color and font size is defined by selected theme</Text>
          </View>
        </Theme>

      </View>
    )
  }
}
