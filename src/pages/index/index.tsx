import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { getRecommendPlayListDao } from './services'

import './index.scss'

import Lianxi from './components/Lianxi'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

//状态管理index下的属性state:{personList:[]} 声明类型
type PageStateProps = { 
  index: {
    personList: Array<{
      id: string,
      name: string,
      age: number
    }>,
    isPlaying:boolean
  }
}
// 状态管理下的异步方法
type PageDispatchProps = {
  asyncGetRecentPlayAction: (payload) => void, //void 没有返回值
  updateState: (payload) => void
}

type PageOwnProps = {}

// 本页构造函数this,生命周期 & State
type PageState = {
  isCreateOpen: boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps,
  state:PageState
}

@connect(({ index }) => ({
  index
}), (dispatch) => ({
  asyncGetRecentPlayAction (payload) {
    dispatch({
      type: 'index/asyncGetRecentPlayAction',
      payload
    })
  },
  updateState(payload) {
    dispatch({
      type: 'index/updateState',
      payload
    })
  } 
}))

// class Index extends Component<IProps, PageState> {
  class Index extends Component{
    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
    navigationBarTitleText: '首页'
  }

  constructor(props) {
    super(props)
    this.state = {
      isCreateOpen: true,
    }
  }

  componentWillReceiveProps (nextProps) {
    // console.log(this, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { 
    // this.getRecommendPlayList()
  }

  componentDidHide () { }

  goDetail(item){
    console.log(item)
    this.setState({
      isCreateOpen: !this.state.isCreateOpen,
    })
    this.props.asyncGetRecentPlayAction({ uid: 1 })
  }
  goHref(){
    Taro.navigateTo({
      url: `/pages/home/home`
    })
  }

  render () {
    const { personList,isPlaying } = this.props.index;
    const { isCreateOpen } = this.state;
    return (
      <View className='index'>
        <View onClick={this.goHref.bind(this)}>切换到home页</View>
        <View className="recommend_playlist__content">
              {personList.map((item) =>
                <View 
                key={item.id}
                onClick={this.goDetail.bind(this, item)}>
                  {item.name}-{item.age}
                </View>
              )}
         </View>
        <View><Text>Hello, World</Text></View>
         {isCreateOpen && <Text>已登录</Text>}
          {!isCreateOpen && <Text>未登录</Text>}

          <View>
            {isPlaying }
          {isPlaying && <Text>正播放</Text>}
          {!isPlaying && <Text>暂停</Text>}
            <Lianxi onUpdatePlayStatus={this.props.updateState.bind(this)} />
          </View>
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

export default Index as ComponentClass
