/**
 * Created by evanzhou on 2017/4/6.
 */
import wepy from 'wepy';

export default class SubmitMixin extends wepy.mixin {

  methods = {
    submit(type, value){
      //todo 根据type处理点击事件
      switch (type) {
        case 'information':
        case 'petDetail':
        case 'post':
        case 'chat':
          this.$emit(type, 'submit');
          break;
        case 'detail':
          this.$emit(type, value);
          break;
        case 'petManage':
          this.$emit(type, 'add');
          break;
        case 'category':
          this.$emit(type, 'cancel');
          break;
      }
    }
  };

}