# rynkis.com.vue

rynkis.com 的 Vue 版本

## 实现细节

每个页面及菜单都作为场景，利用 Vue 生命周期中的 `onMounted` 实现进入过渡，`onBeforeUnmount` 实现退出过渡，过渡动画使用 `transitionend`、`animationend` 等动画事件进行回调串联。

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```
