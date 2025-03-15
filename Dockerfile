# 使用官方 Node.js 运行时作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json（如果有）
COPY package*.json ./

# 安装依赖
RUN npm install --only=production

# 复制整个项目到容器内
COPY . .

# 暴露端口
EXPOSE 3000

# 运行应用
CMD ["npm", "run", "start:prod"]
