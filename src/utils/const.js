export const PHOTOS = [
  'http://file.idray.com/Upload/9900/5299/132051666191572568.jpg!wh400',
  'http://file.idray.com/Upload/9900/5297/132051663186424219.jpg!wh400',
  'http://file.idray.com/Upload/9900/5189/132030896844580180.jpg!wh400',
  'http://file.idray.com/Upload/9900/5107/132018839462155156.jpg!wh400',
  'http://file.idray.com/Upload/9900/5107/132018839462155156.jpg!wh400',
  'http://file.idray.com/Upload/9930/2864/131974772931668225.jpg!wh400',
  'http://file.idray.com/Upload/9930/2862/131974771972338911.jpg!wh400',
  'http://file.idray.com/Upload/9930/2856/131974770733257915.jpg!wh400',
  'http://file.idray.com/Upload/9930/2835/131974767843254967.jpg!wh400'
]

export const VIDEOS = [
  'http://file.idray.com/Upload/9930/2281/131760475794824890.jpg',
  'http://file.idray.com/Upload/9930/2279/131761319929954939.jpg',
  'http://file.idray.com/Upload/9930/2268/131755247982979069.jpg',
  'http://file.idray.com/Upload/9930/2250/131749259299106069.jpg',
  'http://file.idray.com/Upload/9930/2236/131746737869596111.jpg',
  'http://file.idray.com/Upload/9930/2235/131745857611724727.jpg',
  'http://file.idray.com/Upload/9930/2223/131737157679576507.jpg',
  'http://file.idray.com/Upload/9930/2214/131734612958099331.jpg',
  'http://file.idray.com/Upload/9930/2186/131724184007960951.jpg',
  'http://file.idray.com/Upload/9930/2166/131716421728571743.jpg',
  'http://file.idray.com/Upload/9930/2155/131712942919570572.jpg',
  'http://file.idray.com/Upload/9930/2151/131710385611432607.jpg'
]

export const WEB_HOST = 'http://wcwadmin.51dreaming.com'
// 图片上传限制 单位:Mb
export const MAX_SIZE_FOR_PHOTO = 8

export const validateToken = t => {
  let token = localStorage.token
  let expires = localStorage.expires ? parseInt(localStorage.expires) : 0
  return token && expires && t < expires
}
