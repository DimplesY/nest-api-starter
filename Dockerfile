# 构建阶段
FROM node:22-alpine AS builder
WORKDIR /opt/application/

# 配置镜像源并安装必要依赖
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && \
    apk add --no-cache python3 make g++ linux-headers && \
    npm install -g pnpm

# 复制依赖文件并安装
COPY package*.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --registry=https://registry.npmmirror.com

# 复制源代码并构建
COPY . .
RUN pnpm run build

# 运行阶段
FROM node:22-alpine AS runner
WORKDIR /opt/application/

# 配置镜像源并安装必要依赖
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && \
    apk add --no-cache python3 make g++ linux-headers && \
    npm install -g pnpm

# 复制依赖文件并安装生产依赖
COPY package*.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --prod --registry=https://registry.npmmirror.com

# 从构建阶段复制编译后的代码和启动脚本
COPY --from=builder /opt/application/dist ./dist

# 设置环境变量和端口
ENV NODE_ENV=production
EXPOSE 3000

# 启动应用
CMD ["pnpm", "start:prod"]

