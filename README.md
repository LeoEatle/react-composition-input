# react-composition-input
The input component optimized for languages like Chinese, Japanese etc. 

# Why
You can read [this](http://blog.evanyou.me/2014/01/03/composition-event/) to know more about DOM composition event.

# Q & A
### Why to detect Chrome and call `handleInputChange` after `compositionend` event?
After Chrome v53, the `compositionend` event is emitted after `textInput` event. It causes that `compositionend` event emitted but `onInputChange` function is not be called. So we need to call `onInputChange` for another time.

You can see the [differ of chromium](https://chromium.googlesource.com/chromium/src/+/afce9d93e76f2ff81baaa088a4ea25f67d1a76b3%5E!/) for more details.