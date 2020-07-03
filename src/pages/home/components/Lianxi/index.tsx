import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

type Props = {
  songInfo: PlaySong,
  isHome?: boolean,
  onUpdatePlayStatus: (object) => any
}

type State = {
  isOpened: boolean
}

const backgroundAudioManager = Taro.getBackgroundAudioManager()


export default class Lianxi extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      isOpened: false
    }
  }
  switchPlayStatus(e) {
      this.props.onUpdatePlayStatus({
        isPlaying: false,
        e
      })
    }
  render() {
    return (
      <View>
          <View onClick={this.switchPlayStatus.bind(this)}>
            点击
          </View>

      </View>
    )
  }
}

