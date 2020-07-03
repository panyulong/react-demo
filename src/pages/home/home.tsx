import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {getBannerDao} from './services'
import Lianxi from './components/Lianxi'
import Game from './components/Game'



import './home.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  song: PlaySong
}

type PageDispatchProps = {
  updateState: (payload)=> void
}

type PageOwnProps = {}

type PageState = {
  current: number,
  btnLoading:boolean,
  list: Array<{
    name: string,
    age: number,
  }>,
  recommend: any,
  banners: Array<Banner>
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

  // 另一种写法：
  // this.props.dispatch({
  //   type: 'home/getData',
  //   payload
  // });
class Home extends Component<IProps, PageState> {

  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
  config: Config = {
    navigationBarTitleText: 'lianxi'
  }

  state = {
  current: 0,
  btnLoading:false,
  list:[{name:'pan',age:12},{name:'chen',age:123}],
  banners: [],
}
  constructor () {
    super(...arguments)
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () {
    this.getBanner()
  }

  componentDidHide () { }

  getBanner() {
    getBannerDao().then(res=> {
      this.setState({
        banners: res.banners
      })
    })
  }

  clickBanner(banner: Banner) {
    switch(banner.targetType) {
      case 1:
        Taro.navigateTo({
          url: `/pages/playSong/index?id=${banner.targetId}`
        })
        break
        case 10:
          Taro.navigateTo({
            url: `/pages/playList/index?id=${banner.targetId}&name=${banner.typeTitle}`
          })
          break
        case 3000:
          Taro.navigateTo({
            url: `/pages/webview/index?name=${banner.typeTitle}&url=${banner.url}`
          })
          break
    }
  }

  goDetail(item) {
    Taro.navigateTo({
      url: `/pages/playList/index?id=${item.id}&name=${item.name}`
    })
  }
  render () {
    console.log(this.props);
    let { current,btnLoading} = this.state
    return (
      <View>
        <div className="game">
          <div className="game-board">
            <Game />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>

          {current}
          {btnLoading && <Text>已登录</Text>}
          {!btnLoading && <Text>未登录</Text>}
         <Lianxi onUpdatePlayStatus={this.props.getData}></Lianxi>
         {this.props.home.num}

      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Home
