#!/bin/bash
set -Eeuo pipefail

# 工作目录：默认当前目录，可用环境变量 COZE_WORKSPACE_PATH 覆盖
COZE_WORKSPACE_PATH="${COZE_WORKSPACE_PATH:-$(pwd)}"
cd "${COZE_WORKSPACE_PATH}"

echo "==> 开始更新 margin-calc（拉取最新代码 + 重新构建）"

# 前置检查：git / pnpm 是否可用
command -v git >/dev/null 2>&1 || { echo "✗ 找不到 git，请先安装 Git"; exit 1; }
command -v pnpm >/dev/null 2>&1 || { echo "✗ 找不到 pnpm，请先安装：npm i -g pnpm"; exit 1; }

# 必须是 git 仓库且配置了 origin 远程
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "✗ 当前目录不是 Git 仓库"; exit 1
fi
if ! git remote get-url origin >/dev/null 2>&1; then
  echo "✗ 没有配置 origin 远程仓库，请先：git remote add origin <仓库地址>"; exit 1
fi

# 必须在 main 分支
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$BRANCH" != "main" ]; then
  echo "✗ 当前在 '$BRANCH' 分支，更新脚本只支持 main，请先切回 main（git checkout main）"; exit 1
fi

# 工作区必须干净，避免 pull 把本地未提交改动冲掉
if [ -n "$(git status --porcelain)" ]; then
  echo "✗ 当前有未提交的改动，先 commit 或 stash 再更新，否则会被覆盖："
  git status --short
  exit 1
fi

# 1. 拉取最新（仅快进，不自动合并产生多余 commit）
echo "==> 从 GitHub 拉取最新代码 ..."
git pull --ff-only origin main

# 2. 安装 / 更新依赖
echo "==> 安装依赖 ..."
pnpm install --prefer-offline

# 3. 重新构建
echo "==> 构建 Next.js 项目 ..."
pnpm next build

echo ""
echo "✓ 更新完成！运行以下命令启动："
echo "    pnpm start           # 生产模式，端口 5000"
echo "    或 ./scripts/start.sh"
