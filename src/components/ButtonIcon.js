import React from 'react'
import { Button,Icon,} from 'native-base';

const ButtonIcon = ({iconName,fungsi,color}) => {
  return (
    <Button onPress={fungsi} transparent>
      <Icon style={color} name={iconName} />
    </Button>
  )
}

export default ButtonIcon
