//全局提示信息类型 ，详细参考：https://www.iviewui.com/components/message
export const tipMessage_info ='info'
export const tipMessage_success ='success'
export const tipMessage_warning ='warning'
export const tipMessage_error ='error'
export const tipMessage_loading ='loading'


//文章状态类型  WordPress默认内置了以下几种文章状态
// 草稿 – 已保存但尚未完成且尚未发布的文章
// 自动草稿 – WordPress具有自动保存功能，可自动将草稿保存为修订版
// 待审核 – 已完成并提交审核但尚未发布的文章
// 未来 – 计划稍后定时发布的文章，也就是通过上图设置发布时间为未来某个时间点即可
// 私密 – 标记为私密的文章，只有自己登录后可见
// 回收 – 被添加到回收站的文章
// 继承 – 自动继承其父页面状态的子页面
export const status_post_publish ='publish'  //正式发布
export const status_post_future ='future' //未来 – 计划稍后定时发布的文章，也就是通过上图设置发布时间为未来某个时间点即可
export const status_post_draft ='draft' //默认，// 草稿 – 已保存但尚未完成且尚未发布的文章
export const status_post_pending ='pending' //待审核 – 已完成并提交审核但尚未发布的文章
export const status_post_private ='private' //私密 – 标记为私密的文章，只有自己登录后可见

//格式化文章状态类型 
export const formatStatus =(status) =>{
    switch(status)
    {
        case status_post_publish:
            return '发布'
        case status_post_future:
            return '未来'
        case status_post_draft:
            return '草稿'
        case status_post_pending:
            return '待审核'
        case status_post_private:
             return '私密'
        default:
             return '草稿'
  
    }
  }