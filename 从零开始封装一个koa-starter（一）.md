# 从零开始实现一个koa-starter（一）

## 背景

为什么会有这样的想法呢？原因其实很简单就是单纯想要完整的实现一次node服务开发的链路，总结下自己所掌握的东西。另外一个呢，最近都在学习使用Typescript，所以索性基于TS实现一个服务端的代码，也是方便自己总结。

## 需求简述

我的目的是最终实现一个类似nest的简易starter，它包含的内容如下：

- 1.基于koa的完整restful api开发链路

- 2.有完整路由自动导入功能

- 3.利用TS的装饰器实现依赖注入/控制反转

## 完整实现假设代码

```typescript
// entity.ts
@Repo('TestRepository')
@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    comment: 'test',
    nullable: false
  })
  name: string
}

// service.ts
@Service()
export class TestService {
  @Inject('TestRepository')
  testRepo: Repository<TestEntity>

  testHandler() {
    this.testRepo.save({
      name: '1'
    })

    return { a: 2, b: 3 }
  }
}

// testGetDto.ts
import { IsString } from "class-validator";

export class GetTestIndexDto {
  @IsString({
    message: '缺少必要的参数'
  })
  name: string
}

// testController.ts
@Controller('/test1', { skipPerm: true })
export class Test {
  @Inject()
  testService: TestService

  @Get('/index')
  public test(@Query() query: GetTestIndexDto) {
    const a = this.testService.testHandler()
    return { code: 2, message: 'test controller', data: {
      service: a,
      query
    } }
  }

  @Get('/async')
  public async asyncTest() {
    return new Promise((resolve) => {
      resolve({ code: 200, message: 1 })
    })
  }
}

```

以上都是伪代码，是一个我们实现中的理想样子，我们最终将朝着这个方向努力。

## 项目初始化

包管理工具这里我将选择使用pnpm，pnpm确实会是一个相对比较好的选择。

### pnpm简介

pnpm的全称是performant npm，意味“高性能的 npm”。pnpm由npm/yarn衍生而来，解决了npm/yarn内部潜在的bug，极大的优化了性能，扩展了使用场景。被誉为“最先进的包管理工具”。是时下非常热门的包管理工具，目前我们熟悉的项目都在使用pnpm进行项目管理，比如vue3.0/vite/cycle.js/prisma/milkdown/vueuse等等。

### pnpm基础使用

#### 安装

```bash
npm i pnpm -g
```

#### 查看版本

```bash
pnpm -v
```

#### 设置npm源

```bash
pnpm config get registry
pnpm config set registry https://registry.npmmirror.com //切换淘宝源 
```

当然此处我推荐使用nrm管理npm源，清晰明了方便便捷，爽歪歪~~~

#### 项目初始化

```bash
pnpm init -y
```

#### 安装项目依赖

```bash
pnpm i / pnpm install
```

更多命令，请查看[pnpm官方文档](https://pnpm.io/zh/cli/install)
