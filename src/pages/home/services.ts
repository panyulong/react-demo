import API from '@/services/api'

// 获取推荐歌单
export function getBannerDao() {
  return API.get({
    url: '/personalized',
  })
}
