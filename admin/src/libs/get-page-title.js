import defaultSetting from '@/config'

const title = defaultSetting.title || 'music admin'

export default function getPagetitle(pageTitle){
    if(pageTitle){
        return  `${pageTitle} - ${title}`
    }
    return  `${title}`
}