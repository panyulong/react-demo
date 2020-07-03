import API from '@/services/api'

export function getRecommendPlayListDao() {
  return API.get({
    url: '/personalized',
  })
}