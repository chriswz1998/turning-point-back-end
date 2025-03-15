# 使用 Node.js 作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装全局 NestJS CLI 和 Prisma CLI
RUN npm install -g @nestjs/cli @prisma/client prisma

# 安装项目依赖
RUN npm install --only=production

# 复制整个项目到容器（包括 Prisma Schema）
COPY . .

# 运行 Prisma 代码生成
RUN npx prisma generate

# 构建 NestJS 应用
RUN npm run build

# 暴露端口
EXPOSE 3000

# 运行应用
CMD ["node", "dist/main"]
